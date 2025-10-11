"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Brain, ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import SupportedInputs from "@/modules/notebook/components/supportedInput";
import { features, inputTypes } from "./helper";

const Page = () => {
  return (
    <div className="min-h-screen  text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative px-6 py-10">
          <div className="max-w-4xl  mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/20 border border-blue-600/20">
              <Brain className="w-4 h-4 text-neutral-100" />
              <span className="text-sm font-medium text-neutral-100">
                AI-Powered Document Intelligence
              </span>
            </div>
            <h1 className="text-4xl h-22 sm:text-6xl md:text-7xl font-semibold tracking-tight mt-5 bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 bg-clip-text text-transparent">
              Knowledge Companion
            </h1>

            <p className="text-lg text-neutral-400 max-w-5xl px-1 mx-auto leading-relaxed -mt-2">
              Create your own personalized notebook by adding context through
              sources, and chat with them naturally with a personalized touch
              powered by Notionary LLM.{" "}
            </p>
            <div className="flex justify-center items-center gap-2 mt-10">
              <Link href="/chat">
                <Button className=" px-5 py-6 text-lg cursor-pointer hover:bg-transparent hover:border hover:border-neutral-300 hover:text-neutral-100">
                  Get Started
                  <ArrowRight />
                </Button>
              </Link>
              
              <Link href="https://youtu.be/3QpY7EyjPXw" target="__blank">
              <Button className=" px-5 py-6 text-lg bg-transparent border border-neutral-300 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer">
                Watch Demo
              </Button>
              </Link>
            </div>

           
          </div>
        </div>
      </div>

      <div className="px-6 py-10 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Notionary LLM ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-neutral-900/10 border-neutral-800 hover:bg-neutral-800/20 transition-colors"
              >
                <CardContent className="px-2 py-2 flex flex-col justify-center items-center text-center space-y-3">
                  {feature.icon}
                  <h3 className="font-semibold text-base text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-base">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <SupportedInputs inputTypes={inputTypes} />
    </div>
  );
};

export default Page;
