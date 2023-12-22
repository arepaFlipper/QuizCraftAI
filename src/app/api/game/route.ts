import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { ZodError } from "zod";
import axios from "axios";
import { prisma } from "@/lib/db";

export const POST = async (request: Request, res: Response) => {
  try {
    const session = await getAuthSession();
    let userId: string = "";
    if (!session?.user && process.env.MODE === "production") {
      userId = "🖕🤬🖕 Do not spam this endpoint 🖕🤬🖕";
      return NextResponse.json({ error: userId }, { status: 401 });
    } else if (!session?.user && process.env.MODE === "development") {
      userId = process.env.USER_ID_TESTER as string;
    }

    const body = await request.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);
    let response;
    const data = { gameType: type, timeStarted: new Date(), userId, topic }
    const game = await prisma.game.create({ data });
    const { data: response_data } = await axios.post(`${process.env.HOST_URL}/api/questions`, { amount, topic, type });
    if (type === "mcq") {
      type Tmcq = {
        question: string,
        answer: string,
        option1: string,
        option2: string,
        option3: string,
      }
      let many_data = response_data.questions.map((question: Tmcq) => {
        let options = [question.option1, question.option2, question.answer, question.option3];
        options = options.sort(() => Math.random() - 0.5);
        return { question: question.question, answer: question.answer, options: JSON.stringify(options), gameId: game.id, questionType: type };

      })
      response = await prisma.question.createMany({ data: many_data })
    } else if (type === "open_ended") {
      type Topen_ended = {
        question: string,
        answer: string,
      }

      let many_data = response_data.questions.map((ques: Topen_ended) => {
        const { question, answer } = ques;
        return {
          question, answer, gameId: game.id, questionType: type
        }
      })

      response = await prisma.question.createMany({ data: many_data });

    }
    return NextResponse.json({ gameId: game.id }, { status: 200 });

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json({ error: "😔 Something went wrong" }, { status: 500 });

  }
}
