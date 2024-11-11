import axios, { AxiosError } from 'axios';

export const generateVoice = async (promtText?: string) => {
	const data = JSON.stringify({
		"voiceId": "en-US-terrell",
		"style": "Narration",
		"text": promtText,
		"rate": 6,
		"pitch": 0,
		"sampleRate": 48000,
		"format": "MP3",
		"channelType": "MONO",
		"pronunciationDictionary": {},
		"encodeAsBase64": false,
		"variation": 1,
		"audioDuration": 0,
		"modelVersion": "GEN2"
	});

	const config = {
		method: 'post',
		url: 'https://api.murf.ai/v1/speech/generate',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'api-key': process.env.MURF_API_KEY
		},
		data: data
	};

	try {
		const response = await axios(config);
		console.log("voice response data",response.data);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError
		console.log(axiosError.response?.data);
	}
};
