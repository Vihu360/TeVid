import React from 'react';
import { Composition } from 'remotion';
import RemotionVideo from '@/app/(frontend)/dashboard/_components/RemotionVideo';

// Sample defaultProps to satisfy the component props requirement
const defaultProps = {
	videoData: {
		videoScript: [],
		audioUrl: '',
		caption: [],
		imageList: [],
		createdby: ''
	}
};

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="Empty"
			component={RemotionVideo}
			durationInFrames={60}
			fps={30}
			width={1280}
			height={720}
			defaultProps={defaultProps}
		/>
	);
};
