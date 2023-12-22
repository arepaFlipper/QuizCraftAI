import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import QuizCreation from "@/components/quiz/QuizCreation";

type TQuiz = {}

const Quiz = async ({ }: TQuiz) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <QuizCreation />
  )
}

export default Quiz
