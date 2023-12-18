import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type Props = {}

const HotTopicsCard = (props: Props) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it!
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-5">
        Word cloud
      </CardContent>
    </Card>
  )
}

export default HotTopicsCard
