"use client"

import D3WordCloud from 'react-d3-cloud';
import { useTheme } from "next-themes";

type Props = {}

const data = [
  { text: "Hello", value: 3 },
  { text: "Hola", value: 2 },
  { text: "Bonjour", value: 4 },
  { text: "Ciao", value: 5 },
  { text: "HI!", value: 7 },
  { text: "Halo", value: 6 },
  { text: "Wie gehts es dir?", value: 7 },
  { text: "Neovim", value: 5 },
  { text: "Ender 3", value: 8 },
  { text: "Raspberry Pi", value: 6 },
  { text: "Arduino", value: 8 },
  { text: "Frankfurt", value: 9 },
  { text: "Berlin", value: 9 },
  { text: "Sydney", value: 9 },
  { text: "Dactyl manuform", value: 6 },
  { text: "NextJS", value: 4 },
  { text: "React", value: 7 },
  { text: "TypeScript", value: 5 },
  { text: "Rust", value: 6 },
  { text: "Django", value: 8 },
  { text: "Backtrack", value: 3 },
  { text: "Manjaro", value: 7 },
  { text: "Kali", value: 2 },
  { text: "Mac OS", value: 3 },
  { text: "Ipad", value: 4 },
  { text: "Deutschland", value: 8 },
  { text: "AI", value: 10 },
];
const fontSizeMapper = (word: { value: number }) => {
  let res = Math.log2(word.value) * 5;
  res = res + 16;
  return res;
}
const CustomWorldCloud = ({ }: Props) => {
  const { theme } = useTheme();
  return (
    <>
      <D3WordCloud data={data} height={550} font="Times" fontSize={fontSizeMapper} rotate={0} padding={10} fill={(theme === "dark") ? "white" : "black"} />
    </>
  )
}

export default CustomWorldCloud;
