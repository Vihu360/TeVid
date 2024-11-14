import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

	const token = req.cookies.get("refreshToken")?.value;

	if (!token) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // Unauthorized
	}

	return NextResponse.json({ token });



}
