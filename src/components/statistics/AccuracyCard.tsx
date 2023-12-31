import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

type TAccuracyCard = {
  accuracy: number;
}

const AccuracyCard = ({ accuracy }: TAccuracyCard) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Average Accuracy</CardTitle>
        <Target />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">
          {(Math.round(accuracy * 100) / 100).toString()}%
        </div>
      </CardContent>
    </Card>
  )
}

export default AccuracyCard
