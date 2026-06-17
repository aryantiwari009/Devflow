"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

// Adding a blank line between import groups
import { AskQuestionSchema } from "@/lib/validations";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
// eslint-disable-next-line import/order
import { Button } from "../ui/button";

const Editor = dynamic(() => import('../editor'), {
  // Make sure we turn SSR off
  ssr: false
})

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      body: "",
      tags: [],
    },
  });

  const handleCreateQuestion = () => {};

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          key="title"
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          key="body"
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed Explanation of your question
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  editorRef={editorRef}
                  value={field.value ?? ""}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500">
                Include all the information someone would need to answer your
                question.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          key="tags"
          control={form.control}
          name={"tags"}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="paragraph-semibold text-dark400_light800 gap-3">
                Tags
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                    placeholder="Add Tags"
                    {...field}
                  />
                  Tags
                </div>
              </FormControl>
              <FormDescription className="body-regular text-light-500">
                Add upto 3 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-1 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit text-light-900"
          >
            Ask Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
