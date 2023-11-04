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

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!user.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is Required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is Required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size ID is Required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color Id is Required", { status: 400 });
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

    const product = await db.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        storeId: params.storeid,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
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
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    if (!params.storeid) {
      return new NextResponse("StoreId is Required", { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        storeId: params.storeid,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
