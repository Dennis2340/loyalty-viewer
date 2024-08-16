import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function GET(req: Request, { params }: { params: { brandId: string } }) {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      const userId = user?.id;
  
      const {brandId} = params

      if (!userId || !brandId)
        return new Response("User ID and Brand ID are required", {
          status: 400,
        });
  
      // Find the user's points for the specific brand
      const points = await db.point.findFirst({
        where: {
          userId: userId,
          brandId: brandId
        },
      });
  
      return new Response(JSON.stringify(points), {
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