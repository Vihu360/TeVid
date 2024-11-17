import React from 'react';
import { Composition } from 'remotion';
import RemotionVideo from '@/app/(frontend)/dashboard/_components/RemotionVideo';
import type { AllVideoTypes } from '@/app/(frontend)/dashboard/_components/RemotionVideo';

export const RemotionRoot: React.FC = () => {
	const defaultVideoData: AllVideoTypes = {
		videoScript: [],
		audioUrl: '',
		caption: [],
		imageList: [],
	};

	return (
		<Composition
			id="Empty"
			component={RemotionVideo}
			durationInFrames={60}
			fps={30}
			width={1280}
			height={720}
			defaultProps={{
				allVideoData: defaultVideoData
			}}
		/>
	);
};
