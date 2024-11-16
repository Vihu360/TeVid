import React, { useEffect, useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Player } from '@remotion/player';
import RemotionVideo from './RemotionVideo';
import { videoData } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';

interface PlayDialogType {
	playVideo: boolean,
	videoId: number
}

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


const PlayerDialog = ({ playVideo, videoId }: PlayDialogType) => {

	const [openDialog, setOpenDialog] = useState(false);
	const [allVideoData, setAllVideoData] = useState<VideoData>({
		videoScript: [],
		audioUrl: "",
		caption: [],
		imageList: [],
		createdby: ""
	});

	useEffect(() => {

		setOpenDialog(true);
		if (videoId) {
			getVideoDataFromDb();
		}

	}, [playVideo])

	const getVideoDataFromDb = async () => {


		const response = await db.select().from(videoData).where(eq(videoData.id, videoId)).execute();

		const responseVideoData = {
			videoScript: response[0].videoScript as VideoScript[],
			audioUrl: response[0].audioFileUrl,
			caption: response[0].captions as Caption[],
			imageList: response[0].imageList ?? [],
			createdby: response[0].createdby,
		};


		setAllVideoData(responseVideoData);

	}

	console.log(" all video data", allVideoData)

	const fps = 30

	const totalDuration = allVideoData.caption.length > 0
		? allVideoData.caption[allVideoData.caption.length - 1].end / 1000 * fps
		: 1;

	return (
		<Dialog open={openDialog}>
			<DialogContent className=' w-full max-w-3xl'>
				<DialogHeader>
					<DialogTitle className="text-3xl my-5 text-black ">Your Video is ready !</DialogTitle>
					<DialogDescription>
					</DialogDescription>
					<div className='md:flex gap-10 justify-between items-start '>
						<Player
							component={RemotionVideo}
							durationInFrames={Number(totalDuration.toFixed(0))}
							compositionWidth={280}
							compositionHeight={450}
							fps={30}
							controls={true}
							inputProps={
								{
									...allVideoData,
								}
							}
						/>
						<div className=' w-1/2'>
							<Button className=' w-full'>Export</Button>
						</div>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>

	)
}

export default PlayerDialog
