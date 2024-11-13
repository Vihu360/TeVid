import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { AssemblyAI } from 'assemblyai';



export async function POST(request: NextRequest) {

	try {


		const client = new AssemblyAI({
			apiKey: process.env.ASSEMBLYAI_API_KEY || '',
		});

		const { audioFileUrl } = await request.json();

		const FILE_URL = audioFileUrl;

		const data = {
			audio: FILE_URL
		}

		const transcript = await client.transcripts.transcribe(data);
		
		return NextResponse.json({ message: 'Audio generated and uploaded to Supabase', transcript }, { status: 200 });



	} catch (error) {

		const axiosError = error as AxiosError;
		return NextResponse.json(axiosError.response?.data, { status: 500 });

	}



}
