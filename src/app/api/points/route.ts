import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brandId, points } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    // Find the user's points record for the specific brand
    let userPoints = await db.point.findFirst({
      where: {
        userId: userId,
        brandId: brandId
      },
    });

    if (userPoints) {
      // Update the existing points record
      userPoints = await db.point.update({
        where: { id: userPoints.id },
        data: { points: { increment: points } },
      });
    } else {
      // Create a new points record if not found
      userPoints = await db.point.create({
        data: { userId, brandId, points },
      });
    }

    return new Response(JSON.stringify(userPoints), {
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


