import { chatSession } from "@/configs/aiModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {

	try {

		const { prompt } = await request.json()

		console.log(prompt);

		const result = await chatSession.sendMessage(prompt)


		console.log(result.response.text())

		return NextResponse.json({
			'result': JSON.parse(result.response.text())
		})

	} catch (error) {

		return NextResponse.json({
			'error': error
		})

	}

}
