import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-pro",
});

console.log("gemini api key hitting")

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 100000,
	responseMimeType: "application/json",
};

export	const chatSession = model.startChat({
		generationConfig,
		history: [
			{
				role: "user",
				parts: [
					{ text: "write a script to generate 30 second video on topic : Interesting historical story along with ai image prompt in a realistic format for each scene and give me result in JSON with Image prompt and contain text as field \n" },
				],
			},
			{
				role: "model",
				parts: [
					{ text: "```json\n[\n  {\n    \"text\": \"In the year 1898, a young woman named Marie Curie embarked on a groundbreaking journey that would change the face of science forever.\",\n    \"image_prompt\": \"A portrait of Marie Curie, young and determined, in her laboratory, surrounded by scientific equipment, with a strong light illuminating her face.\"\n  },\n  {\n    \"text\": \"Driven by a thirst for knowledge and a passion for the unknown, she delved into the mysteries of radioactivity, a field then in its infancy.\",\n    \"image_prompt\": \"A close-up shot of Marie Curie working intently on a scientific experiment, with glowing tubes and beakers around her, a look of intense focus on her face.\"\n  },\n  {\n    \"text\": \"Along with her husband, Pierre Curie, Marie meticulously studied uranium and its properties, unraveling the secrets of the atom.\",\n    \"image_prompt\": \"Marie and Pierre Curie working together in their laboratory, studying a sample of uranium, with a sense of shared excitement and wonder.\"\n  },\n  {\n    \"text\": \"Their tireless efforts led to the discovery of two new radioactive elements, polonium and radium, marking a pivotal moment in the history of science.\",\n    \"image_prompt\": \"A dramatic shot of Marie Curie holding up a vial of radium, a glowing light emanating from it, signifying the momentous discovery.\"\n  },\n  {\n    \"text\": \"These discoveries not only revolutionized our understanding of the universe but also paved the way for groundbreaking advancements in medicine and technology.\",\n    \"image_prompt\": \"A montage of images depicting the applications of radioactivity in medicine, such as X-ray machines and cancer treatments, emphasizing the impact of Curie's discoveries.\"\n  },\n  {\n    \"text\": \"Marie Curie's legacy extends far beyond her scientific achievements.\",\n    \"image_prompt\": \"A portrait of Marie Curie, older and wiser, with a gentle smile and a look of contentment, surrounded by her scientific accomplishments.\"\n  },\n  {\n    \"text\": \"She shattered societal barriers, paving the way for women in science, and her unwavering determination and pursuit of knowledge continue to inspire generations of scientists and dreamers alike.\",\n    \"image_prompt\": \"A montage of images depicting women in science, from diverse backgrounds and disciplines, showcasing the legacy of Marie Curie's impact.\"\n  },\n  {\n    \"text\": \"Marie Curie's story is a testament to the power of human curiosity and the enduring impact of scientific discovery.\",\n    \"image_prompt\": \"A final shot of Marie Curie's portrait, bathed in a warm light, her name inscribed below, emphasizing her lasting legacy and contribution to science.\"\n  }\n]\n```\n\nThis JSON array contains eight objects, each representing a scene in the video. Each object has two fields:\n\n* **text**: This contains the narration for that particular scene.\n* **image_prompt**: This is an AI image prompt, describing the visual representation of the scene. \n\nThese prompts are tailored to evoke a realistic and engaging visual style for each scene, contributing to a compelling historical narrative. \n" },
				],
			},
		],
	});
