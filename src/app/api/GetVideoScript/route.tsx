import { chatSession } from "@/configs/aiModel";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";

export async function POST(request: NextRequest) {
	try {
		const { prompt } = await request.json();

		console.log("api prompt", prompt);

		const result = await chatSession.sendMessage(prompt);

		console.log("result", result);

		console.log(result.response.text());

		return NextResponse.json({
			result: JSON.parse(result.response.text()),
		});
	} catch (error) {
		// Type assertion for AxiosError
		if (error instanceof AxiosError) {
			console.error("Axios Error:", error);
			return NextResponse.json(error.response?.data || { message: 'An error occurred' }, { status: 500 });
		}

		// Handle other types of errors
		if (error instanceof Error) {
			console.error("Error:", error.message);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		// Fallback for unknown errors
		console.error("Unknown error:", error);
		return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
	}
}
