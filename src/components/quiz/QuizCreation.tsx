import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
type Props = {}

const QuizCreation = ({ }: Props) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2x">Quiz Creation</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    </div >
  )
}

export default QuizCreation
