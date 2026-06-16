import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import LocalSearch from "@/components/search/LocalSearch";
import AuthForm from "@/components/forms/AuthForm";

const questions = [
  {
    _id: 1,
    title: "What is the difference between React and Angular?",
    description:
      "React and Angular are both popular front-end JavaScript frameworks, but they have different approaches to building web applications. React is a library that focuses on building user interfaces, while Angular is a full-fledged framework that provides a complete solution for building web applications.",
    tags: [
      { id: 1, name: "React" },
      { id: 2, name: "Angular" },
      { id: 3, name: "JavaScript" },
    ],
    upvotes: 10,
    downvotes: 2,
    answers: 5,
    views: 100,
    createdAt: "2023-06-01T12:00:00Z",
    updatedAt: "2023-06-02T12:00:00Z",
    userId: 1,
  },
  {
    _id: 2,
    title: "How to center a div in CSS?",
    description:
      "Centering a div in CSS can be done using various methods, such as using flexbox, grid, or absolute positioning. The most common method is to use flexbox by setting the parent container's display property to 'flex' and using 'justify-content' and 'align-items' properties to center the child div.",
    tags: [
      { id: 4, name: "CSS" },
      { id: 5, name: "HTML" },
      { id: 6, name: "Web Development" },
    ],
    upvotes: 15,
    downvotes: 3,
    answers: 8,
    views: 200,
    createdAt: "2023-06-03T12:00:00Z",
    updatedAt: "2023-06-04T12:00:00Z",
    userId: 2,
  },
  {
    _id: 3,
    title: "What is the difference between SQL and NoSQL databases?",
    description:
      "SQL databases are relational databases that use structured query language (SQL) for defining and manipulating data. NoSQL databases are non-relational databases that can store unstructured or semi-structured data, and they often provide more flexibility and scalability compared to SQL databases.",
    tags: [
      { id: 7, name: "SQL" },
      { id: 8, name: "NoSQL" },
      { id: 9, name: "Databases" },
    ],
    upvotes: 20,
    downvotes: 5,
    answers: 10,
    views: 300,
    createdAt: "2023-06-05T12:00:00Z",
    updatedAt: "2023-06-06T12:00:00Z",
    userId: 3,
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string}>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "" } = await searchParams;

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-dark100_light900">
          All Questions
        </h1>

        <Button
          className="primary-gradient min-h-11.5 px-4 py-3 text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      {/* Homefilter */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <div
            key={question._id}
            className="flex flex-col gap-2 rounded-lg border border-light-300_dark700 p-4"
          >
            <h2 className="text-lg font-semibold text-dark100_light900">
              {question.title}
            </h2>
            <p className="text-sm text-dark200_light800">
              {question.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-light-200_dark600 px-3 py-1 text-xs text-dark300_light700"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-dark200_light800">
              <span>{question.upvotes} Upvotes</span>
              <span>{question.downvotes} Downvotes</span>
              <span>{question.answers} Answers</span>
              <span>{question.views} Views</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
