"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

type TLoading = {
  finished: boolean;
}

const LOADING_TEXTS = [
  "Generating questions...",
  "Unleashing the power of curiosity...",
  "Diving deep into the depths of knowledge...",
  "Diving deep into the ocean of questions...",
  "Harnessing the power of inquiry...",
  "Harnessing the collective knowledge of the cosmos...",
  "Igniting the flame of wonder and exploration...",
]

const LoadingQuestions = ({ finished }: TLoading) => {
  const [progress, setProgress] = useState<number>(0);
  const [loading_text, setLoading_text] = useState<string>(LOADING_TEXTS[0]);
  useEffect(() => {
    const random_idx = Math.floor(Math.random() * LOADING_TEXTS.length);
    setLoading_text(LOADING_TEXTS[random_idx]);
  }, [progress])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) {
          clearInterval(interval);
          return 100;
        }
        if (prev === 100) {
          return 0;
        } else if (Math.random() < 0.3) {
          return prev + 1;
        }
        return prev + 2;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [finished])
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
      <Image src={`/loading.gif`} alt="loading animation" width={600} height={600} />
      <Progress value={progress} className="w-full mt-4" />
      <h1 className="mt-2 text-xl">{loading_text}</h1>
    </div>
  )
}

export default LoadingQuestions
