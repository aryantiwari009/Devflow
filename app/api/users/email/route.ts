import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
import User from "@/database/user.model";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) throw new NotFoundError("Email not found");

  try {
    await dbConnect();

    const validatedData = UserSchema.pick({
      email: true,
    }).safeParse({ email });

    if (!validatedData.success) {
      throw new Error("Invalid email format");
    }

    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User not found");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
