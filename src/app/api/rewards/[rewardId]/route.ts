import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req: Request, { params }: { params: { rewardId: string } }) {
  try {
    const reward = await db.reward.findUnique({
      where: { id: params.rewardId },
      include: { brand: true },
    });

    if (!reward) return new Response("Reward not found", { status: 404 });

    return new Response(JSON.stringify(reward), {
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

export async function PATCH(req: Request, { params }: { params: { rewardId: string } }) {
  try {
    const body = await req.json();
    const { title, description, pointsRequired } = body;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const reward = await db.reward.update({
      where: { id: params.rewardId },
      data: { title, description, pointsRequired },
    });

    return new Response(JSON.stringify(reward), {
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

export async function DELETE(req: Request, { params }: { params: { rewardId: string } }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    await db.reward.delete({
      where: { id: params.rewardId },
    });

    return new Response(
      JSON.stringify({ message: "Reward deleted successfully" }),
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
