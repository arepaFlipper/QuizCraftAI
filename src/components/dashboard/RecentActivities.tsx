import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import HistoryComponent from "@/components/HistoryComponent";
import { redirect } from "next/navigation";

type Props = {}

const RecentActivities = async ({ }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
        <CardDescription>You have played a total of 7 games</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll">
        <HistoryComponent limit={10} userId={session.user.id} />
      </CardContent>
    </Card>
  )
}

export default RecentActivities
