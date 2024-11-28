import { NextRequest, NextResponse } from 'next/server';
import { generateVoice } from '@/configs/MurfVoice';
import { downloadAudioFile } from '@/configs/downloadAudio';
import { AxiosError } from 'axios';

// Function to generate a unique filename
function generateUniqueFileName(): string {
	const timestamp = Date.now();
	const randomSuffix = Math.floor(Math.random() * 10000);
	return `audio_${timestamp}_${randomSuffix}.mp3`;
}

export async function POST(request: NextRequest) {
	const { promptText, voiceId } = await request.json();

	try {

		console.log("prompt text in audio gen", promptText);
		console.log("VoiceId in audio gen", voiceId);

		const result = await generateVoice(promptText, voiceId);
		const audioUrl = result.audioFile;

		const bucketName = process.env.SUPABASE_BUCKET_NAME ?? ''
		const fileName = generateUniqueFileName();

		// Download and upload the audio file to Supabase
		const downloadAudioFileSupabase = await downloadAudioFile(audioUrl, bucketName, fileName);

		console.log("downloadAudioFileSupabase",downloadAudioFileSupabase);

		return NextResponse.json({ message: 'Audio generated and uploaded to Supabase', fileName, downloadAudioFileSupabase }, { status: 200 });
	} catch (error) {
		const axiosError = error as AxiosError;
		return NextResponse.json(axiosError.response?.data, { status: 500 });
	}
}
