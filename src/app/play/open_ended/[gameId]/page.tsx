import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

type TGame = {
  params: {
    gameId: string;
  }
}

const OpenEndedPage = async ({ params }: TGame) => {
  const { gameId } = params;
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });
  return (
    <div>{JSON.stringify(game, null, 2)}</div>
  )
}

export default OpenEndedPage
