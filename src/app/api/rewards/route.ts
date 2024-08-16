import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, pointsRequired, brandId } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    // Create the new reward
    const newReward = await db.reward.create({
      data: {
        title,
        description,
        pointsRequired,
        brand: { connect: { id: brandId } },
      },
    });

    return new Response(JSON.stringify(newReward), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error Occurred", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
