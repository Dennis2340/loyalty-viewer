import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request, { params }: { params: { rewardId: string } }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const reward = await db.reward.findUnique({
      where: { id: params.rewardId },
      include: { brand: true },
    });

    if (!reward) return new Response("Reward not found", { status: 404 });

    // Find the user's points for the specific brand
    const userPoints = await db.point.findFirst({
      where: { 
        userId: userId,
        brandId: reward.brandId
      },
    });

    if (!userPoints || userPoints.points < reward.pointsRequired) {
      return new Response("Insufficient points", { status: 400 });
    }

    // Update the user's points
    await db.point.update({
      where: { 
        id: userPoints.id
      },
      data: { 
        points: { decrement: reward.pointsRequired } 
      },
    });

    return new Response(JSON.stringify({ message: "Reward redeemed successfully" }), {
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


