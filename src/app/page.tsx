import { Button } from "@/components/ui/button";
import { IconArrowRightDashed } from '@tabler/icons-react';
import { IconArrowRight, IconUserCheck } from '@tabler/icons-react';
import Image from "next/image";
import HomeHeader from "./_components/HomeHeader";
import Link from "next/link";



export default function Home() {
	return (
		<div>
			<HomeHeader />
			<div className=" bg-[#FCF7ED] min-h-screen min-w-screen pt-40 flex flex-col gap-7">

				<div className="flex justify-center">
					<p className="text-5xl md:text-6xl bg-[#F1DE9A] font-semibold p-2 text-center">Script It, Clip It, Zip It</p>
				</div>

				<div className="flex  justify-center px-4 md:px-96">
					<p className="text-center text-sm md:text-base p-2 text-gray-800">Bring Your Ideas to Life in Minutes! Our easy-to-use AI video generator transforms text into vibrant videos. With realistic voiceovers and dynamic clips, creating your story has never been simpler. Start crafting your masterpiece today!
					</p>
				</div>

				<div className="flex flex-col items-center justify-center gap-2">
					<Link href={'/sign-up'}>
						<Button className="flex items-center justify-center gap-2 p-5 py-6 bg-pink-600">
							<p className="text-lg p-2 py-3">
								Start for free
							</p>
							<IconArrowRightDashed stroke={2} />
						</Button>
					</Link>
					<p className="text-xs text-gray-600">no credit card required</p>
				</div>

				<div className="flex gap-2 bg-black w-full py-14 text-white">

				</div>

				<div className="flex items-center justify-center">
					<div className="md:w-5/6 w-full p-2 bg-black flex flex-col items-center justify-center gap-7 md:rounded-[50px] ">
						<p className="md:text-2xl text-xl text-gray-100 mt-4 text-center">Your Words, Our Craft—Video Awaits!</p>

						<div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between w-full ">
							<div className="w-full  flex items-center justify-center py-4">
								<Image src="/homeimg1.jpg" width={100} height={100} className="w-[70%] h-auto object-cover border-4 border-gray-100 rounded-3xl" alt="" />
								<Image src="/playbutton.png" width={100} height={100} className="absolute w-32" alt="playbutton" />
							</div>
							<div className="text-gray-100 w-full flex flex-col text-center md:text-left px-4 md:px-0 md:items-start gap-5 mb-7">
								<p className="bg-gray-100 text-gray-800 p-2 rounded-xl">How to turn text to video online?</p>


								<div>
									<p className="">Step 1: Input your texts</p>
									<p className="text text-gray-400">Do not worry, our advanced AI make texts into a premium prompts which caters a great video for you</p>
								</div>

								<div>
									<p>Step 2: choose the duration</p>
									<p className="text text-gray-400">Pick a suitable duration for your video between 30 seconds to 15 minutes !</p>
								</div>

								<div>
									<p>Step 3: Select an AI Avatar styles you prefer</p>
									<p className="text text-gray-400">Choose from numerous styles covering different colors, shades, and lights, voices. </p>
								</div>

								<div>
									<p>Step 4: Create your video</p>
									<p className="text text-gray-400">Create your perfect video by just clicking on submit</p>
								</div>
							</div>
						</div>






					</div>
				</div>


				<div className="flex flex-col items-center justify-center mt-16 gap-20">

					<div className="flex flex-col items-center text-center p-4 justify-center text-4xl md:text-7xl font-semibold gap-2 overflow-hidden">
						<p>USE THE FULL POWER OF VIDEO</p>
						<p className="text-pink-600">TO GROW YOUR BUSINESS</p>
					</div>

					<div className=" grid grid-cols-1 md:grid-cols-2 w-5/6 justify-between gap-5 mb-16">

						<div className="w-full flex flex-col items-start justify-center gap-4">
							<p className="text-2xl">Scale you Shorts/Reels production in <span className="text-pink-600 font-semibold text-3xl">NO TIME</span> </p>
							<p className=" text-base text-gray-600">
								Amplify your YouTube Shorts and Instagram Reels production with CraftErsa AI and watch your engagement soar. Simply prompt CraftErsa AI with any intriguing topic, and get AI-generated videos that will enhance your online presence and attract more viewers.
							</p>

							<div className="grid grid-cols-1 md:grid-cols-2 items-center justify-start gap-4">
								<Button className='p-5 border bg-white text-black border-black text-base hover:bg-[#F1DE9A] hover:text-black flex justify-center items-center gap-2 py-7'>
									<IconArrowRight stroke={2} />
									Create video like this
								</Button>

								<Link href={'/sign-up'}>

								<Button className='p-5 border bg-white text-black border-black text-lg hover:bg-[#F1DE9A] hover:text-black flex justify-center items-center gap-2 py-7'>
									<IconUserCheck stroke={2} />
									Create your free account
									</Button>
								</Link>
							</div>
						</div>


						<div className="flex md:gap-10 justify-end">

							<div className=" w-52 h-72">
								<Image src="/video1.gif" width={100} height={100} alt="video2" className="w-full h-full object-cover " />

							</div>

							<div className=" w-52 h-72 ">
								<Image src="/video2.gif" width={100} height={100} alt="video2" className="w-full h-full object-cover " />
							</div>

						</div>


					</div>

				</div>





				<div className="flex items-center justify-center ">

					<div className="md:w-5/6 w-full p-2 bg-black flex flex-col items-center justify-center gap-7 md:rounded-[50px] ">

					</div>
				</div>

			</div>
		</div>
	);
}
