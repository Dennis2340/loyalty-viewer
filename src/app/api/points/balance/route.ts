import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    // Calculate the total points balance for the user across all brands
    const pointsRecords = await db.point.findMany({
      where: { userId },
    });

    const totalPoints = pointsRecords.reduce((total, record) => total + record.points, 0);

    return new Response(JSON.stringify({ balance: totalPoints }), {
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
