import axios, { AxiosError } from 'axios';

export const generateVoice = async (promtText?: string, voiceId?: number) => {

	// Mapping for voiceId to API-specific values
	const voiceMappings: { [key: number]: { voiceId: string; style: string; rate: number } } = {
		1: { voiceId: 'en-US-natalie', style: 'promo', rate: 2 },
		2: { voiceId: 'en-US-terrell', style: 'Narration', rate: 6 },
		3: { voiceId: 'en-AU-kylie', style: 'Conversational', rate: 1 },
		4: { voiceId: 'en-IN-surya', style: 'Documentary', rate: 0 },
		5: { voiceId: 'en-UK-freddie', style: 'Conversational', rate: 0 },
		6: { voiceId: 'en-UK-ruby', style: 'Newscast', rate: 0 },
	};

	// Validate if voiceId is provided and exists in the mappings
	if (!voiceId || !voiceMappings[voiceId]) {
		throw new Error('Invalid or missing voiceId.');
	}

	// Retrieve voiceId string and style from the mapping
	const { voiceId: apiVoiceId, style: voiceStyle, rate: voiceRate } = voiceMappings[voiceId];


	const data = JSON.stringify({
		"voiceId": apiVoiceId,     // need changes
		"style": voiceStyle,           // need changes
		"text": promtText,
		"rate": voiceRate,                       // need changes
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
