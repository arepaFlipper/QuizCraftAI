import { checkAnswerSchema } from "@/schemas/form/quiz";
import { ZodError } from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { compareTwoStrings } from "string-similarity";

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { question_id, user_answer } = checkAnswerSchema.parse(body);
    const question = await prisma.question.findUnique({ where: { id: question_id } })

    if (!question) {
      return NextResponse.json({ error: "😑 Question not found" }, { status: 404 })
    }

    await prisma.question.update({ where: { id: question_id }, data: { userAnswer: user_answer } });

    if (question.questionType === "mcq") {

      const is_correct: boolean = question.answer.toLowerCase().trim() === user_answer.toLowerCase().trim();

      await prisma.question.update({ where: { id: question_id }, data: { isCorrect: is_correct } });

      return NextResponse.json({ is_correct }, { status: 200 });
    } else if (question.questionType === "open_ended") {
      let percentageSimilar = compareTwoStrings(user_answer.toLowerCase().trim(), question.answer.toLowerCase().trim());
      percentageSimilar = Math.round(percentageSimilar * 100);
      await prisma.question.update({ where: { id: question_id }, data: { percentageCorrect: percentageSimilar } });
      return NextResponse.json({ percentageSimilar }, { status: 200 });
    }

  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
  }
}
