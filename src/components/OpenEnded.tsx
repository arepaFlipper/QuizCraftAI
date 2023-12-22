import { Game, Question } from "@prisma/client";
type TOpenEnded = {
  game: Game & { question: Pick<Question, "id" | "question" | "answer"> }
}

const OpenEnded = ({ game }: TOpenEnded) => {
  return (
    <pre>{JSON.stringify(game, null, 4)}</pre>
  )
}

export default OpenEnded
