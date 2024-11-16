import React from 'react';
import { AbsoluteFill, Img, Sequence, useVideoConfig, Audio, useCurrentFrame } from 'remotion';

interface VideoScript {
	text: string;
	image_prompt: string;
}

interface Caption {
	text: string;
	start: number;
	end: number;
}

interface AllVideoTypes {
	videoScript: VideoScript[];
	audioUrl: string;
	caption: Caption[];
	imageList: string[];
	createdby: string;
}

// Define props interface for the component
interface RemotionVideoProps {
	videoData?: AllVideoTypes;
}

// Update component to use props interface
const RemotionVideo: React.FC<RemotionVideoProps> = ({ videoData }) => {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();

	// Handle case when videoData is undefined
	if (!videoData) {
		return (
			<AbsoluteFill className="bg-black flex items-center justify-center text-white">
				<div>No video data available.</div>
			</AbsoluteFill>
		);
	}

	// Calculate total duration based on the last caption's end time
	const totalDuration = videoData.caption.length > 0
		? (videoData.caption[videoData.caption.length - 1].end / 1000) * fps
		: 1;

	// Calculate how long each image should be displayed
	const durationPerImage = videoData.imageList.length > 0
		? totalDuration / videoData.imageList.length
		: 0;

	// Get current caption based on video time
	const getCurrentCaptions = () => {
		const currentTimeVideo = (frame / fps) * 1000;

		const currentCaption = videoData.caption.find(
			(word) => currentTimeVideo >= word.start && currentTimeVideo <= word.end
		);

		return currentCaption ? currentCaption.text : "";
	};

	if (!videoData.caption.length || !videoData.imageList.length) {
		return (
			<AbsoluteFill className="bg-black flex items-center justify-center text-white">
				<div>No video data available.</div>
			</AbsoluteFill>
		);
	}

	return (
		<AbsoluteFill className="bg-black">
			{videoData.audioUrl && (
				<Audio src={videoData.audioUrl} />
			)}

			{videoData.imageList.map((image, index) => (
				<Sequence
					key={`image-sequence-${index}`}
					from={index * durationPerImage}
					durationInFrames={durationPerImage}
				>
					<AbsoluteFill>
						<Img
							src={image}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
						/>
					</AbsoluteFill>

					<AbsoluteFill
						style={{
							backgroundColor: 'rgba(0, 0, 0, 0.4)',
						}}
					/>

					<AbsoluteFill className="flex items-center justify-center">
						<div
							className="absolute bottom-20 text-white text-2xl font-bold px-8 py-4 rounded text-center uppercase"
							style={{
								textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
								maxWidth: '90%',
							}}
						>
							{getCurrentCaptions()}
						</div>
					</AbsoluteFill>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};

export default RemotionVideo;
