"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import SelectStyle from "./_components/SelectStyle";
import { PageOne } from "./_components/PageOne";
import axios, { AxiosError } from 'axios';
import { Skeleton } from "@/components/ui/skeleton";



const StepIndicator = ({ step }: { step: number }) => (
	<div className='w-full flex'>
		<div className='w-1/2 flex justify-end items-center'>
			<div className='w-1/2 border-2 border-pink-600' />
		</div>
		<p className='p-3 md:w-28 w-32'>step {step}/2</p>
		<div className='w-1/2 flex justify-start items-center'>
			<div className='w-1/2 border-2 border-pink-600' />
		</div>
	</div>
)

// Page Two Component
const PageTwo = ({
	onUserSelect,
	handleOnClick,
	loading
}: {
	onUserSelect: (name: string, value: string) => void;
	handleOnClick: () => void;
	loading: boolean
}) => (

	<div className="md:w-5/6 md:h-2/3 w-full py-3 md:px-5 flex flex-col gap-2 rounded-xl md:border-2 md:shadow-lg md:shadow-gray-600 border-black">
		{loading ? (
			<div className="flex flex-col items-center justify-center p-16 gap-8">

				<div className="flex items-center space-x-4 justify-center">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>

				<p className="text-center">Hold on ! This won&apos;t take long, <span className="text-pink-600 font-medium">PINKY PROMISE</span></p>
			</div>
		) :

			(
				<>
					<SelectStyle onUserSelect={onUserSelect} />

					<div className="flex items-center justify-center pt-2">
						<Button onClick={handleOnClick} className="bg-pink-600 hover:bg-pink-700 text-gray-100 w-full md:w-auto">
							Submit
						</Button>
					</div>

					<StepIndicator step={2} />
				</>

			)}
	</div>
);

// Main Component
const CreateNewVideo = () => {
	const [videoLengthIndex, setVideoLengthIndex] = useState(0);
	const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
		null
	);
	const [next2, setNext2] = useState(false);
	const [promptValue, setPromptValue] = useState("");
	const [propsData, setPropsData] = useState<{ [key: string]: string }>({});
	const [loading, setLoading] = useState(false);
	const [imagesList, setImagesList] = useState<string[]>([]);
	const onHandleChange = (name: string, value: string) => {

		setPropsData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Api Call to Voice generator

	const fetchVoiceThroughAi = async (combinedString: string) => {

		try {


			console.log(combinedString)

			const response = await axios.post("/api/GetVideoVoice", {
				promptText: combinedString
			})

			const publicUrl = response.data.downloadAudioFileSupabase.data.publicUrl;

			fetchCaptionThroughAi(publicUrl)


		} catch (error) {

			const axiosError = error as AxiosError;
			console.log(axiosError.response?.data);

		}
	}


	// Api call to the video script generator

	const fetchVideoScriptThroughAi = async () => {

		setLoading(true)

		const videoDuration = `${videoLengthIndex === 0 ? 30 : videoLengthIndex} ${videoLengthIndex === 0 ? "seconds" : "minutes"}`

		const promptValueWithDuration = 'write a script to generate ' + videoDuration + ' video on topic : ' + promptValue + ' along with ai image prompt in a ' + propsData.selectStyle + ' format for each scene and give me result in JSON with Image prompt and contain text as field. do not give any starting like welcome to my channel or video. Create a unique and different each time,not repeated'

		console.log(promptValueWithDuration);

		try {
			const response = await axios.post("/api/GetVideoScript", {
				prompt: promptValueWithDuration
			})

			const data = response.data.result

			interface ResultItem {
				text: string;
			}

			const combinedString = data.map((item: ResultItem) => item.text).join(' ');

			console.log("combined string", combinedString)

			fetchVoiceThroughAi(combinedString);

			fetchImagethroughAi(data);

		} catch (error) {

			const axiosError = error as AxiosError
			console.log(axiosError.response?.data);

		}
	}

	// Api call to the caption generator


	const fetchCaptionThroughAi = async (publicUrl: string) => {

		setLoading(true)

		const fileUrl = publicUrl

		try {
			const response = await axios.post("/api/GetCaption", {
				audioFileUrl: fileUrl
			})

			console.log(response.data.transcript.words)

		} catch (error) {

			const axiosError = error as AxiosError
			console.log(axiosError.response?.data);

		}

	}

	// Api call to image generation

	interface DataItem {
		text: string;
		image_prompt: string;
	}

	const fetchImagethroughAi = async (data: DataItem[]) => {
		console.log("data", data);

		let images: string[] = [];

		try {
			// Use Promise.all to make concurrent requests for all image prompts
			const responses = await Promise.all(
				data.map((item) =>
					axios.post("/api/GetAiImage", { prompt: item.image_prompt })
				)
			);

			console.log("response", responses);

			// Extract the result from each response
			images = responses.map(response => response.data.publicUrl);
			console.log("Generated images:", images);

			// Set the images list after all requests are completed
			setImagesList(images);

			console.log(imagesList);

		} catch (error) {
			console.error("Error generating images:", error);
		} finally {
			setLoading(false);
		}
	};


	return (
		<div>
			<div className="md:p-5 flex items-center justify-center">
				{next2 ? (
					<PageTwo onUserSelect={onHandleChange} handleOnClick={fetchVideoScriptThroughAi} loading={loading} />
				) : (
					<PageOne
						videoLengthIndex={videoLengthIndex}
						setVideoLengthIndex={setVideoLengthIndex}
						activeButtonIndex={activeButtonIndex}
						setActiveButtonIndex={setActiveButtonIndex}
						promptValue={promptValue}
						setPromptValue={setPromptValue}
						onNext={() => setNext2(true)}
					/>
				)}
			</div>
		</div>
	);
};

export default CreateNewVideo;
