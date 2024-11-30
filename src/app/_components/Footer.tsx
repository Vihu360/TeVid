import React from 'react'
import Image from 'next/image'

const Footer = () => {
	return (
		<div className='w-full h-full flex flex-col items-center justify-center'>

			<div className='mt-4'>
				<Image src="/logo.jpg" alt="logo" width={100} height={100} />
			</div>

			<div className='flex justify-center items-center gap-4 '>

				<button className='text-gray-500 hover:text-gray-100 '>Privacy Policy</button>
				<button className='text-gray-500 hover:text-gray-100'>Terms & Conditions</button>

			</div>

			<p className='text-gray-500 mt-4'>© 2024 CraftErsa. All rights reserved.</p>
			
		</div>
	)
}

export default Footer
