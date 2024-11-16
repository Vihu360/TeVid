import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { prompt, width = 768, height = 768, model = 'flux', seed = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000 } = body;

		console.log("image prompt", prompt)

		if (!prompt) {
			return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
		}

		// Generate the image using the provided prompt
		const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&model=${model}&seed=${seed}`;
		const response = await axios.get(url, { responseType: 'arraybuffer' });

		console.log(url)

		// Convert the image data to a base64 string
		const imageData = Buffer.from(response.data).toString('base64');

		// Create Supabase client
		const supabaseUrl = process.env.SUPABASE_URL as string;
		const supabaseKey = process.env.SUPABASE_KEY as string;
		const supabase = createClient(supabaseUrl, supabaseKey);

		// Upload the image to Supabase storage
		const fileName = `generated_image_${Date.now()}.jpg`;
		const { error } = await supabase.storage
			.from(process.env.SUPABASE_BUCKET_NAME || '')
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
			.from(process.env.SUPABASE_BUCKET_NAME || '')
			.getPublicUrl(fileName);

		if (!publicUrlData || !publicUrlData.publicUrl) {
			return NextResponse.json({ error: 'Failed to retrieve public URL' }, { status: 500 });
		}

		return NextResponse.json({ publicUrl: publicUrlData.publicUrl });

	} catch (error) {
		console.error('Error generating the image:', error);
		return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
	}
}
