"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {}

const HistoryCard = ({ }: Props) => {
  const router = useRouter();

  const handle_onClick = (_: React.MouseEvent<HTMLDivElement>) => {
    router.push("/history");
  };

  return (
    <Card className="homver:cursor-pointer hover:opacity-75" onClick={handle_onClick}>
      <CardHeader className="flex flex-row items-cnter justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">History</CardTitle>
        <History size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">View past quiz attempts</p>
      </CardContent>
    </Card>
  )
}

export default HistoryCard
