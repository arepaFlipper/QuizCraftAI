"use client"

import { Question } from "@prisma/client";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils"

type Props = {
  questions: Question[];
}

const QuestionList = ({ questions }: Props) => {
  let gameType = questions[0].questionType;
  return (
    <Table>
      <TableCaption> End of list. </TableCaption>
      <TableHeader>
        <TableRow>
          {["No.", "Question & Correct Answer", "Your Answer", "Accuracy"].map((item, index) => {
            if (gameType === "mcq") return;
            return (
              <TableHead key={index} className="w-[10px]">{item}</TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map((question, idx) => {
            return (
              <TableRow key={question.id}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell >{question.question} <br /> <br />
                  <span className="font-semibold">{question.answer}</span>
                </TableCell>
                {(gameType === "mcq") && (<TableCell className={cn({ "text-green-600": question.isCorrect, "text-red-600": !question.isCorrect })}>{question.userAnswer}</TableCell>)}
                {(gameType === "open_ended") && (<TableCell>{question.userAnswer}</TableCell>)}
                {(gameType === "open_ended") && (<TableCell className="text-right">{question.percentageCorrect}</TableCell>)}
              </TableRow>
            )
          })}
        </>
      </TableBody>
    </Table >
  )
}

export default QuestionList
