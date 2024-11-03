import React, { useState, useMemo } from 'react'
import Image from 'next/image'

interface StyleOption {
	name: string
	image: string
}

interface SelectStyleProps {
	onUserSelect: (name: string, value: string) => void
}

const SelectStyle: React.FC<SelectStyleProps> = ({ onUserSelect }) => {
	const [selectedStyle, setSelectedStyle] = useState<string>('')

	const styleOptions: StyleOption[] = useMemo(
		() => [
			{ name: 'Realistic', image: '/realistic.jpg' },
			{ name: 'Anime', image: '/anime.jpg' },
			{ name: 'Cinematic', image: '/cinematic.jpg' },
			{ name: 'Photographic', image: '/photographic.jpg' },
			{ name: 'Watercolor', image: '/watercolor.jpg' }
		],
		[]
	)

	const handleStyleSelect = (styleName: string) => {
		setSelectedStyle(styleName)
		onUserSelect('style select', styleName)
	}

	return (
		<div className='flex flex-col gap-2'>
			<p>Select the Style</p>

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-3'>
				{styleOptions.map((style, index) => (
					<div
						key={index}
						className={`
              relative transform transition-all duration-300 ease-in-out
              ${selectedStyle === style.name ? 'ring-2 ring-black rounded-md' : 'hover:scale-105'}
            `}
					>
						<button
							onClick={() => handleStyleSelect(style.name)}
							className="w-full focus:outline-none"
						>
							<div className="overflow-hidden rounded-t-md">
								<Image
									src={style.image}
									width={100}
									height={100}
									alt={style.name}
									className="h-44 w-full object-cover transition-transform duration-300 ease-in-out"
								/>
							</div>
							<p className="bg-pink-600 w-full rounded-b-md p-1 text-gray-100 text-center">
								{style.name}
							</p>
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default SelectStyle
