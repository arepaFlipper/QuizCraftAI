"use client"

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type InputHTMLAttributes, useState } from "react";
import { CopyCheck, BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingQuestions from "@/components/LoadingQuestions";

type TQCreation = {
  topic_param: string;
}

type TInput = z.infer<typeof quizCreationSchema>;

const QuizCreation = ({ topic_param }: TQCreation) => {
  const router = useRouter();
  const [show_loader, setShow_loader] = useState(false);

  const [finished, setFinished] = useState(false);

  const mutationFn = async ({ amount, topic, type }: TInput) => {
    const response = await axios.post(`/api/game`, { amount, topic, type });
    return response.data;
  }
  const { mutate: getQuestions, isPending } = useMutation({ mutationFn });
  const form = useForm<TInput>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 3,
      topic: topic_param,
      type: "open_ended",
    }
  });

  const on_submit = ({ amount, topic, type }: TInput) => {
    setShow_loader(true);
    const onSuccess = ({ gameId }: { gameId: string }) => {
      setFinished(true);
      setTimeout(() => {
        if (form.getValues("type") === "open_ended") {
          router.push(`/play/open_ended/${gameId}`);
        } else if (form.getValues("type") === "mcq") {
          router.push(`/play/mcq/${gameId}`);
        };
      }, 1000);
    }

    const onError = () => {
      setShow_loader(false)
    }

    getQuestions(
      { amount, topic, type },
      { onSuccess, onError }
    );
  }

  const topic_render = ({ field }: { field: InputHTMLAttributes<HTMLInputElement> }) => {
    const { name } = field;
    let capitalize_name = name
    if (name) {
      capitalize_name = name?.charAt(0)?.toUpperCase() + name?.slice(1);
    }
    return (
      <FormItem>
        <FormLabel>{capitalize_name}</FormLabel>
        <FormControl>
          <Input placeholder={`Enter the ${capitalize_name}`} {...field} />
        </FormControl>
        <FormDescription>Please provide a topic </FormDescription>
        <FormMessage />
      </FormItem>
    )
  }

  const amount_render = ({ field }: { field: InputHTMLAttributes<HTMLInputElement> }) => {
    const { name } = field;
    let capitalize_name = name
    if (name) {
      capitalize_name = name?.charAt(0)?.toUpperCase() + name?.slice(1);
    }

    return (
      <FormItem>
        <FormLabel>{capitalize_name} Of Questions</FormLabel>
        <FormControl>
          <Input placeholder="How many questions?" type="number" {...field} onChange={(e) => { form.setValue("amount", parseInt(e.target.value)); }} min={1} max={10} />
        </FormControl>
        <FormDescription>Please provide a topic </FormDescription>
        <FormMessage />
      </FormItem>
    )
  }

  form.watch();

  if (show_loader) {
    return <LoadingQuestions finished={finished} />
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2x">Quiz Creation</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(on_submit)} className="space-y-8">
              <FormField control={form.control} name="topic" render={topic_render} />
              <FormField control={form.control} name="amount" render={amount_render} />
              <div className="flex justify-between">
                <Button className="w-1/2 rounded-none rounded-l-lg" onClick={() => form.setValue("type", "mcq")} variant={form.getValues("type") === "mcq" ? "default" : "secondary"} type="button">
                  <CopyCheck className="w-4 h-4 mr-2" /> Multiple Choice
                </Button>
                <Separator orientation="vertical" />
                <Button className="w-1/2 rounded-none rounded-r-lg" onClick={() => form.setValue("type", "open_ended")} variant={form.getValues("type") === "open_ended" ? "default" : "secondary"} type="button">
                  <BookOpen className="w-4 h-4 mr-2" /> Open Ended
                </Button>
              </div>
              <Button disabled={isPending} type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div >
  )
}

export default QuizCreation
