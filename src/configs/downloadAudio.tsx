import axios, { AxiosError } from 'axios';
import { createClient } from '@supabase/supabase-js';
import { Readable } from 'stream';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function downloadAudioFile(url: string, bucketName: string, fileName: string) {

	try {
		// Fetch audio data as a stream
		const response = await axios({
			url,
			method: 'GET',
			responseType: 'stream',
		});

		// Convert the response data to a readable stream
		const stream = response.data as Readable;
		const chunks: Buffer[] = [];

		// Collect data chunks
		for await (const chunk of stream) {
			chunks.push(Buffer.from(chunk));
		}

		// Combine chunks into a single buffer
		const audioBuffer = Buffer.concat(chunks);

		// Upload the audio file to Supabase storage
		const { error } = await supabase.storage
			.from(bucketName)
			.upload(fileName, audioBuffer, {
				cacheControl: '3600',
				upsert: true,
				contentType: 'audio/mp3',
			});


			if (error) {
				console.error('Supabase upload error:', error);
				throw new Error('Failed to upload audio to Supabase');
			}

		console.log('File uploaded successfully to Supabase:', fileName);

		const downloadURL = supabase.storage.from(bucketName).getPublicUrl(fileName);


		return downloadURL;

	} catch (error) {
		const axiosError = error as AxiosError;
		console.error('Error downloading or uploading audio:', axiosError.message);
		throw error;
	}
}
