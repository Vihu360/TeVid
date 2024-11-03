"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { IconArrowNarrowRightDashed } from '@tabler/icons-react'
import SelectStyle from './_components/SelectStyle'

// Constants
const VIDEO_LENGTHS = [30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const PRESET_PROMPTS = [
	{ id: 0, text: 'Technology Explainer', prompt: 'explain the technology of modern era with the challenges in mind' },
	{ id: 1, text: 'Motivation Freaks', prompt: 'motivation video for fitness freaks' },
	{ id: 2, text: 'Science Simplified', prompt: 'simplified explanation of scientific concepts' },
	{ id: 3, text: 'Travel Motivation', prompt: 'inspiring travel destinations and experiences' },
	{ id: 4, text: 'Bedtime Stories', prompt: 'calming bedtime stories for better sleep' },
	{ id: 5, text: 'Fashion Diaries', prompt: 'latest fashion trends and style tips' }
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

// Page One Component
const PageOne = ({ videoLengthIndex, setVideoLengthIndex, activeButtonIndex, setActiveButtonIndex, promptValue, setPromptValue, onNext }: {
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

// Page Two Component
const PageTwo = ({ onUserSelect }: { onUserSelect: (name: string, value: string) => void }) => (

	<div className="md:w-5/6 md:h-2/3 w-full py-3 md:px-5 flex flex-col gap-2 rounded-xl md:border-2 md:shadow-lg md:shadow-gray-600 border-black">
		<SelectStyle onUserSelect={onUserSelect} />

		<div className='flex items-center justify-center pt-2'>
			<Button className='bg-pink-600 hover:bg-pink-700 text-gray-100 w-full md:w-auto'>
				Submit
			</Button>
		</div>

		<StepIndicator step={2} />
	</div>
)

// Main Component
const CreateNewVideo = () => {
	const [videoLengthIndex, setVideoLengthIndex] = useState(0)
	const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null);
	const [next2, setNext2] = useState(false)
	const [promptValue, setPromptValue] = useState('')

	const [propsData, setPropsData] = useState([])

	const onHandleChange = (name: string, value: string) => {
		console.log("props val", name, value)

		setPropsData(prev => ({
			...prev,
			[name]: value
		}))
	}

	console.log(propsData)

	return (
		<div>
			<div className="md:p-5 flex items-center justify-center">
				{next2 ? (
					<PageTwo onUserSelect={onHandleChange} />
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
		</div>
	)
}

export default CreateNewVideo
