import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {}

const RecentActivities = ({ }: Props) => {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
        <CardDescription>You have played a total of 7 games</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overlow-scroll">
        Histories
      </CardContent>
    </Card>
  )
}

export default RecentActivities
