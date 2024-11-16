import React from 'react'
import Sidenav from './_components/Sidenav'
import Header from './_components/Header'



interface DashboardLayoutProps {
	children: React.ReactNode
}


const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
	return (
		<div className='w-full min-h-screen bg-[#000]'>
			<div className='hidden md:block h-screen fixed w-64 overflow-hidden'>
				<Sidenav/>
			</div>
			<div className='md:ml-64 overflow-hidden h-full '>
				<Header/>
			{children}
			</div>
		</div>
	)
}

export default DashboardLayout
