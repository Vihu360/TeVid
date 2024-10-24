"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { IconGauge } from '@tabler/icons-react';
import Link from 'next/link';

const Sidenav = () => {

	const menu = [
		{
			id: 1,
			name: 'Dashboard',
			href: '/dashboard',
			icon: 'dashboard',
		},
		{
			id: 2,
			name: 'Reels',
			href: '/dashboard/create-new',
			icon: 'reels',
		},
		{
			id: 3,
			name: 'Profile',
			href: '/profile',
			icon: 'profile',
		},
		{
			id: 4,
			name: 'Settings',
			href: '/settings',
			icon: 'settings',
		},
		{
			id: 5,
			name: 'Upgrade',
			href: '/upgrade',
			icon: 'upgrade',
		}
	]

	const path = usePathname();
	console.log(path)

	return (
		<div className='w-64 h-screen sahdow-md p-5 border-2 border-r-black'>

			{menu.map((item) => (
				<Link key={item.id} href={item.href}>
				<div key={item.id} className={`flex items-center gap-2 text-xl font-medium rounded-xl p-3 mt-1 bg-black text-white hover:bg-pink-600 ${path === item.href ? 'bg-pink-600 ' : ''}`}>
					<IconGauge stroke={2} />
					<h1 className=''>{item.name}</h1>
				</div>
				</Link>
			))}
		</div>
	)
}

export default Sidenav
