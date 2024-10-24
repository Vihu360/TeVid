"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

import { useState } from 'react';

const CreateNewVideo = () => {
	// UseState to track the index of the selected length
	const [videoLengthIndex, setVideoLengthIndex] = useState(0); // Default to 1 minute

	// Define video length options
	const videoLengths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // In minutes

	return (
		<div className=''>
			<div className="md:p-5 flex items-center justify-center  ">
				<div className="md:w-2/3 md:h-2/3 w-full py-3 flex flex-col gap-2 rounded-xl p-8">
					<label htmlFor="prompt">Prompt</label>
					<div className="flex flex-col justify-center items-center gap-2">
						<textarea
							className="w-full h-32 p-2 border-gray-300 border rounded-xl"
							placeholder="motivation video for fitness freaks"
							id="prompt"
						></textarea>

						{/* Slider for video length */}
						<div className="md:w-1/2 w-full mt-3 flex flex-col items-center gap-2">
							<label htmlFor="videoLength">
								Video Length: {videoLengths[videoLengthIndex]} minutes
							</label>
							<input

								type="range"
								id="videoLength"
								min="0"
								max={videoLengths.length - 1}
								value={videoLengthIndex}
								step="1"
								className="w-full cursor-pointer  "
								onChange={(e) => setVideoLengthIndex(Number(e.target.value))}
							/>
						</div>

						<Button>Next</Button>

						<div className='flex w-full border'>
							<div className='w-1/2 flex justify-center items-right'>
								<div className='w-1/2 border border-black'></div>
							</div>

							<p className=''>step 1/3</p>

							<div className='w-1/2 flex justify-center items-center'>
								<div className='w-1/2 border border-black'></div>
							</div>

						</div>

					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateNewVideo;
