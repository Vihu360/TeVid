import { Button } from '@/components/ui/button'
import React from 'react'

const Header = () => {
	return (
		<div className='w-full bg-black flex justify-between items-center p-5 '>
			<div>

				<h1 className='text-3xl font-bold text-white'>Reels Generator</h1>

			</div>

			<div className='hidden md:block md:flex justify-between items-center p-1'>

				<Button className='bg-black'>About Us</Button>
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
