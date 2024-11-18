import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { IconArrowNarrowRightDashed, IconPlayerPlay, IconPlayerStop } from '@tabler/icons-react';

interface PageOneProps {
	videoLengthIndex: number;
	setVideoLengthIndex: React.Dispatch<React.SetStateAction<number>>;
	activeButtonIndex: number | null;
	setActiveButtonIndex: React.Dispatch<React.SetStateAction<number | null>>;
	promptValue: string;
	setPromptValue: React.Dispatch<React.SetStateAction<string>>;
	onNext: () => void;
}

const VOICES = [
	{ id: 1, name: 'Sarah', description: 'Warm & Professional', audioUrl: 'https://pxbywmzzuuwelsaccswz.supabase.co/storage/v1/object/public/craftersaAudio/audio_1731571736347_2895.mp3', style: 'American' },
	{ id: 2, name: 'James', description: 'Deep & Authoritative', audioUrl: '/voices/james.mp3', style: 'American' },
	{ id: 3, name: 'Emma', description: 'Young & Energetic', audioUrl: '/voices/emma.mp3', style: 'British' },
	{ id: 4, name: 'Michael', description: 'Calm & Clear', audioUrl: '/voices/michael.mp3', style: 'Australian' },
	{ id: 5, name: 'Aniket', description: 'Friendly & Natural', audioUrl: '/voices/sophie.mp3', style: 'Indian' },
	{ id: 6, name: 'David', description: 'Confident & Dynamic', audioUrl: '/voices/david.mp3', style: 'Dynamic' },
];

const PRESET_PROMPTS = [
	{ id: 1, text: 'Science Simplified', prompt: 'Engaging science video breaking down complex topics...', style: 'Anime' },
	{ id: 2, text: 'Travel Adventures', prompt: 'Inspiring travel video showcasing breathtaking destinations...', style: 'Photographic' },
	{ id: 3, text: 'Noir Tale', prompt: 'Dramatic black and white narrative with contrast...', style: 'Black and White' },
	{ id: 4, text: 'Adventure Quest', prompt: 'Exciting adventure video with action-packed scenes...', style: 'Cinematic' },

];

const VoiceCard = ({
	voice,
	isSelected,
	onClick,
	onPlay,
	isPlaying
}: {
	voice: typeof VOICES[0];
	isSelected: boolean;
	onClick: () => void;
	onPlay: () => void;
	isPlaying: boolean;
	}) => (
	<div
		onClick={onClick}
		className={`relative overflow-hidden rounded-xl transition-all duration-200 cursor-pointer ${isSelected
			? 'bg-pink-950/50 border-2 border-pink-500'
			: 'bg-gray-900/50 border border-gray-700 hover:border-pink-500/50'
			}`}
	>
		<div className="p-4 backdrop-blur-sm">
			<div className="flex justify-between items-start mb-2">
				<div>
					<h3 className="font-medium text-gray-100">{voice.name}</h3>
					<p className="text-sm text-gray-400">{voice.description}</p>
				</div>
				<Button
					size="sm"
					variant={isSelected ? "default" : "outline"}
					className={isSelected ? "bg-pink-500 hover:bg-pink-600" : "border-pink-500/50 hover:border-pink-500"}
					onClick={(e) => {
						e.stopPropagation();
						onPlay();
					}}
				>
					{isPlaying ? <IconPlayerStop className='text-black' size={16} /> : <IconPlayerPlay className='text-black' size={16} />}
				</Button>
			</div>
			<span className="text-xs px-2 py-1 bg-gray-800/50 rounded-full text-gray-300">
				{voice.style}
			</span>
		</div>
		</div>
);

// Step Indicator Component
const StepIndicator = ({ step }: { step: number }) => (
	<div className="w-full flex items-center justify-center gap-4 text-gray-400">
		<div className="w-24 h-0.5 bg-pink-500"></div>
		<p className="text-sm">Step {step} of 2</p>
		<div className="w-24 h-0.5 bg-pink-500"></div>
	</div>
);

export const PageOne: React.FC<PageOneProps> = ({
	videoLengthIndex,
	setVideoLengthIndex,
	activeButtonIndex,
	setActiveButtonIndex,
	promptValue,
	setPromptValue,
	onNext
}) => {
	const [selectedVoiceId, setSelectedVoiceId] = useState<number | null>(null);
	const [playingVoiceId, setPlayingVoiceId] = useState<number | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handleVoicePlay = (voiceId: number) => {
		if (playingVoiceId === voiceId) {
			audioRef.current?.pause();
			setPlayingVoiceId(null);
		} else {
			if (audioRef.current) {
				audioRef.current.src = VOICES.find(v => v.id === voiceId)?.audioUrl || '';
				audioRef.current.play();
				setPlayingVoiceId(voiceId);
			}
		}
	};

	const handlePresetClick = (index: number) => {
		setActiveButtonIndex(index);
		console.log("index", index);
		setPromptValue(PRESET_PROMPTS[index - 1].prompt);
	};

	return (
		<div className="w-11/12 h-full bg-[#181C14] text-gray-100">
			<div className=" w-full mx-auto p-5 flex flex-col gap-2 border rounded-xl border-white">
				<h1 className="text-2xl font-semibold">Create Your Video</h1>

				<div className="flex flex-col gap-6 bg-[#181C14] backdrop-blur-sm rounded-xl p-4 px-8 border border-gray-800 w-full mx-auto">
					<div className="space-y-4">
						<label htmlFor="prompt" className="text-lg font-medium">Video Description</label>
						<textarea
							required
							id="prompt"
							value={promptValue}
							onChange={(e) => setPromptValue(e.target.value)}
							className="w-full h-32 p-4 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-gray-100 placeholder-gray-500"
							placeholder="Describe your video..."
						/>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-center items-center">
							{PRESET_PROMPTS.map((preset) => (
								<Button
									key={preset.id}
									variant="outline"
									className={`h-auto py-2 px-4 text-left ${activeButtonIndex === preset.id
										? 'bg-[#FFE5CF] text-black hover:bg-[#FFE5CF] '
										: '  text-black hover:bg-[#FFE5CF] '
										}`}
									onClick={() => handlePresetClick(preset.id)}
								>
									<div>
										<div className="font-medium">{preset.text}</div>
									</div>
								</Button>
							))}
						</div>
					</div>

					{/* Duration Section */}
					<div className="flex flex-col md:flex-row items-center justify-start gap-5">
						<div className="text-lg font-medium">Select the video duration :</div>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<Button
								variant="outline"
								className={`w-32 ${videoLengthIndex === 0
									? 'bg-[#FFE5CF] text-black hover:bg-[#FFE5CF] '
									: '  text-black hover:bg-[#FFE5CF] '
									}`}
								onClick={() => setVideoLengthIndex(0)}
							>
								30-40 seconds
							</Button>
							<Button
								variant="outline"
								className={`w-32 ${videoLengthIndex === 1
									? 'bg-[#FFE5CF] text-black hover:bg-[#FFE5CF] '
									: '  text-black hover:bg-[#FFE5CF] '
									}`}
								onClick={() => setVideoLengthIndex(1)}
							>
								40-60 seconds
							</Button>
							<Button
								variant="outline"
								className={`w-32 text-black hover:bg-[#FFE5CF]`}
								onClick={() => alert("Coming Soon")}
							>
								2 minutes
							</Button>
							<Button
								variant="outline"
								className={`w-32 text-black hover:bg-[#FFE5CF] `}
								onClick={() => alert("Coming Soon")}
							>
								5 minutes
							</Button>
						</div>
					</div>

					{/* Voice Selection */}
					<div className="space-y-4">
						<h2 className="text-lg font-medium">Select a Voice</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{VOICES.map((voice) => (
								<VoiceCard
									key={voice.id}
									voice={voice}
									isSelected={selectedVoiceId === voice.id}
									onClick={() => setSelectedVoiceId(voice.id)}
									onPlay={() => handleVoicePlay(voice.id)}
									isPlaying={playingVoiceId === voice.id}
								/>
							))}
						</div>
					</div>

					{/* Navigation */}
					<div className="flex flex-col items-center gap-4 mt-4">
						<Button
							onClick={onNext}
							className="bg-pink-600 hover:bg-pink-700 flex items-center gap-2"
						>
							Next
							<IconArrowNarrowRightDashed stroke={2} />
						</Button>
						<StepIndicator step={1} />
					</div>
				</div>

				<audio
					ref={audioRef}
					onEnded={() => setPlayingVoiceId(null)}
					className="hidden"
				/>
			</div>
		</div>
	);
};

export default PageOne;
