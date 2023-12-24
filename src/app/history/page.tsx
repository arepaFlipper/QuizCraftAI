import HistoryCard from "@/components/HistoryCard";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { Link, LucideLayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {}

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">History</CardTitle>
            <Link href="/dashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </CardHeader>

        <CardContent className="max-h-[60vh] overflow-scroll">
          <HistoryCard limit={100} userId={session?.user?.id} />
        </CardContent>
      </Card>
    </div>
  )
}

export default page
