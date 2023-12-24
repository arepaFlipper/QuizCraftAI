import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { differenceInSeconds } from "date-fns";
import { formatTimeDelta } from "@/lib/utils";
import { Hourglass } from "lucide-react";

type TTimeTaken = {
  time_ended: Date;
  time_started: Date;
}

const TimeTakenCard = ({ time_ended, time_started }: TTimeTaken) => {
  return (
    <Card className="md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Time Taken</CardTitle>
        <Hourglass />
        <CardContent>
          <div className="text-sm font-medium"> {formatTimeDelta(differenceInSeconds(time_ended, time_started))}</div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default TimeTakenCard
