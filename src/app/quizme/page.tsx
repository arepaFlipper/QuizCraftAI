import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import QuizCreation from "@/components/quiz/QuizCreation";

type TQuiz = {
  searchParams: {
    topic?: string;
  }
}

const Quiz = async ({ searchParams }: TQuiz) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <QuizCreation topic_param={searchParams?.topic ?? ""} />
  )
}

export default Quiz
