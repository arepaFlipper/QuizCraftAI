"use client"

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type InputHTMLAttributes } from "react";

type Props = {}

type TInput = z.infer<typeof quizCreationSchema>;

const QuizCreation = ({ }: Props) => {
  const form = useForm<TInput>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      amount: 3,
      topic: "",
      type: "open_ended",
    }
  });

  const on_submit = (input: TInput) => {
    alert(JSON.stringify(input, null, 2));
  }

  const on_render = ({ field }: { field: InputHTMLAttributes<HTMLInputElement> }) => {
    return (
      <FormItem>
        <FormLabel>Topic</FormLabel>
        <FormControl>
          <Input placeholder="shadcn" {...field} />
        </FormControl>
        <FormDescription>This is your public display name. </FormDescription>
        <FormMessage />
      </FormItem>
    )
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
              <FormField control={form.control} name="topic" render={on_render} />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div >
  )
}

export default QuizCreation
