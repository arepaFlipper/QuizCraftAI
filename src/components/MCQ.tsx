"use client"

import { Game, Question } from "@prisma/client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Timer } from "lucide-react";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import MCQCounter from "@/components/MCQCounter";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

type TMCQ = {
  game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
};

const MCQ = ({ game }: TMCQ) => {
  const [question_idx, setQuestion_idx] = useState(0);
  const [selected_choice, setSelected_choice] = useState<number>(0);
  const [correct_answers, setCorrect_answers] = useState<number>(0);
  const [wrong_answers, setWrong_answers] = useState<number>(0);

  const current_question = useMemo(() => (game.questions[question_idx]), [question_idx, game.questions]);

  const options = useMemo(() => {
    if (!current_question || !current_question?.options) return [];
    return JSON.parse(current_question.options as string) as string[];
  }, [current_question]);

  const { toast } = useToast();

  const mutationFn = async (question_index: number) => {
    const payload: z.infer<typeof checkAnswerSchema> = { question_id: current_question.id, user_answer: options[selected_choice], };
    const response = await axios.post(`/api/check_answer`, payload);
    return response.data; // NOTE: This goes to onSuccess function w/ is_correct var

  }
  const { mutate: checkAnswer, isPending } = useMutation({ mutationFn });



  const onSuccess = ({ is_correct }: { is_correct: boolean }) => {
    if (is_correct) {
      toast({ title: "✅ Corrent", description: "You got it right! 🎉", variant: "success" });
      setCorrect_answers((previous) => previous + 1);
    } else {
      toast({ title: "Incorrect 🙅", description: "You got it wrong! 😔", variant: "wrong" });
      setWrong_answers((previous) => previous + 1);
    };
    setQuestion_idx((ques_idx) => ques_idx + 1);
  }

  const handle_next = useCallback(() => {
    if (isPending) return;
    checkAnswer(question_idx, { onSuccess });
  }, [checkAnswer, toast, question_idx, game.questions.length]);

  useEffect(() => {
    const handle_keydown = ({ key }: KeyboardEvent) => {
      if (key === "1") {
        setSelected_choice(0);
      } else if (key === "2") {
        setSelected_choice(1);
      } else if (key === "3") {
        setSelected_choice(2);
      } else if (key === "4") {
        setSelected_choice(3);
      } else if (key === "Enter") {
        handle_next();
      }
    }

    const handle_arrows = ({ key }: KeyboardEvent) => {

    }

    document.addEventListener("keydown", handle_keydown);
    return () => document.removeEventListener("keydown", handle_keydown);
  }, [handle_next]);

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
          </div>
        </div>
        <MCQCounter correct_answers={3} wrong_answers={4} />
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
        {options.map((option, idx) => {
          const variant_button = selected_choice === idx ? "default" : "outline";
          return (
            <Button key={option} variant={variant_button} className="justify-start w-full py-8 mb-4" onClick={() => setSelected_choice(idx)} >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md"> {idx + 1} </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button variant="default" className="mt-2" size="lg" disabled={isPending} onClick={() => handle_next()} >
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
