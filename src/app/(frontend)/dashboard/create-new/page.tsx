"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import SelectStyle from "./_components/SelectStyle";
import { PageOne } from "./_components/PageOne";
import axios, { AxiosError } from 'axios';
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/configs/db";
import { videoData } from "@/configs/schema";
import { verifyRefreshToken } from "@/configs/auth-utilis";
import PlayerDialog from "../_components/PlayerDialog";

// Define TypeScript interfaces
interface VideoScript {
	text: string;
	image_prompt: string;
}

interface Caption {
	text: string;
	start: number;
	end: number;
}

interface VideoData {
	videoScript: VideoScript[];
	audioUrl: string;
	caption: Caption[];
	imageList: string[];
	createdby: string;
}

// Component interfaces remain the same
const StepIndicator = ({ step }: { step: number }) => (
	<div className='w-full flex'>
		<div className='w-1/2 flex justify-end items-center'>
			<div className='w-1/2 border-2 border-pink-600' />
		</div>
		<p className='p-3 md:w-28 w-32 text-white'>step {step}/2</p>
		<div className='w-1/2 flex justify-start items-center'>
			<div className='w-1/2 border-2 border-pink-600' />
		</div>
	</div>
);

const PageTwo = ({
	onUserSelect,
	handleOnClick,
	loading,
	onNext
}: {
	onUserSelect: (name: string, value: string) => void;
	handleOnClick: () => void;
loading: boolean;
		onNext: () => void
}) => (
	<div className="w-full flex flex-col gap-2 rounded-xl md:border-2 bg-[#181C14] border-white px-4 md:px-10 h-full overflow-hidden">
		{loading ? (
			<div className="flex flex-col items-center justify-center min-h-[90vh] p-8 gap-12">

				{/* Multiple skeleton rows for content */}
				<div className="w-full max-w-lg space-y-8">
					<div className="flex items-center space-x-4">
						<Skeleton className="h-12 w-12 rounded-full bg-gray-700/50" />
						<div className="space-y-2 flex-1">
							<Skeleton className="h-4 w-3/4 bg-gray-700/50" />
							<Skeleton className="h-4 w-1/2 bg-gray-700/50" />
						</div>
					</div>

					<div className="space-y-3">
						<Skeleton className="h-4 w-full bg-gray-700/50" />
						<Skeleton className="h-4 w-5/6 bg-gray-700/50" />
						<Skeleton className="h-4 w-4/6 bg-gray-700/50" />
						<Skeleton className="h-4 w-full bg-gray-700/50" />
					</div>
				</div>



				{/* Loading message */}
				<div className="space-y-2 text-center">
					<div className="">
						<div className="flex items-center justify-center gap-2 text-gray-400">
							<span className="inline-block w-3 h-3 bg-pink-600 rounded-full animate-bounce" />
							<span className="inline-block w-3 h-3 bg-pink-600 rounded-full animate-bounce delay-150" />
							<span className="inline-block w-3 h-3 bg-pink-600 rounded-full animate-bounce delay-300" />
							<span className="inline-block w-3 h-3 bg-pink-600 rounded-full animate-bounce delay-500" />
						</div>
					</div>
					<p className="text-lg text-white">Crafting your video masterpiece</p>
					<p className="text-sm text-gray-400">
						Hold on! This won&apos;t take long, <span className="text-pink-600 font-medium ">PINKY PROMISE</span>
					</p>
				</div>
			</div>
		) : (
				<div className="w-full flex flex-col min-h-full">
				<div className="flex-grow">
						<SelectStyle onUserSelect={onUserSelect} onNext={onNext} />
				</div>
				<div className="sticky bottom-0 bg-[#181C14] py-4">
					<div className="flex items-center justify-center">
						<Button onClick={handleOnClick} className="bg-[#FFE5CF] hover:bg-[#FFD5B8] text-black w-full md:w-2/6">
							Submit
						</Button>
					</div>
					<StepIndicator step={2} />
				</div>
			</div>
		)}
	</div>
);


const CreateNewVideo = () => {
	const [videoLengthIndex, setVideoLengthIndex] = useState(0);
	const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null);
	const [next2, setNext2] = useState(false);
	const [promptValue, setPromptValue] = useState("");
	const [propsData, setPropsData] = useState<{ [key: string]: string }>({});
	const [loading, setLoading] = useState(false);
	const [allData, setAllData] = useState<VideoData>({
		videoScript: [],
		audioUrl: "",
		caption: [],
		imageList: [],
		createdby: ""
	});
	const [playVideo, setPlayVideo] = useState(false);
	const [videoId, setVideoId] = useState<number | null>();

	const onHandleChange = (name: string, value: string) => {
		console.log("name an dvalue ",name, value)
		setPropsData(() => ({
			[name]: value,
		}));
	};

	const fetchVoiceThroughAi = async (combinedString: string) => {
		try {
			const response = await axios.post("/api/GetVideoVoice", {
				promptText: combinedString
			});

			const publicUrl = response.data.downloadAudioFileSupabase.data.publicUrl;

			fetchCaptionThroughAi(publicUrl);

			setAllData(prev => ({
				...prev,
				audioUrl: publicUrl
			}));
		} catch (error) {
			const axiosError = error as AxiosError;
			console.log(axiosError.response?.data);
		}
	};

	const fetchVideoScriptThroughAi = async () => {

		let promptValueWithDuration = ""

		let videoDuration
		if (videoDuration === 0) {
			videoDuration = "30-40"
		} else {
			videoDuration = "40-60"
		}

		setLoading(true);

		console.log("type of propsData",typeof propsData);

		if ('AI Image' in propsData) {
			console.log("ai image")
			 promptValueWithDuration = `write a script to generate ${videoDuration} video on topic : ${promptValue} along with ai image prompt in a ${propsData.selectStyle} format for each scene and give me result in JSON with Image prompt and contain text as field. do not give any starting like welcome to my channel or video. Create a unique and different each time,not repeated. use a proper hook to start the video to hold viewers on the shorts/tiktok`;
		}
		else {
			console.log("gameplay")
			promptValueWithDuration = `write a script to generate ${videoDuration} seconds video on topic : ${promptValue} give me result in JSON with  and that text as field. do not give any starting like welcome to my channel or video. Create a unique and different each time,not repeated. use a proper hook to start the video to hold viewers on the shorts/tiktok`;
		}

			try {
				const response = await axios.post("/api/GetVideoScript", {
				prompt: promptValueWithDuration
			});

			const data: VideoScript[] = response.data.result;
			const combinedString = data.map(item => item.text).join(' ');

			setAllData(prev => ({
				...prev,
				videoScript: data
			}));

			await fetchVoiceThroughAi(combinedString);
			await fetchImagethroughAi(data);

			// Insert data into database once we have all the required data
			if (allData.audioUrl && allData.caption.length > 0 && allData.imageList.length > 0) {
				await setVideoDataToDb();
			}

		} catch (error) {
			const axiosError = error as AxiosError;
				console.log(axiosError.response?.data);
				setLoading(false);
		}
	};

	const fetchCaptionThroughAi = async (publicUrl: string) => {
		try {
			const response = await axios.post("/api/GetCaption", {
				audioFileUrl: publicUrl
			});

			setAllData(prev => ({
				...prev,
				caption: response.data.transcript.words
			}));
		} catch (error) {
			const axiosError = error as AxiosError;
			console.log(axiosError.response?.data);
		}
	};

	const fetchImagethroughAi = async (data: VideoScript[]) => {
		try {
			const responses = await Promise.all(
				data.map((item) =>
					axios.post("/api/GetAiImage", { prompt: item.image_prompt })
				)
			);

			const publicUrls = responses.map((response) => response.data.publicUrl);

			console.log("responses", responses);
			console.log("publicUrls", publicUrls);


			setAllData((prev) => ({
				...prev,
				imageList: publicUrls,
			}));

		} catch (error) {
			console.error("Error generating images:", error);
		} finally {
			setLoading(false);
		}
	};

	const setVideoDataToDb = async () => {
		try {

			const response = await axios.get('/api/Token');

			const token = response.data.token

			const findUserEmail = await verifyRefreshToken(token);

			const userEmail = findUserEmail?.email ?? "";

			const result = await db.insert(videoData).values({
				videoScript: allData.videoScript,
				audioFileUrl: allData.audioUrl,
				captions: allData.caption,
				imageList: allData.imageList,
				createdby: userEmail
			}).returning({ id: videoData.id });

			setVideoId(result[0].id);
			setPlayVideo(true);

			console.log('Successfully inserted data into database', allData);
		} catch (error) {
			console.error("Error inserting data into database:", error);
			throw error; // Re-throw to handle in the calling function if needed
		}
	};

	useEffect(() => {
		if (allData.audioUrl && allData.caption.length > 0 && allData.imageList.length > 0 && allData.videoScript.length > 0) {
			setVideoDataToDb();
		}
	}, [allData]);

	return (
		<div className="">
			<div className=" md:p-8 flex items-center justify-center ">
				{next2 ? (
					<PageTwo
						onUserSelect={onHandleChange}
						handleOnClick={fetchVideoScriptThroughAi}
						loading={loading}
						onNext={() => setNext2(false)}
					/>
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
			{playVideo && videoId != null && <PlayerDialog playVideo={playVideo} videoId={videoId} />}
		</div>
	);
};

export default CreateNewVideo;
