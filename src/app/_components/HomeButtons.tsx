"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HomeButtons = () => {

	const ButtonText = [
		{
			text: 'Home',
			id: 1,
			href: '/',
		},
		{
			text: 'Use Cases',
			id: 2,
			href: '/use-cases',
		},
		{
			text: 'Features',
			id: 3,
			href: '/features',
		},
		{
			text: 'Pricing',
			id: 4,
			href: '/pricing',
		}
	]

	const path = usePathname();

	return (
		<div className='flex gap-4'>
			{ButtonText.map((data) => (
				<Link
					key={data.id}
					href={data.href}
					className={`hover:underline-offset-[30px] hover:underline px-2 ${path === data.href ? 'underline-offset-[30px] underline' : ''}`}
				>
					{data.text}
				</Link>
			))}
		</div>
	)
}

export default HomeButtons
