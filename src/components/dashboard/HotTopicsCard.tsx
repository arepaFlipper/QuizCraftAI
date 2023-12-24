import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CustomWorldCloud from "@/components/CustomWorldCloud";
import { prisma } from "@/lib/db";

type Props = {}

const HotTopicsCard = async (props: Props) => {
  const topics = await prisma.topicCount.findMany({});

  const formatted_topics = topics.map((topic) => {
    return {
      text: topic.topic,
      value: topic.count,
    }
  })
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it!
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-2">

        <CustomWorldCloud formatted_topics={formatted_topics} />

      </CardContent>
    </Card>
  )
}

export default HotTopicsCard
