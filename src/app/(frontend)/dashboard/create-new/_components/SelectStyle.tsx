import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { IconArrowNarrowLeftDashed } from '@tabler/icons-react';

interface StyleOption {
	name: string;
	image: string;
}

interface GameplayStyleOption {
	name: string;
	video: string;
}

interface SelectStyleProps {
	onUserSelect: (name: string, value: string) => void;
	onNext: () => void;
}

const SelectStyle: React.FC<SelectStyleProps> = ({ onUserSelect, onNext }) => {
	const [selectedStyle, setSelectedStyle] = useState<string>('');
	const [selectedSection, setSelectedSection] = useState<'AI_Image' | 'Gameplay' | ''>('');

	const styleOptions: StyleOption[] = useMemo(
		() => [
			{ name: 'Realistic', image: '/realistic.jpg' },
			{ name: 'Anime', image: '/anime.jpg' },
			{ name: 'Cinematic', image: '/cinematic.jpg' },
			{ name: 'Photographic', image: '/photographic.jpg' },
			{ name: 'Watercolor', image: '/watercolor.jpg' },
			{ name: 'Black and White', image: '/black.jpg' },
		],
		[]
	);

	const gameplayOptions: GameplayStyleOption[] = useMemo(
		() => [
			{ name: 'Pubg', video: '/gameplay1.mp4' },
			{ name: 'Little Nightmare', video: '/gameplay2.mp4' },
			{ name: 'Assassins Creed', video: '/gameplay3.mp4' },
			{ name: 'Residental Evil', video: '/gameplay4.mp4' },
			{ name: 'Free Fire', video: '/gameplay5.mp4' },
			{ name: 'Red Dead ', video: '/gameplay6.mp4' },
		],
		[]
	);

	const handleStyleSelect = (styleName: string, section: 'AI_Image' | 'Gameplay') => {
		setSelectedStyle(styleName);
		setSelectedSection(section);
		onUserSelect(section, styleName);
	};

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex gap-3 items-center justify-center mt-4 my-2'>
			<button className='p-1 border-2 rounded-full hover:bg-red-600' onClick={onNext}>
			<IconArrowNarrowLeftDashed stroke={2} className='text-white'/>
			</button>
			<p className=' w-full text-white rounded-t-lg'>Choose any one of the video sources</p>
			</div>

			{/* AI Generated Images Section */}
			<p className='text-white font-semibold'>AI Generated Images</p>
			<p className='text-gray-200 text-sm'>High quality images will be generated by AI for video background</p>

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-3'>
				{styleOptions.map((style, index) => (
					<div
						key={index}
						className={`
              relative transform transition-all duration-300 ease-in-out
              ${selectedSection === 'AI_Image' && selectedStyle === style.name
								? 'ring-2 ring-white rounded-md'
								: 'hover:scale-105'
							}
            `}
					>
						<button
							onClick={() => handleStyleSelect(style.name, 'AI_Image')}
							className="w-full focus:outline-none"
						>
							<div className="overflow-hidden rounded-t-md">
								<Image
									src={style.image}
									width={100}
									height={100}
									alt={style.name}
									className="h-36 w-full object-cover transition-transform duration-300 ease-in-out"
								/>
							</div>
							<p className="bg-pink-600 text-sm w-full rounded-b-md p-1 text-gray-100 text-center">{style.name}</p>
						</button>
					</div>
				))}
			</div>

			{/* Gameplay Video Section */}
			<p className='text-white font-semibold'>Gameplay Video</p>
			<p className='text-white text-sm'>High quality video will be chosen by video gallery</p>

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-3'>
				{gameplayOptions.map((style, index) => (
					<div
						key={index}
						className={`
              relative transform transition-all duration-300 ease-in-out
              ${selectedSection === 'Gameplay' && selectedStyle === style.name
								? 'ring-2 ring-white rounded-md'
								: 'hover:scale-105'
							}
            `}
					>
						<button
							onClick={() => handleStyleSelect(style.name, 'Gameplay')}
							className="w-full focus:outline-none"
						>
							<div className="overflow-hidden rounded-t-md">
								<video
									src={style.video}
									width={100}
									height={100}
									muted
									onMouseOver={e => e.currentTarget.play()}
									onMouseOut={e => e.currentTarget.pause()}
									className="h-48 w-full object-cover transition-transform duration-300 ease-in-out"
								/>
							</div>
							<p className="bg-pink-600 w-full rounded-b-md p-1 text-gray-100 text-center">{style.name}</p>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default SelectStyle;
