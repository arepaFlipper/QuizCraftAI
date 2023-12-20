import { NextResponse } from "next/server";
import { quizCreationSchema } from "@/schemas/form/quiz"
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";

// NOTE: GET http://localhost:3000/api/questions
export const GET = async (req: Request, res: Response) => {
  return NextResponse.json({ hello: `world This is a ${req.method} request` });
}

// NOTE: POST http://localhost:3000/api/questions
export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();;
    if (!session?.user && process.env.production) {
      return NextResponse.json({ error: "🖕🤬🖕 Do not spam this endpoint 🖕🤬🖕" }, { status: 401 });
    }
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);
    let questions: any;
    let message1 = "Your are a helpful AI that is able to generate pairs of questions and answers. "
    message1 += "The length of each answer should not exceed 15 words."
    message1 += "Please, return all the pairs of answers and questions in a JSON array."
    const message2 = new Array(amount).fill(`Please generate a random hard open-ended questions about ${topic}`);
    let output_format: any = { question: "question", answer: "answer with max length of 15 words" };
    if (type === "open_ended") {
      questions = await strict_output(message1, message2, output_format);
    } else if (type === "mcq") {

      output_format = { ...output_format, option1: "1st option with max length of 15 words", option2: "2nd option with max length of 15 words", option3: "3rd option with max length of 15 words" };
      questions = await strict_output(message1, message2, output_format);
    }
    return NextResponse.json({ questions, status: 200 });
  } catch (error: any) {
    console.error(error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
  }
}
