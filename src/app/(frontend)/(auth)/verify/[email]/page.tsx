"use client"
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { IconLoaderQuarter } from '@tabler/icons-react';

const VerifyCode = () => {
	const [code, setCode] = useState<string>('');
	const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false); // Allow immediate resend first time
	const [timer, setTimer] = useState<number>(0); // Timer starts
	const [resendCount, setResendCount] = useState<number>(0); // Tracks the number of resend attempts
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { toast } = useToast();
	const router = useRouter();
	const param = useParams<{ email: string }>()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Allow only digits and limit length to 6
		const value = e.target.value.replace(/[^0-9]/g, '');
		if (value.length <= 6) {
			setCode(value);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {

		setIsSubmitting(true);

		e.preventDefault();

		try {

			const decodedEmail = param.email.replace(/%40/g, "@")

			const response = await axios.post("/api/VerifyCode", { email: decodedEmail, code: code });

			toast({
				title: "Success",
				description: response.data.message,
			})

			router.replace('/dashboard');
		} catch (error) {

			const axiosError = error as AxiosError;
			let errorMessage = "There was an issue with the request, the admin has been notified.";

			// Handle different types of error responses
			if (axiosError.response?.data && typeof axiosError.response.data === 'object') {
				const errorData = axiosError.response.data as { message?: string, error?: string };
				errorMessage = errorData.message ?? errorData.error ?? errorMessage;

			} else if (typeof axiosError.response?.data === 'string') {
				errorMessage = axiosError.response.data;
			}

			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});

		}
		finally {
			setIsSubmitting(false);
		}
	};

	const handleResend = () => {
		if (resendCount === 0) {

			// set with actual resend logic

			toast({
				title: "Success",
				description: "Verification code resent!",
			})
			setResendCount(1);
		} else {
			setIsResendDisabled(true);
			setTimer(90); // Set timer to 90 seconds (1:30) for subsequent resends
			alert('Verification code resent!'); // Replace with actual resend logic
		}
	};

	// Timer countdown logic
	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		} else if (timer === 0 && resendCount > 0) {
			setIsResendDisabled(false);
		}
	}, [timer, resendCount]);

	// Format timer as MM:SS
	const formatTimer = () => {
		const minutes = Math.floor(timer / 60);
		const seconds = timer % 60;
		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-[#FCF7ED]">
			<div className="w-full max-w-md p-8 md:bg-white md:shadow-lg rounded-lg">
				<h1 className="text-2xl font-semibold text-center mb-6">Verify Your Account</h1>
				<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
					<label htmlFor="code" className="text-lg font-medium text-black">
						Enter the 6-digit Code
						<p className='text-red-600 text-base'>sent on your registered email </p>
					</label>
					<input
						type="text"
						id="code"
						value={code}
						onChange={handleChange}
						className="w-full p-3 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
						placeholder="XXXXXX"
						maxLength={6}
					/>
					<button
						type="submit"
						className="w-full py-3 mt-4 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors font-semibold flex justify-center items-center"
					>
						{isSubmitting ? <IconLoaderQuarter className="animate-spin" size={25} />
							: "Verify Code"}
					</button>
				</form>

				<div className="mt-6 text-center">
					{isResendDisabled ? (
						<p className="text-sm text-gray-500">Resend available in {formatTimer()}</p>
					) : (
						<button
							onClick={handleResend}
							className="mt-4 text-sm text-red-600 hover:underline"
							disabled={isResendDisabled}
						>
							Resend Code
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default VerifyCode;
