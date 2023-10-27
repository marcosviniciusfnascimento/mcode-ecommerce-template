import { NextResponse } from "next/server";

export const SomethingWentWrong = () => {
  return NextResponse.json(
    { message: "Something Went Wrong" },
    { status: 500 }
  );
};
