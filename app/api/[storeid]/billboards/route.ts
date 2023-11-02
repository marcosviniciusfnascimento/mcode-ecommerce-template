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

    const { label, imageUrl } = body;

    if (!user.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("ImageUrl is Required", { status: 400 });
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

    const billboard = await db.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeid,
      },
    });

    return NextResponse.json(billboard);
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

    const billboards = await db.billboard.findMany({
      where: {
        storeId: params.storeid,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
