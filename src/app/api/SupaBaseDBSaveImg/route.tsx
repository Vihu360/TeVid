import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const imageUrlState = await request.json();
	console.log(imageUrlState);

	try {
		const supabaseUrl = process.env.SUPABASE_URL;
		const supabaseKey = process.env.SUPABASE_KEY;

		console.log(supabaseUrl);

		if (!supabaseUrl || !supabaseKey) {
			console.error('SUPABASE_URL and SUPABASE_KEY environment variables are required.');
			return;
		}

		const supabase = createClient(supabaseUrl, supabaseKey);
		const publicUrls = [];

		for (const imageUrl of imageUrlState) {
			const fileName = `images/${Date.now()}.png`;

			const { error } = await supabase.storage
				.from(process.env.SUPABASE_BUCKET_NAME!)
				.upload(fileName, await fetch(imageUrl).then((res) => res.blob()));

			if (error) {
				console.error('Error uploading image:', error);
				continue;
			} else {
				const { data: publicUrlData } = supabase.storage
					.from(process.env.SUPABASE_BUCKET_NAME!)
					.getPublicUrl(fileName);

				if (publicUrlData) {
					console.log('Image uploaded successfully:', publicUrlData.publicUrl);
					publicUrls.push(publicUrlData.publicUrl);
				}
			}
		}

		return NextResponse.json({ publicUrls }, { status: 200 });

	} catch (error) {
		console.error('Error uploading images:', error);
		return NextResponse.json({ error: 'Error uploading images' }, { status: 500 });
	}
}
