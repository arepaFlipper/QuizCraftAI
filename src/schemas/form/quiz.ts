import { z } from "zod";

export const quizCreationSchema = z.object({
  topic: z.string().min(4, { message: "Topic must be at leadt 4 characters long" }),
  type: z.enum(["mcq", "open_ended"]),
  amount: z.number().min(1).max(10),
})

export const checkAnswerSchema = z.object({
  question_id: z.string(),
  user_answer: z.string(),
});
