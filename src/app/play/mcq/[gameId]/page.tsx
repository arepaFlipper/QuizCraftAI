import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import MCQ from "@/components/MCQ";

type TGame = {
  params: {
    gameId: string;
  }
}

const OpenEndedMCQPage = async ({ params }: TGame) => {
  const { gameId } = params;
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        }
      },
    }
  });
  if (!game || game.gameType !== "mcq") {
    return redirect("/quiz");
  }
  return (
    <MCQ game={game} />
  )
}

export default OpenEndedMCQPage
