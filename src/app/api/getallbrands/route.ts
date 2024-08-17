import { db } from "@/db";

export async function GET(req: Request) {
    try {
        const brands = await db.brand.findMany({
            include: {
              rewards: true,
            },
          });
      return new Response(JSON.stringify(brands), {
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