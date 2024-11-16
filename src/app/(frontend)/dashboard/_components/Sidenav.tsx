'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { IconGauge, IconPlus, IconUser, IconSettings, IconStar, IconAccessPoint, IconBrandAppgallery, IconMessage2, IconMoneybag } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

const iconMap1 = {
	dashboard: IconGauge,
	IconPlus: IconPlus,
	profile: IconUser,
	settings: IconSettings,
	upgrade: IconStar,
};

const iconMap2 = {
	usage: IconAccessPoint,
	billings: IconBrandAppgallery,
	support: IconMessage2,
	affilates: IconMoneybag,
};

const Sidenav = () => {
	const [creditRemain] = useState(0);
	const path = usePathname();

	const menu = [
		{ id: 1, name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
		{ id: 2, name: 'New Project', href: '/dashboard/create-new', icon: 'IconPlus' },
		{ id: 3, name: 'Inspirations', href: '/inspirations', icon: 'upgrade' },
		{ id: 4, name: 'Upgrade Plans', href: '/upgrade', icon: 'upgrade' },
		{ id: 5, name: 'Profile', href: '/profile', icon: 'profile' },
	];

	const Settings = [
		{ id: 6, name: 'Usage', href: '/usage', icon: 'usage' },
		{ id: 7, name: 'Billing', href: '/billing', icon: 'billings' },
		{ id: 8, name: 'Support', href: '/support', icon: 'support' },
		{ id: 9, name: 'Affiliates', href: '/affiliates', icon: 'affilates' },
	];

	return (
		<div className='w-60 h-screen shadow-md p-5 border-r-2 border-white flex flex-col justify-between'>
			<div>
				<div className='flex justify-center items-center p-3 mr-2'>
					<Image src='/logo.jpg' width={100} height={100} alt='logo' className='w-12 h-12' />
					<h1 className='text-3xl font-bold text-white'>CraftErsa</h1>
				</div>

				{menu.map((item) => {
					const IconComponent = iconMap1[item.icon as keyof typeof iconMap1];

					return (
						<Link key={item.id} href={item.href}>
							<div
								className={`flex items-center gap-2 text-base font-medium rounded-xl p-3 mt-1 ${path === item.href ? 'bg-[#FFE5CF] text-black hover:bg-[#FFE5CF]' : 'bg-[#121B28] text-white hover:bg-gray-800'
									}`}
							>
								{IconComponent && <IconComponent stroke={2} className={`${path === item.href ? 'text-black' : 'text-white'}`} />}
								<h1 className={`font-weight-[400] ${path === item.href ? 'text-black hover:text-black' : ''}`}>{item.name}</h1>
							</div>
						</Link>
					);
				})}

				<p className='text-gray-400 text-sm py-3'>Settings</p>

				{Settings.map((item) => {
					const IconComponent = iconMap2[item.icon as keyof typeof iconMap2];

					return (
						<Link key={item.id} href={item.href}>
							<div
								className={`flex items-center gap-2 text-base font-medium rounded-xl p-3 mt-1 ${path === item.href ? 'bg-[#FFE5CF] text-black hover:bg-[#FFE5CF]' : 'bg-[#121B28] text-white hover:bg-gray-800'
									}`}
							>
								{IconComponent && <IconComponent stroke={2} className={`${path === item.href ? 'text-black' : 'text-white'}`} />}
								<h1 className={`font-weight-[400] ${path === item.href ? 'text-black hover:text-black' : ''}`}>{item.name}</h1>
							</div>
						</Link>
					);
				})}
			</div>

			<div className='bg-gray-700 p-2 text-sm rounded-xl flex items-center justify-between px-3'>
				<p className='text-gray-200'>Credits Remaining</p>
				<p className={`${creditRemain > 20 ? 'text-gray-200' : 'text-red-400'} flex items-center justify-center`}>{creditRemain}</p>
			</div>
		</div>
	);
};

export default Sidenav;
