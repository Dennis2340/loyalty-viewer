import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req: Request, { params }: { params: { brandId: string } }) {
  try {
     const {brandId} = params
    if (!brandId) return new Response("Brand ID is required", { status: 400 });

    const brand = await db.brand.findUnique({
      where: { id: brandId },
      include: {
        rewards: true,
        points: true,
      },
    });

    if (!brand) return new Response("Brand not found", { status: 404 });

    return new Response(JSON.stringify(brand), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error occurred", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { brandId: string } }) {
  try {
   
    const { brandId } = params
    if (!brandId) return new Response("Brand ID is required", { status: 400 });

    const body = await req.json()

    const { name, description, logoUrl, websiteUrl } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const brand = await db.brand.findUnique({ where: { id:brandId } });

    if (!brand || brand.ownerId !== userId)
      return new Response("Unauthorized", { status: 401 });

    const updatedBrand = await db.brand.update({
      where: { id: brandId },
      data: { name, description, logoUrl, websiteUrl },
    });

    return new Response(JSON.stringify(updatedBrand), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error occurred", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { brandId: string } }) {
  try {
    const {brandId} = params
    if (!brandId) return new Response("Brand ID is required", { status: 400 });

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const brand = await db.brand.findUnique({ where: { id:brandId } });

    if (!brand || brand.ownerId !== userId)
      return new Response("Unauthorized", { status: 401 });

    await db.brand.delete({
      where: { id:brandId },
    });

    return new Response(
      JSON.stringify({ message: "Brand deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error occurred", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
