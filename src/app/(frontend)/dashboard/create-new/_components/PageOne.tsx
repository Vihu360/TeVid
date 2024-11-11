"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { IconArrowNarrowRightDashed } from '@tabler/icons-react'

// Constants
const VIDEO_LENGTHS = [30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const PRESET_PROMPTS = [
	{
		id: 0, text: 'Technology Explainer', prompt: 'Futuristic video that explores advancements in virtual and augmented reality and their potential to transform entertainment, education, and beyond. Highlight how these technologies work and give a glimpse into immersive VR experiences and AR applications in real-world settings. This video should captivate viewers and inspire curiosity about the future of digital experiences.'
	},
	{
		id: 1, text: 'Motivation Freaks', prompt: 'High-energy fitness video focused on the dedication and lifestyle of fitness enthusiasts. Highlight intense workouts, motivational challenges, and fitness tips to keep viewers engaged and motivated. Incorporate powerful narration on the benefits of consistency, discipline, and pushing limits, making it an uplifting experience for gym-goers and aspiring fitness lovers alike.'
	},

	{
		id: 2, text: 'Science Simplified', prompt: 'Engaging science video that breaks down complex topics into easy-to-understand explanations. Cover topics from space exploration to everyday chemistry in a fun, approachable way, using animations and examples viewers can relate to. The narration should be friendly and enthusiastic, making science accessible and exciting for curious minds of all ages.'
	},

	{ id: 3, text: 'Travel Motivation', prompt: 'Create an inspiring travel video that showcases breathtaking destinations worldwide, from serene beaches to bustling cities and hidden mountain trails. Weave in motivational narration about the transformative power of travel, encouraging viewers to explore beyond their comfort zones. Use cinematic shots and inspiring quotes to fuel wanderlust in every viewer, making it a must-watch for adventurers and dreamers.' },

	{
		id: 4, text: 'Bedtime Stories', prompt: 'Create a cozy and magical bedtime story video designed for children and families. Tell a soothing story filled with gentle characters and dreamlike landscapes, using warm, calming narration. Accompanied by soft music and enchanting illustrations, this video should ease viewers into a restful night’s sleep, sparking imagination and comfort for children and adults alike.'
	},

	{
		id: 5, text: 'Fashion Diaries', prompt: 'Produce a stylish fashion diary video that takes viewers behind the scenes of the latest trends, street style, and fashion shows. Showcase outfit inspirations, styling tips, and unique pieces from around the world, narrated with a trendy and playful tone. The video should be visually vibrant and creatively shot to captivate fashionistas and inspire viewers to express their style.'
	}
]

// Button Component

interface PresetButtonProps {
	text: string;
	isActive: boolean;
	onClick: () => void;
}

const PresetButton: React.FC<PresetButtonProps> = ({ text, isActive, onClick }) => (
	<Button
		onClick={onClick}
		className={`p-3 text-gray-700 rounded-xl border border-gray-400 hover:border-gray-600
      ${isActive ? "bg-pink-600 text-gray-100 hover:bg-pink-600" : "bg-gray-100 hover:bg-gray-200"}`}
	>
		{text}
	</Button>
)

// Step Indicator Component
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

export const PageOne = ({ videoLengthIndex, setVideoLengthIndex, activeButtonIndex, setActiveButtonIndex, promptValue, setPromptValue, onNext }: {
	videoLengthIndex: number;
	setVideoLengthIndex: React.Dispatch<React.SetStateAction<number>>;
	activeButtonIndex: number | null;
	setActiveButtonIndex: React.Dispatch<React.SetStateAction<number | null>>;
	promptValue: string;
	setPromptValue: React.Dispatch<React.SetStateAction<string>>;
	onNext: () => void;
}) => {
	const handlePresetClick = (index: number) => {
		setActiveButtonIndex(index)
		setPromptValue(PRESET_PROMPTS[index].prompt)
	}

	return (
		<div className="md:w-5/6 md:h-2/3 w-full py-3 md:px-5 flex flex-col gap-2 rounded-xl md:border-2 md:shadow-lg md:shadow-gray-600 border-black">
			<label htmlFor="prompt">Prompt</label>
			<div className="flex flex-col justify-center items-center gap-2 w-full">
				<textarea
					required
					className="w-full h-32 p-2 border-gray-300 border rounded-xl"
					placeholder="motivation video for fitness freaks"
					id="prompt"
					value={promptValue}
					onChange={(e) => setPromptValue(e.target.value)}
				/>

				<div className='flex flex-col gap-3 items-center justify-center'>
					<div className='grid grid-cols-2 md:grid-cols-3 gap-2 items-center justify-between'>
						{PRESET_PROMPTS.slice(0, 3).map((preset) => (
							<PresetButton
								key={preset.id}
								text={preset.text}
								isActive={activeButtonIndex === preset.id}
								onClick={() => handlePresetClick(preset.id)}
							/>
						))}
					</div>

					<div className='grid grid-cols-2 md:grid-cols-3 gap-2 items-center justify-between'>
						{PRESET_PROMPTS.slice(3).map((preset) => (
							<PresetButton
								key={preset.id}
								text={preset.text}
								isActive={activeButtonIndex === preset.id}
								onClick={() => handlePresetClick(preset.id)}
							/>
						))}
					</div>
				</div>

				<div className="md:w-1/2 mt-3 flex flex-col items-center gap-3">
					<label htmlFor="videoLength">
						Video Length: {VIDEO_LENGTHS[videoLengthIndex]} {VIDEO_LENGTHS[videoLengthIndex] === 30 ? 'seconds' : 'minutes'}
					</label>
					<input
						required
						type="range"
						id="videoLength"
						min="0"
						max={VIDEO_LENGTHS.length - 1}
						value={videoLengthIndex}
						step="1"
						className="cursor-pointer range"
						onChange={(e) => setVideoLengthIndex(Number(e.target.value))}
					/>
				</div>

				<Button onClick={onNext} className='mt-2 flex'>
					Next
					<IconArrowNarrowRightDashed stroke={2} />
				</Button>

				<StepIndicator step={1} />
			</div>
		</div>
	)
}
