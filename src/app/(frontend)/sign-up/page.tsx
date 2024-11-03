"use client"

import React, { useState } from 'react'
import {
	IconBrandGoogleFilled,
	IconMail,
	IconLock,
	IconUser,
	IconArrowRight,
	IconUserCircle
} from '@tabler/icons-react'
import Link from 'next/link'

const AuthPage = () => {
	const [isSignUp, setIsSignUp] = useState(false)
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Handle form submission
		console.log(formData)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	return (
		<div className="min-h-screen w-full bg-[#FCF7ED] flex items-center justify-center md:p-4 ">
			<div className="w-full max-w-4xl bg-white rounded-2xl md:shadow-lg flex flex-col md:flex-row overflow-hidden md:border-2 border-black">
				{/* Left Side - Image/Welcome */}
				<div className="w-full md:w-1/2 bg-[#F1DE9A] p-8 md:p-0 md:flex flex-col justify-center items-center hidden ">

					<div className='relative hidden md:block w-full h-full'>
						<video
							autoPlay
							loop
							muted
							className="absolute inset-0 w-full h-full object-cover"
							src="/video4.mp4"
						></video>

						<div className="md:absolute hidden md:block inset-0 bg-black opacity-40"></div>

					</div>

					<div className="text-center md:absolute">
						<h2 className="text-3xl font-bold text-white mb-6">
							{isSignUp ? "Welcome!" : "Welcome Back!"}
						</h2>
						<p className="text-white mb-8">
							{isSignUp
								? "Already have an account?"
								: "Don't have an account yet?"}
						</p>
						<button
							onClick={() => setIsSignUp(!isSignUp)}
							className="px-8 py-3 rounded-full bg-white text-gray-800 font-semibold
                         transition-all duration-300 shadow-md
                        hover:shadow-lg hover:bg-[#F1DE9A] hover:text-black"
						>
							{isSignUp ? "Sign In" : "Sign Up"}
						</button>
					</div>

				</div>

				{/* Right Side - Form */}
				<div className="w-full md:w-1/2 p-8 md:bg-white bg-[#FCF7ED]">
					<div className="max-w-md mx-auto">
						<h3 className="text-2xl font-bold text-gray-800 mb-6">
							{isSignUp ? "Create Account" : "Sign In"}
						</h3>


						<form onSubmit={handleSubmit} className="space-y-4">
							{isSignUp && (
								<div className="flex gap-4">
									<div className="flex-1">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											First Name
										</label>
										<div className="relative">
											<input
												required
												type="text"
												name="firstName"
												value={formData.firstName}
												onChange={handleChange}
												className="w-full px-4 py-3 rounded-lg border border-gray-300
                                 focus:ring-2 focus:ring-pink-600 focus:border-transparent
                                 transition-all duration-300 pl-10"
												placeholder="John"
											/>
											<IconUser className="absolute left-3 top-3.5 text-gray-400" size={20} />
										</div>
									</div>
									<div className="flex-1">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Last Name
										</label>
										<div className="relative">
											<input
												required
												type="text"
												name="lastName"
												value={formData.lastName}
												onChange={handleChange}
												className="w-full px-4 py-3 rounded-lg border border-gray-300
                                 focus:ring-2 focus:ring-pink-600 focus:border-transparent
                                 transition-all duration-300 pl-10"
												placeholder="Doe"
											/>
											<IconUserCircle className="absolute left-3 top-3.5 text-gray-400" size={20} />
										</div>
									</div>
								</div>
							)}

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Email
								</label>
								<div className="relative">
									<input
										required
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="w-full px-4 py-3 rounded-lg border border-gray-300
                             focus:ring-2 focus:ring-pink-600 focus:border-transparent
                             transition-all duration-300 pl-10"
										placeholder="john@example.com"
									/>
									<IconMail className="absolute left-3 top-3.5 text-gray-400" size={20} />
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Password
								</label>
								<div className="relative">
									<input
										required
										type="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										className="w-full px-4 py-3 rounded-lg border border-gray-300
                             focus:ring-2 focus:ring-pink-600 focus:border-transparent
                             transition-all duration-300 pl-10"
										placeholder="••••••••"
									/>
									<IconLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
								</div>
							</div>

							{!isSignUp && (
								<div className="flex justify-end">
									<Link
										href="/forgot-password"
										className="text-sm text-pink-600 hover:text-pink-700"
									>
										Forgot password?
									</Link>
								</div>
							)}

							<button
								type="submit"
								className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold
                         hover:bg-pink-700 transition-colors duration-300 flex items-center
                         justify-center gap-2"
							>
								{isSignUp ? "Create Account" : "Sign In"}
								<IconArrowRight size={20} />
							</button>
						</form>

						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-[#FCF7ED] md:bg-white text-gray-500">Or continue with</span>
							</div>
						</div>

						{/* Google Sign In Button */}
						<button className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-3
                             border-2 border-gray-200 rounded-lg hover:bg-[#F1DE9A]
                             transition-colors duration-300">
							<IconBrandGoogleFilled />
							<span>Continue with Google</span>
						</button>


					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthPage
