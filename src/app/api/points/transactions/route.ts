import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    // Fetch transactions for the user
    const transactions = await db.point.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        points: true,
        createdAt: true,
        brand: {
          select: {
            name: true
          }
        }
      }
    });

    // Map to include the brand name and format the response
    const formattedTransactions = transactions.map(transaction => ({
      id: transaction.id,
      points: transaction.points,
      date: transaction.createdAt.toISOString(),
      description: `Points from brand: ${transaction.brand.name}`
    }));

    return new Response(JSON.stringify(formattedTransactions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error occurred", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
