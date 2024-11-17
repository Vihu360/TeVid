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

export interface AllVideoTypes {
	videoScript: VideoScript[];
	audioUrl: string;
	caption: Caption[];
	imageList: string[];
}

// Component now takes props directly as an object, not as a parameter
const RemotionVideo = (props: { allVideoData: AllVideoTypes }) => {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();
	const { allVideoData } = props;

	// Calculate total duration based on the last caption's end time
	const totalDuration = allVideoData.caption.length > 0
		? (allVideoData.caption[allVideoData.caption.length - 1].end / 1000) * fps + 5
		: 1;

	// Calculate how long each image should be displayed
	const durationPerImage = allVideoData.imageList.length > 0
		? totalDuration / allVideoData.imageList.length
		: 0;

	// Get current caption based on video time
	const getCurrentCaptions = () => {
		// Convert current frame to milliseconds (using fps instead of hardcoded 30)
		const currentTimeVideo = (frame / fps) * 1000;

		// Find the caption that should be displayed at current time
		const currentCaption = allVideoData.caption.find(
			(word) => currentTimeVideo >= word.start && currentTimeVideo <= word.end
		);

		return currentCaption ? currentCaption.text : "";
	};

	if (!allVideoData.caption.length || !allVideoData.imageList.length) {
		return (
			<AbsoluteFill className="bg-black flex items-center justify-center text-white">
				<div>No video data available.</div>
			</AbsoluteFill>
		);
	}

	return (
		<AbsoluteFill className="bg-black">
			{/* Audio Track */}
			{allVideoData.audioUrl && (
				<Audio src={allVideoData.audioUrl} />
			)}

			{/* Image Sequences */}
			{allVideoData.imageList.map((image, index) => (
				<Sequence
					key={`image-sequence-${index}`}
					from={index * durationPerImage}
					durationInFrames={durationPerImage}
				>
					{/* Background Image */}
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

					{/* Semi-transparent Overlay */}
					<AbsoluteFill
						style={{
							backgroundColor: 'rgba(0, 0, 0, 0.4)',
						}}
					/>

					{/* Caption Text */}
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
