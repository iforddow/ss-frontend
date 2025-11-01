import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    const serverToken = process.env.VISUAL_EDITING_TOKEN;

    if (!serverToken) {
      return NextResponse.json(
        { isValid: false, error: "Visual editing not configured" },
        { status: 500 },
      );
    }

    const isValid = token === serverToken;

    return NextResponse.json({ isValid });
  } catch (error) {
    console.error("Error validating visual editing token:", error);
    return NextResponse.json(
      { isValid: false, error: "Invalid request" },
      { status: 400 },
    );
  }
}
