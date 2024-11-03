import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import HomeButtons from './HomeButtons'
import { IconLogin2 } from '@tabler/icons-react'
import Link from 'next/link'

const HomeHeader = () => {
	return (


		<div className='w-full bg-transparent flex justify-between items-center p-4 pt-4 absolute md:px-10 '>

			<div className='flex justify-center items-center gap-3 border-black'>
				<Image src='/logo.jpg' width={100} height={100} alt='logo' className='w-12 h-12' />
				<h1 className='text-3xl font-bold text-black'>CraftErsa</h1>
			</div>

			<div className='hidden md:block md:flex justify-between items-center gap-6 text-xl mt-3'>

			<HomeButtons />

			</div>

			<div className='md:flex gap-2 items-center justify-between hidden md:block'>


				<Link href={'/sign-up'}>
				<Button className='p-5 border bg-white text-black border-black text-lg hover:text-white flex justify-center items-center gap-2 py-7'>
					Get Started
					</Button>
				</Link>

				<Link href={'/sign-up'}>
				<Button className='p-5 border bg-white text-black border-black text-lg hover:text-white hover:bg-[#F1DE9A] hover:text-black flex justify-center items-center gap-2 py-7'>
					<IconLogin2 stroke={2} />
					Login
				</Button>
			</Link>


			</div>
		</div>
	)
}

export default HomeHeader
