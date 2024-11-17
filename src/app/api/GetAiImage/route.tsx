import Replicate from "replicate";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {

	try {
		const { prompt } = await req.json();

		console.log(prompt);

		const replicate = new Replicate();
		const input  = {
			prompt: prompt,
			num_outputs: 1,
		};

		// Call the Replicate API and get the image data as a binary response
		const output = await replicate.run(
			"bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
			{ input }
		) as string[];

		console.log("output", output)


		if (output && output[0]) {
			const imageUrl = output[0];

			console.log("imageUrl", imageUrl);

			// Fetch the image data as a binary buffer
			const imageResponse = await fetch(imageUrl);
			console.log("image res", imageResponse);
			const imageBuffer = await imageResponse.arrayBuffer();

			console.log("imagebuffer", imageBuffer);

			// Convert the binary buffer to a base64 string
			const imageData = Buffer.from(imageBuffer).toString("base64");

			const supabaseUrl = process.env.SUPABASE_URL as string;
			const supabaseKey = process.env.SUPABASE_KEY as string;
			const supabase = createClient(supabaseUrl, supabaseKey);

			// Upload the image to Supabase storage
			const fileName = `generated_image_${Date.now()}.jpg`;
			const { error } = await supabase.storage
				.from(process.env.SUPABASE_BUCKET_NAME ?? '')
				.upload(fileName, Buffer.from(imageData, 'base64'), {
					contentType: 'image/jpeg',
					upsert: false,
				});

			if (error) {
				console.error('Error uploading image to Supabase:', error);
				return NextResponse.json({ error: 'Failed to upload image to Supabase' }, { status: 500 });
			}

			// Generate the public URL for the uploaded image
			const { data: publicUrlData } = supabase.storage
				.from(process.env.SUPABASE_BUCKET_NAME ?? '')
				.getPublicUrl(fileName);

			if (!publicUrlData || !publicUrlData.publicUrl) {
				return NextResponse.json({ error: 'Failed to retrieve public URL' }, { status: 500 });
			}

			return NextResponse.json({ publicUrl: publicUrlData.publicUrl });

		} else {
			throw new Error("No image URL returned from Replicate API.");
		}
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json({ error: "Failed to process image request" }, { status: 500 });
	}
}
