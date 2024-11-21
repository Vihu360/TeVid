import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
	const imageUrlState = await request.json();
	console.log(imageUrlState);

	try {
		const supabaseUrl = process.env.SUPABASE_URL;
		const supabaseKey = process.env.SUPABASE_KEY;

		if (!supabaseUrl || !supabaseKey) {
			console.error("SUPABASE_URL and SUPABASE_KEY environment variables are required.");
			return NextResponse.json({ error: "Environment variables missing" }, { status: 500 });
		}

		const supabase = createClient(supabaseUrl, supabaseKey);

		const uploadPromises = imageUrlState.map(async (imageUrl: string) => {
			const fileName = `images/${Date.now()}.png`;

			try {
				// Fetch the image from the URL
				const response = await fetch(imageUrl);
				const arrayBuffer = await response.arrayBuffer();

				// Compress and resize the image using sharp
				const compressedImageBuffer = await sharp(Buffer.from(arrayBuffer))
					.png({ quality: 80 }) // Compress with quality of 80
					.toBuffer();

				// Upload to Supabase
				const { error } = await supabase.storage
					.from(process.env.SUPABASE_BUCKET_NAME!)
					.upload(fileName, compressedImageBuffer, {
						contentType: "image/png",
					});

				if (error) {
					console.error("Error uploading image:", error);
					return null;
				}

				// Get the public URL of the uploaded image
				const { data: publicUrlData } = supabase.storage
					.from(process.env.SUPABASE_BUCKET_NAME!)
					.getPublicUrl(fileName);

				return publicUrlData ? publicUrlData.publicUrl : null;
			} catch (error) {
				console.error("Error processing image:", error);
				return null;
			}
		});

		const publicUrls = (await Promise.all(uploadPromises)).filter(Boolean);

		return NextResponse.json({ publicUrls }, { status: 200 });
	} catch (error) {
		console.error("Error uploading images:", error);
		return NextResponse.json({ error: "Error uploading images" }, { status: 500 });
	}
}
