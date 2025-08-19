"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, MessageSquare, HelpCircle, Brain } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-transparent flex flex-col items-center px-6 py-12 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-3xl text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Welcome to NoteCast
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Upload PDFs, websites, or text — then chat with them using AI.  
          Get instant answers, understand context, and explore the "why" behind
          every response.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mt-12">
        <Card className="shadow-sm border rounded-2xl dark:border-neutral-800 dark:bg-neutral-800/40">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <Upload className="w-10 h-10 text-blue-500" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Upload Documents
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Add your PDFs, text files, or even whole websites to start chatting.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border rounded-2xl dark:border-neutral-800 dark:bg-neutral-800/40">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <MessageSquare className="w-10 h-10 text-green-500" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Ask Questions
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Query your documents in natural language and get precise answers.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border rounded-2xl dark:border-neutral-800 dark:bg-neutral-800/40">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-purple-500" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Understand "Why"
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Every response comes with context, so you know exactly where the
              answer came from.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border rounded-2xl dark:border-neutral-800 dark:bg-neutral-800/40">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <Brain className="w-10 h-10 text-pink-500" />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              AI-Powered Insights
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Built with Retrieval-Augmented Generation (RAG) for smarter,
              evidence-based answers.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="mt-16">
        <Button
          asChild
          className="px-8 py-6 text-lg font-semibold rounded-2xl shadow-md"
        >
          <a href="/">🚀 Get Started</a>
        </Button>
      </div>
    </div>
  );
};

export default Page;
