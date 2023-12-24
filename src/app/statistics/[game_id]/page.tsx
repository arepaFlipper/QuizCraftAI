import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";
import ResultsCard from "@/components/statistics/ResultsCard";
import AccuracyCard from "@/components/statistics/AccuracyCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import { prisma } from "@/lib/db";
import QuestionList from "@/components/statistics/QuestionList";

type TStatistics = {
  params: {
    game_id: string;
  }
};

const StatisticsPage = async ({ params }: TStatistics) => {
  const { game_id } = params;
  const session = await getAuthSession();
  const game = await prisma.game.findUnique({ where: { id: game_id }, include: { questions: true } });
  if (!session?.user || !game) {
    return redirect("/quiz");
  }

  let accuracy: number = 0;
  if (game?.gameType === "mcq") {
    let total_correct = game.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = (total_correct / game.questions.length) * 100;
  } else if (game?.gameType === "open_ended") {
    let total_percentage = game.questions.reduce((acc, question) => {
      return acc + (question.percentageCorrect || 0);
    }, 0);

    accuracy = (total_percentage / game.questions.length);
  }

  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
          <div className="flex items-center space-x-2">
            <Link href={`/dashboard`} className={buttonVariants()} >
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard time_started={game?.timeStarted} time_ended={new Date()} />
        </div>

        <QuestionList questions={game?.questions} />
      </div>
    </>
  )
}

export default StatisticsPage
