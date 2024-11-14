import React from 'react';
import { AbsoluteFill, Img, Sequence, useVideoConfig } from 'remotion';

const RemotionVideo = (allVideoData) => {
	const { fps } = useVideoConfig();

	const calculateDurationFrame = () => {
		return allVideoData.caption[allVideoData.caption.length - 1].end / 1000 * fps;
	};

	return (
		<AbsoluteFill className='bg-black'>
			{allVideoData.imageList.map((image, index) => (
				<Sequence
					key={`image-sequence-${index}`}
					from={index * calculateDurationFrame() / allVideoData.imageList.length}
					durationInFrames={calculateDurationFrame()}
				>
					<Img
						src={image}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover'
						}}
					/>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};

export default RemotionVideo;
