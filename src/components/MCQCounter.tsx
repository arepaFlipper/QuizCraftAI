import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type TCounter = {
  correct_answers: number;
  wrong_answers: number;
}

const MCQCounter = ({ correct_answers, wrong_answers }: TCounter) => {
  return (
    <Card className="flex flex-row items-center justify-center p-2">
      <div className="mr-1 flex-row flex">
        <span className="mx-1 text-2xl text-[green]">{correct_answers}</span>
        <CheckCircle2 color="green" size={30} />
      </div>
      <Separator orientation="vertical" />
      <div className="ml-1 flex-row flex">
        <span className="mx-1 text-2xl text-[red]">{wrong_answers}</span>
        <XCircle color="red" size={30} />
      </div>
    </Card>
  )
}

export default MCQCounter
