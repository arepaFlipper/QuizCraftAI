import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

type Props = {}

export const metadata = {
  title: "Dashboard | Quiz Craft AI"
}

const Dashboard = async ({ }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        {/* <QuizMeCard /> */}
        {/* <HistoryCard /> */}
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7"> </div>
    </main>
  )
}

export default Dashboard
