import { db } from "@/db";

export async function GET(req: Request, { params }: { params: { brandId: string } }) {
  try {
    const rewards = await db.reward.findMany({
      where: { brandId: params.brandId },
    });

    return new Response(JSON.stringify(rewards), {
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
