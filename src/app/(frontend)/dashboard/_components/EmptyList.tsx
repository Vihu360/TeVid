import { Button } from '@/components/ui/button'
import React from 'react'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'

const EmptyList = () => {
	return (
		<div className=' md:p-5 py-24 mt-10 flex flex-col justify-center text-center items-center gap-6'>
			<p className='text-2xl text-gray-100 '>
			You do not have any videos created yet.
			</p>
			<Link href='/dashboard/create-new'>
			<Button>
				<IconPlus stroke={2} />
				Create New ( 5 credits )
				</Button>
			</Link>
		</div>
	)
}

export default EmptyList
