"use client"

import { useState, useMemo, useCallback, useEffect } from "react";
import { Game, Question } from "@prisma/client";
import { ChevronRight, Timer, Loader2, BarChart } from "lucide-react";
import { differenceInSeconds } from "date-fns";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimeDelta, cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import axios from "axios";
import BlankAnswerInput from "@/components/BlankAnswerInput";
import Link from "next/link";

type TOpenEnded = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] }
}

const OpenEnded = ({ game }: TOpenEnded) => {
  const [now, setNow] = useState<Date>(new Date());
  const [question_idx, setQuestion_idx] = useState<number>(0);
  const [has_ended, setHas_ended] = useState<boolean>(false);

  const [blank_answer, setBlank_answer] = useState<string>("");

  const current_question = useMemo(() => (game.questions[question_idx]), [question_idx, game.questions]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!has_ended) {
        setNow(new Date());
      }
    }, 1_000);
    return () => clearInterval(interval)
  }, [has_ended])

  const mutationFn = async (question_index: number) => {
    let filled_answer = blank_answer
    const payload: z.infer<typeof checkAnswerSchema> = { question_id: current_question.id, user_answer: filled_answer };
    document.querySelectorAll<HTMLInputElement>("#user-blank-input").forEach((input_el) => {
      filled_answer = filled_answer.replace("_____", input_el.value);
      input_el.value = "";
    });
    const response = await axios.post(`/api/check_answer`, payload);
    return response.data;
  }
  const { mutate: checkAnswer, isPending } = useMutation({ mutationFn });

  const onSuccess = ({ percentageSimilar }: { percentageSimilar: number }) => {
    toast({ title: `Your answer is ${percentageSimilar}% similar to the actual correct answer ✅`, description: "You got it right! 🎉", variant: "success" });
    if (question_idx === game.questions.length - 1) {
      setHas_ended(true);
      return;
    }
    setQuestion_idx((prev) => prev + 1);
  }

  const handle_next = useCallback(() => {
    if (isPending) return;

    checkAnswer(question_idx, { onSuccess });
  }, [checkAnswer, toast, isPending, question_idx, game.questions.length, blank_answer]);

  useEffect(() => {
    const handle_keydown = ({ key }: KeyboardEvent) => {
      if (key === "Enter") {
        handle_next();
      }
    }
    document.addEventListener("keydown", handle_keydown);
    return () => {
      document.removeEventListener("keydown", handle_keydown);
    }
  }, [handle_next]);

  if (has_ended) {
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          Yout completed in{" "}
          {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
        </div>
        <Link href={`/statistics/${game.id}`} className={cn(buttonVariants(), "mt-2")}>
          View Statistics
          <BarChart className="w-4 h-4 ml-2" />
        </Link>
      </div>
    )
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>
            <span className="text-slate-400">Topic</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800"> {game.topic} </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>
        {/* <MCQCounter correct_answers={correct_answers} wrong_answers={wrong_answers} /> */}
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{question_idx + 1}</div>
            <div className="text-base text-slate-400"> {game.questions.length} </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg"> {current_question?.question} </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        <BlankAnswerInput answer={current_question.answer} setBlank_answer={setBlank_answer} />
        <Button variant="default" className="mt-2" size="lg" disabled={isPending} onClick={() => handle_next()} >
          {isPending && <Loader2 className="w-4 h-4 mr-2 animated-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default OpenEnded
