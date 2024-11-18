"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { IconPlus } from '@tabler/icons-react';
import EmptyList from './_components/EmptyList';
import Link from 'next/link';

const Dashboard = () => {

	const [videoList, ] = useState([]);  // use setVidList later on


	return (

		<div className=''>

			<div className='flex justify-between items-center md:px-16 px-7  pt-8 '>
				<h2 className='text-semibold text-2xl text-white underline underline-offset-8'>Dashboard</h2>
					<Link href='/dashboard/create-new'>
				<Button className='flex bg-white text-black'>
					<IconPlus stroke={2} />
						<p className=''>Create New</p>
				</Button>
					</Link>
			</div>

			{/* Empty list */}

			{videoList?.length==0 &&
				<div>
					<EmptyList />
				</div>
			}


		</div>
	)
}

export default Dashboard
