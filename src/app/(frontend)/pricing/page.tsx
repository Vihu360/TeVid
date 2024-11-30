// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { PayPalButtons } from "@paypal/react-paypal-js"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/app/_components/Footer"
import axios from "axios"
import { verifyRefreshToken } from "@/configs/auth-utilis"
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

type PricingSwitchProps = {
	onSwitch: (value: string) => void
}

type PricingCardProps = {
	isYearly?: boolean
	title: string
	monthlyPrice?: number
	yearlyPrice?: number
	description: string
	features: string[]
	actionLabel: string
	popular?: boolean
	exclusive?: boolean
	onSelectPrice: (price: number) => void
}

const PricingHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<section className="text-center text-white">
		<h2 className="text-3xl font-bold">{title}</h2>
		<p className="text-xl pt-1">{subtitle}</p>
		<br />
	</section>
)

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (


	<Tabs defaultValue="0" className="w-40 mx-auto" onValueChange={onSwitch}>
		<TabsList className="py-6 px-2 bg-zinc-800">
			<TabsTrigger value="0" className="text-base text-white data-[state=active]:bg-zinc-100">
				Monthly
			</TabsTrigger>
			<TabsTrigger value="1" className="text-base text-white data-[state=active]:bg-zinc-100">
				Yearly
			</TabsTrigger>
		</TabsList>
	</Tabs>
)

const PricingCard = ({
	isYearly,
	title,
	monthlyPrice,
	yearlyPrice,
	description,
	features,
	actionLabel,
	popular,
	exclusive,
	onSelectPrice
}: PricingCardProps) => {
	const [showPaymentDialog, setShowPaymentDialog] = useState(false);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [userData, setUserData] = useState("");

	const { toast } = useToast();
	const router = useRouter();

	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {

		const response = await axios.get('/api/Token');

		console.log("response", response);

		if (!response.data.token) return null
		else {

			const token = response.data.token
			const findUserEmail = await verifyRefreshToken(token);

			const userEmail = findUserEmail?.email ?? "";
			setIsUserLoggedIn(true);
			setUserData(userEmail);

		}
	}


	const handleSelect = () => {

		if (!isUserLoggedIn) {

			toast({
				title: "Error",
				description: "Please login to continue",
			})
			return router.push("/sign-up");

		}
		const selectedPrice = isYearly ? yearlyPrice : monthlyPrice
		if (selectedPrice !== undefined) {
			onSelectPrice(selectedPrice)
			setShowPaymentDialog(true)
		}
	}

	const onPaymentSuccess = async () => {
		// Handle payment success
		alert("payment successful");
		setShowPaymentDialog(false);

		const user = await db.select().from(Users).where(eq(Users.email, userData)).execute();

		if (user[0].credits !== null && user[0].credits !== undefined) {
			await db.update(Users).set({ credits: user[0].credits + 500 }).where(eq(Users.email, user[0].email ?? '')).execute();
			toast({
				title: "Success",
				description: "500 Credits deducted successfully",
			});
			router.push("/dashboard");
		} else {
			console.error("User credits is null or undefined");
		}
	}

	return (
		<>
			<Card
				className={cn(`w-72 flex flex-col justify-between py-1 bg-zinc-900 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`, {
					"animate-background-shine bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
						exclusive,
				})}>
				<div>
					<CardHeader className="pb-8 pt-4">
						{isYearly && yearlyPrice && monthlyPrice ? (
							<div className="flex justify-between">
								<CardTitle className="text-zinc-300 text-lg">{title}</CardTitle>
								{monthlyPrice > 0 && (
									<div
										className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-800 text-white", {
											"bg-gradient-to-r from-orange-400 to-rose-400 text-black": popular,
										})}>
										Save ${monthlyPrice * 12 - yearlyPrice}
									</div>
								)}
							</div>
						) : (
							<CardTitle className="text-zinc-300 text-lg">{title}</CardTitle>
						)}
						<div className="flex gap-0.5">
							<h3 className="text-3xl font-bold text-white">
								{yearlyPrice && isYearly ? "$" + yearlyPrice : monthlyPrice !== undefined ? "$" + monthlyPrice : "Custom"}
							</h3>
							<span className="flex flex-col justify-end text-sm mb-1 text-zinc-400">
								{yearlyPrice && isYearly ? "/year" : monthlyPrice !== undefined ? "/month" : null}
							</span>
						</div>
						<CardDescription className="pt-1.5 h-12 text-zinc-400">{description}</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-2">
						{features.map((feature: string) => (
							<CheckItem key={feature} text={feature} />
						))}
					</CardContent>
				</div>
				<CardFooter className="mt-2">
					<Button
						onClick={handleSelect}
						className="relative inline-flex w-full items-center justify-center rounded-md bg-white px-6 font-medium text-black transition-colors focus:border-2 hover:text-white hover:bg-slate-500"
					>
						<div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
						{isUserLoggedIn ? actionLabel : "Login to continue"}
					</Button>
				</CardFooter>
			</Card>

			<Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
				<DialogContent className="bg-black text-white">
					<DialogHeader>
						<DialogTitle>Make Your Payment</DialogTitle>
					</DialogHeader>
					<div className="p-4">
						<p>Selected Plan: {title}</p>
						<p>Price: ${isYearly ? yearlyPrice : monthlyPrice}{isYearly ? "/year" : "/month"}</p>
						<p className="mt-4 mb-4">You can proceed with your payment here.</p>
						<PayPalButtons
							style={{ layout: "horizontal" }}
							onApprove={(data, actions) => {
								// Need to return the actions.order.capture() promise
								return actions.order.capture().then(() => {
									onPaymentSuccess();
								});
							}}
							onCancel={() => alert("payment failed")}
							createOrder={(data, actions) => {
								return actions.order.create({
									purchase_units: [
										{
											amount: {
												value: isYearly ? yearlyPrice : monthlyPrice,
												currency_code: "USD",
											},
										},
									],
								});
							}}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

const CheckItem = ({ text }: { text: string }) => (
	<div className="flex gap-2">
		<CheckCircle2 size={18} className="my-auto text-green-400" />
		<p className="pt-0.5 text-zinc-300 text-sm">{text}</p>
	</div>
)

export default function Page() {
	const [isYearly, setIsYearly] = useState(false)
	const [selectedPrice, setSelectedPrice] = useState<number>(0);

	const togglePricingPeriod = (value: string) => {
		setIsYearly(parseInt(value) === 1)
	}

	console.log(selectedPrice);

	const plans = [
		{
			title: "Free",
			monthlyPrice: 0,
			yearlyPrice: 0,
			description: "Free feature for trial videos",
			features: ["Optimized for social media posting", "Create upto 3 videos", "Image generation only", "No credit card required"],
			actionLabel: "Get Started",
		},
		{
			title: "Pro",
			monthlyPrice: 25,
			yearlyPrice: 250,
			description: "Perfect for owners of small & medium businessess",
			features: ["Optimized for social media posting", "Create upto 40 videos", "Image + videos generation ", "Priority Support 24*7"],
			actionLabel: "Get Started",
			popular: true,
		},
		{
			title: "Ultra Pro Max",
			monthlyPrice: 50,
			yearlyPrice: 500,
			description: "Perfect for owners of small & medium businessess",
			features: ["Optimized for social media posting", "Create upto 100 videos", "Image + videos generation", "Priority Support 24*7", "Feature on demand"],
			actionLabel: "Get Started",
			exclusive: true,
		},
	]

	return (
		<div className="py-8 bg-black min-h-screen">
			<PricingHeader title="Pricing Plans" subtitle="Choose the plan that's right for you" />
			<PricingSwitch onSwitch={togglePricingPeriod} />
			<section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
				{plans.map((plan) => (
					<PricingCard
						key={plan.title}
						{...plan}
						isYearly={isYearly}
						onSelectPrice={setSelectedPrice}
					/>
				))}
			</section>

			<div className="flex flex-col gap-2 mt-6 items-center">
				<p className="text-white text-2xl">FAQs</p>
				<p className="text-white text-xl md:text-3xl py-5">Frequently Asked Questions</p>
			</div>

			<div className="flex flex-col item-center justify-center md:px-72">


				<Accordion type="single" collapsible>
					<AccordionItem value="item-1" className="text-white flex flex-col text-2xl items-center justify-center">
						<AccordionTrigger className="text-xl">Do we offer free trials ?</AccordionTrigger>
						<AccordionContent className="px-3 text-center text-base">
							Yes. We offer free traials but it is limited to 3 videos only, you can purchase credits and make numerous videos. Spending countless hours doing it yourself, this is by far the best and most economical way to generate tons of amazing videos fast.
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Accordion type="single" collapsible>
					<AccordionItem value="item-2" className="text-white flex flex-col text-2xl items-center justify-center">
						<AccordionTrigger className="text-xl">What If I run out of credits ?</AccordionTrigger>
						<AccordionContent className="px-3 text-center text-base">
							Yes, you can either invest on a bigger plan (best value) or top up your credits directly in the app when you run out.
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Accordion type="single" collapsible>
					<AccordionItem value="item-3" className="text-white flex flex-col text-2xl items-center justify-center">
						<AccordionTrigger className="text-xl">Are my payments secure credits ?</AccordionTrigger>
						<AccordionContent className="px-3 text-center text-base">
							All of our payments are processed through PayPal, which is one of the most secure payment processors out there. We do not even store any of your payment information.
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Accordion type="single" collapsible>
					<AccordionItem value="item-4" className="text-white flex flex-col text-2xl items-center justify-center">
						<AccordionTrigger className="text-xl">Do we offer supoort ?</AccordionTrigger>
						<AccordionContent className="px-3 text-center text-base">
							You can reach out at me persoanlly at vivekbarnwal360@gmail.com for anything. I mostly respond in under 12 hours on weekdays. We do prioritize paying customers and have live chat support for them.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>

			<Footer />

		</div>
	)
}
