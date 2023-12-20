import { NextResponse } from "next/server";
import { quizCreationSchema } from "@/schemas/form/quiz"
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";

// NOTE: GET http://localhost:3000/api/questions
export const GET = async (req: Request, res: Response) => {
  return NextResponse.json({ hello: `world This is a ${req.method} request` });
}

// NOTE: POST http://localhost:3000/api/questions
export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);
    let questions: any;
    let message1 = "Your are a helpful AI that is able to generato a pair of questions and answers. "
    message1 += "The length of the answer should not exceed 15 words."
    message1 += "Store all the pairs of answers and questions in a JSON array."
    if (type === "open_ended") {
      let message2 = `Please generate a random hard open-ended questions about ${topic}`

      const output_format = { question: "question", answer: "answer with max length of 15 words" };

      questions = await strict_output(message1, message2, output_format);
    } else if (type === "mcq") {
      let message2 = `Please generate a random hard multiple choice questions about ${topic}`

      const output_format = { question: "question", answer: "answer with max length of 15 words" };
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
