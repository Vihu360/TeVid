import React from 'react'
import Header from './_components/Header'
import Sidenav from './_components/Sidenav'



interface DashboardLayoutProps {
	children: React.ReactNode
}


const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
	return (
		<div className='w-screen h-screen bg-[#FCF7ED]'>
			<div className='hidden md:block h-screen fixed mt-[85px] w-64'>
				<Sidenav/>
			</div>
			<div className=' '>
				<Header />
				<div className='md:ml-64 p-2 md:p-10 overflow-hidden'>
			{children}
				</div>
			</div>
		</div>
	)
}

export default DashboardLayout
