"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, ArrowRight, Play, Loader2 } from "lucide-react";
import Link from "next/link";
import SupportedInputs from "@/modules/notebook/components/supportedInput";
import { features, inputTypes } from "./helper";
import {
  createChatSession,
  getLastActiveChatSession,
} from "@/modules/notebook/actions/chat";
import { redirect } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const handleNoteBook = async () => {
    setLoading(true);
    try {
      const userLastActiveSession = await getLastActiveChatSession();
      if (userLastActiveSession) {
        const sessionId = userLastActiveSession.id;
        redirect(`/notebook/${sessionId}`);
      } else {
        const newSession = await createChatSession();
        if (newSession) {
          redirect(`/notebook/${newSession.id}`);
        } else {
          setLoading(false);
        }
      }
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-300 selection:bg-blue-900 selection:text-blue-100">
      <div className="relative overflow-hidden">
        {/* Subtle glowing orbs for background ambiance */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[100px] mix-blend-screen"></div>
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-sky-900/10 blur-[120px] mix-blend-screen"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[30%] rounded-full bg-blue-800/10 blur-[120px] mix-blend-screen"></div>
        </div>

        <div className="relative px-6 pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col items-center justify-center min-h-[70vh]">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/30">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-200 tracking-wide uppercase">
                AI-Powered Intelligence
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-50 via-blue-300 to-blue-800 pb-2">
              Knowledge Companion
            </h1>

            <p className="text-lg md:text-xl text-blue-100/60 max-w-2xl mx-auto leading-relaxed">
              Create your own personalized notebook by adding context through
              sources, and chat with them naturally with a personalized touch
              powered by Notionary LLM.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-10">
              <Button
                className="w-full sm:w-auto px-8 py-6 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed group rounded-full border-none"
                onClick={handleNoteBook}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                    Starting...
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              <Link href="https://youtu.be/3QpY7EyjPXw" target="__blank" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-8 py-6 text-lg bg-black/40 backdrop-blur-sm text-blue-300 hover:bg-blue-900/20 hover:text-blue-100 shadow-[0_0_20px_rgba(37,99,235,0.1)] hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] border-none cursor-pointer transition-all rounded-full group">
                  <Play className="w-4 h-4 mr-2 text-blue-400 group-hover:text-blue-300" />
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-24 relative bg-black shadow-[0_-15px_40px_rgba(30,58,138,0.08)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-800/50 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-400">
            Why Choose Notionary LLM?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-blue-950/20 border-none transition-all duration-300 shadow-[0_4px_30px_rgba(30,58,138,0.08)] hover:shadow-[0_4px_40px_rgba(30,58,138,0.2)] group backdrop-blur-sm overflow-hidden relative rounded-2xl"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-8 flex flex-col items-center text-center space-y-5">
                  <div className="p-4 rounded-xl bg-blue-900/20 shadow-[0_0_15px_rgba(37,99,235,0.1)] group-hover:scale-110 group-hover:bg-blue-800/30 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-xl text-blue-100 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-blue-200/50 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black relative shadow-[0_-15px_40px_rgba(30,58,138,0.08)] pb-24">
         <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-800/30 to-transparent"></div>
        <SupportedInputs inputTypes={inputTypes} />
      </div>
    </div>
  );
};

export default Page;
