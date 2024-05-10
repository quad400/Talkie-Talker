"use client";

import { z } from "zod";
import { PlusCircle, SendHorizonal, Smile } from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import queryString from "query-string";
import axios from "axios";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

interface ChatFooterProps {
  apiUrl: string;
  query: Record<string, any>;
  type: "channel" | "chat";
}

const formSchema = z.object({
  text: z.string(),
});

const ChatFooter = ({ apiUrl, query, type }: ChatFooterProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const isLoading = form.formState.isSubmitting && form.getValues("text").length === 0;
  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = queryString.stringifyUrl({
        url: apiUrl,
        query: query,
      });

      await axios.post(url, values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full justify-between items-center mx-4"
        >
          <div className="rounded-lg flex-1 w-full flex justify-between items-end bg-zinc-900 py-2  mb-2 px-3">
            <Button size="icon" variant="ghost">
              <PlusCircle className="h-7 w-7 text-zinc-200" />
            </Button>
            <div className="flex-1 mx-2">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        className="bg-transparent border-0 focus-visible:ring-0
py-0 max-h-[150px] items-center
                                text-white text-sm font-normal focus-visible:ring-offset-0"
                        placeholder="Message here..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button size="icon" variant="ghost">
              <Smile className="h-7 w-7 text-zinc-200" />
            </Button>
          </div>
          <Button
            disabled={isLoading}
            className={cn(
              "rounded-full justify-center items-center h-12 w-12 ml-2"
            )}
            variant="primary"
            size="icon"
          >
            <SendHorizonal className="h-8 w-8 text-zinc-100" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatFooter;
