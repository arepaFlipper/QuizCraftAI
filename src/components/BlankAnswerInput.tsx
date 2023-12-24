import { Fragment, Dispatch, SetStateAction } from "react";
import keyword_extractor from "keyword-extractor";
import { useMemo } from "react";
type Props = {
  answer: string;
  setBlank_answer: Dispatch<SetStateAction<string>>;
}

const BLANKS = "_____";

const BlankAnswerInput = ({ answer, setBlank_answer }: Props) => {
  const keywords = useMemo(() => {
    const words = keyword_extractor.extract(answer, { language: "english", remove_digits: true, return_changed_case: false, remove_duplicates: false });
    const shuffled = words.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }, [answer])

  const answer_with_blanks = useMemo(() => {
    const ans_w_blanks_reduced = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, BLANKS);
    }, answer);
    setBlank_answer(ans_w_blanks_reduced)
    return ans_w_blanks_reduced;
  }, [keywords, answer, setBlank_answer]);
  return (
    <div className="flex justify-start w-full mt-4">
      <h1 className="text-xl font-semibold">
        {answer_with_blanks.split(BLANKS).map((part, idx) => {
          return (
            <Fragment key={`${answer_with_blanks}${idx}`}>
              {part}
              {idx !== answer_with_blanks.split(BLANKS).length - 1 && (

                <input id="user-blank-input" className="text-center border-b-2 border-black dark:border-white w-28 focus:border-2 focus:border-b-4 focus:outline-none " key={idx} />
              )}
            </Fragment>
          )
        })}
      </h1>
    </div>
  )
}

export default BlankAnswerInput
