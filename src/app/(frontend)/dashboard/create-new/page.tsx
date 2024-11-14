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
		<p className='p-3 md:w-28 w-32'>step {step}/2</p>
		<div className='w-1/2 flex justify-start items-center'>
			<div className='w-1/2 border-2 border-pink-600' />
		</div>
	</div>
);

const PageTwo = ({
	onUserSelect,
	handleOnClick,
	loading
}: {
	onUserSelect: (name: string, value: string) => void;
	handleOnClick: () => void;
	loading: boolean;
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
		) : (
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
	const [playVideo, setPlayVideo] = useState(true);
	const [videoId, setVideoId] = useState<number | null>(5);

	const onHandleChange = (name: string, value: string) => {
		setPropsData((prev) => ({
			...prev,
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
		setLoading(true);

		const videoDuration = `${videoLengthIndex === 0 ? 30 : videoLengthIndex} ${videoLengthIndex === 0 ? "seconds" : "minutes"}`;
		const promptValueWithDuration = `write a script to generate ${videoDuration} video on topic : ${promptValue} along with ai image prompt in a ${propsData.selectStyle} format for each scene and give me result in JSON with Image prompt and contain text as field. do not give any starting like welcome to my channel or video. Create a unique and different each time,not repeated. use a proper hook to start the video to hold viewers on the shorts/tiktok`;

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
		<div>
			<div className="md:p-5 flex items-center justify-center">
				{next2 ? (
					<PageTwo
						onUserSelect={onHandleChange}
						handleOnClick={fetchVideoScriptThroughAi}
						loading={loading}
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
