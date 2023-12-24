"use client"

import D3WordCloud from 'react-d3-cloud';
import { useTheme } from "next-themes";
import { useRouter } from 'next/navigation';

type Props = {}

const HOT_TOPICS = [
  "Arrays & Hasing",
  "Two Pointers",
  "Stack",
  "Binary Search",
  "Sliding Window",
  "Linked List",
  "Trees",
  "Tries",
  "Backtracking",
  "Heap/Priority Queue",
  "Intervals",
  "Advanced Graphs",
  "Greedy Algorithms",
  "Graphs Theory",
  "1-D Dynamic Programming",
  "2-D Dynamic Programming",
  "Bit Manipulation",
  "Math & Geometry",
  "Rust",
  "Django",
  "Linux",
  "Design patterns",
  "Data Structures",
  "AI"
].map((word) => ({ text: word, value: Math.floor(Math.random() * 10) })).sort(() => Math.random() - 0.5);


const fontSizeMapper = (word: { value: number }) => {
  let res = Math.log2(word.value) * 5;
  res = res + 16;
  return res;
}
const CustomWorldCloud = ({ }: Props) => {
  const { theme } = useTheme();
  const router = useRouter();

  const on_word_click = (_: any, { text }: { text: string }) => {
    router.push(`/quiz?topic=${text}`);
  }
  return (
    <>
      <D3WordCloud data={HOT_TOPICS} onWordClick={on_word_click} height={550} font="Times" fontSize={fontSizeMapper} rotate={0} padding={10} fill={(theme === "dark") ? "white" : "black"} />
    </>
  )
}

export default CustomWorldCloud;
