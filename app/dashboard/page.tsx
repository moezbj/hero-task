"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROJECT } from "@/requests/project/createProject";
import { LIST_PROJECTS } from "@/requests/project/listProject";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectType } from "@/requests/types";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  delivered: z.boolean().default(false),
  owner: z.number(),
});

const Page = () => {
  const [open, setOpen] = useState(false);
  const { data, loading, error, refetch } = useQuery<{
    listProjects: ProjectType[];
  }>(LIST_PROJECTS);
  const [call, state] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      console.log("here");
      refetch();
      setOpen(false);
    },
  });

  console.log("data", data);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      delivered: false,
      owner: 1,
    },
  });

  const onSubmit = (variables: any) => {
    console.log("variables", variables);
    call({
      variables: {
        title: variables.title,
        description: variables.description,
        delivered: variables.delivered,
        owner: variables.owner,
      },
    });
  };
  return (
    <div>
      <div className="flex justify-between px-8">
        <p className="text-grey-200 font-bold text-2xl">All projects</p>
        <Dialog open={open}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setOpen(true)}>
              Create project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-grey-200">
                Create project
              </DialogTitle>
              <DialogDescription className="text-grey-200">
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-grey-200">
                  title
                </Label>
                <Input
                  label="title"
                  {...form.register("title")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right text-grey-200">
                  description
                </Label>
                <Input
                  label="description"
                  {...form.register("description")}
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="text-grey-200">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-2 container grid grid-cols-12">
        {data?.listProjects?.map((project: ProjectType) => (
          <Card key={project.title} className="col-span-4">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
