import db from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { SomethingWentWrong } from "./protocols";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, "Name is Required").max(100),
  email: z.string().min(1, "Email is Required").email("Email Invalid"),
  password: z
    .string()
    .min(1, "Password is Required")
    .min(8, "Password must have more than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "Email already registered!",
        },
        { status: 409 }
      );
    }

    const actualDate = new Date();
    const hashPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        password: hashPassword,
        email,
        createdAt: actualDate,
      },
    });

    const { password: newUserPassword, ...restUser } = newUser;

    return NextResponse.json(
      { user: restUser, message: "User created succesfully!" },
      { status: 201 }
    );
  } catch (error) {
    return SomethingWentWrong();
  }
}
