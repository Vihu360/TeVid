import Replicate from "replicate";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

	const startTime = performance.now(); // Start time measurement

	try {
		const { prompt } = await req.json();

		console.log(prompt);

		const replicate = new Replicate();
		const input = {
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

			const GeneratedImageUrl = imageResponse.url

			const endTime = performance.now()
			const elapsedTime = (endTime - startTime) / 1000 // Time in seconds

			if (elapsedTime > 10) {
				console.warn(`Function 'POST' took ${elapsedTime.toFixed(2)} seconds to complete.`);
			}

			return NextResponse.json({ message: 'Image generated successfully', GeneratedImageUrl }, { status: 200 });

		} else {
			throw new Error("No image URL returned from Replicate API.");
		}
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json({ error: "Failed to process image request" }, { status: 500 });
	}
}
