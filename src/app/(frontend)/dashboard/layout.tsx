"use client"

import React, { useState, useEffect, useMemo } from 'react'
import Sidenav from './_components/Sidenav'
import Header from './_components/Header'
import { userDataDetailsContext } from '@/app/_context/userDataDetailsContext'
import { verifyRefreshToken } from '@/configs/auth-utilis'
import axios from 'axios';
import { db } from '@/configs/db'
import { Users } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { User } from '@/configs/types'

interface DashboardLayoutProps { children: React.ReactNode }

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
	const [userDetail, setUserDetail] = useState<User | undefined>();

	useEffect(() => {
		getUserInfo();
	}, [])

	const getUserInfo = async () => {
		try {
			const response = await axios.get('/api/Token');
			const token = response.data.token
			const findUserEmail = await verifyRefreshToken(token);
			const userEmail = findUserEmail?.email ?? "";
			const User = await db.select().from(Users).where(eq(Users.email, userEmail)).execute();
			setUserDetail(User[0]);
		} catch (error) {
			console.error('Error fetching user info:', error);
			setUserDetail(undefined);
		}
	}

	const contextValue = useMemo(() => ({
		userDetail,
		setUserDetail,
	}), [userDetail, setUserDetail]);

	return (
		<userDataDetailsContext.Provider value={contextValue}>
			<div className='w-full min-h-screen bg-[#000]'>
				<div className='hidden md:block h-screen fixed w-64 overflow-hidden'>
					<Sidenav />
				</div>
				<div className='md:ml-64 overflow-hidden h-full '>
					<Header />
					{children}
				</div>
			</div>
		</userDataDetailsContext.Provider>
	)
}

export default DashboardLayout
