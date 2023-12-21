"use client"

import { Game, Question } from "@prisma/client";
import { Timer } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type TMCQ = {
  game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
}

const MCQ = ({ game }: TMCQ) => {

  const [question_idx, setQuestion_idx] = useState(0);

  const [selected_choice, setSelected_choice] = useState<number>(0);

  const current_question = useMemo(() => {
    return game.questions[question_idx];
  }, [question_idx, game.questions]);

  const options = useMemo(() => {
    if (!current_question || !current_question.options) return [];

    return JSON.parse(current_question.options as string) as string[];

  }, [current_question]);

  const button_variant = (idx: number) => {
    return (selected_choice === idx) ? "default" : "outline";
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
      <div className="flex flex-row justify-between">
        <p>
          <span className="mr-2 text-slate-400">Topic</span>
          <span className="px-2 py-1 text-white rounded-lg bg-slate-800">{game.topic}</span>
        </p>
        <div className="flex self-start mt-3 text-slate-400">
          <Timer className="mr-2" />
          <span>00:00</span>
        </div>

        {/* <MCQCounter /> */}
      </div>

      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{question_idx + 1}</div>
            <div className="text-base text-slate-400">{game.questions.length}</div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg"> {current_question?.question} </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, idx) => {
          return (
            <Button key={idx} className="justify-start w-full py-8 mb-4" variant={button_variant(idx)} onClick={() => setSelected_choice(idx)}>
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">{idx + 1}</div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button className="mt-2">
          Next <ChevronRight className="w-4 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default MCQ
