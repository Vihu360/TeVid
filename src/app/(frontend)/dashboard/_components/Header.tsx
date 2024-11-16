import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import { IconBaselineDensityMedium } from '@tabler/icons-react'

const Header = () => {
	return (
		<div className='w-full bg-black flex justify-between items-center p-4 md:hidden '>
			<div className='p-1 px-3 flex justify-between w-full items-center'>

				<div className='flex gap-2 items-center justify-center'>
					<Image src='/logo.jpg' width={100} height={100} alt='logo' className='w-12 h-12' />
					<p className='text-white text-2xl'>CraftErsa</p>
				</div>

				<IconBaselineDensityMedium stroke={2} className='text-white' />


			</div>

			<div className='hidden md:flex justify-between items-center p-1 text-white'>

				<Button className='bg-black text-white'>About Us</Button>
				<Button>Pricing</Button>
				<Button>Support</Button>
				<Button>Dashboard</Button>

				<div className='rounded-full w-8 border bg-white h-8'>

				</div>

			</div>
		</div>
	)
}

export default Header
