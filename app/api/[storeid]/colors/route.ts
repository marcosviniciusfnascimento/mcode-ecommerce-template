import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { storeid: string };
  }
) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const body = await req.json();

    const { name, value } = body;

    if (!user.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is Required", { status: 400 });
    }

    if (!params.storeid) {
      return new NextResponse("StoreId is Required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId: user.id,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await db.color.create({
      data: {
        name,
        value,
        storeId: params.storeid,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { storeid: string };
  }
) {
  try {
    if (!params.storeid) {
      return new NextResponse("StoreId is Required", { status: 400 });
    }

    const colors = await db.color.findMany({
      where: {
        storeId: params.storeid,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
