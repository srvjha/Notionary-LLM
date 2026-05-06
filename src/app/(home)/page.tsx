"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import SupportedInputs from "@/modules/notebook/components/supportedInput";
import { features, inputTypes } from "./helper";
import {
  createChatSession,
  getLastActiveChatSession,
} from "@/modules/notebook/actions/chat";
import { redirect } from "next/navigation";
import { Loader } from "@/components/ai-elements/loader";

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
          redirect("/sign-in");
        }
      }
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Hero */}
      <section className="relative px-6 pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        {/* Soft gradient backdrop */}
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(251,191,36,0.08),transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-stone-300 font-medium">
                Now in beta
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02] text-stone-100">
              Your sources.
              <br />
              <span className="text-stone-500">Your second brain.</span>
            </h1>

            <p className="mt-7 text-lg md:text-xl text-stone-400 max-w-2xl leading-relaxed">
              Notionary turns your PDFs, articles, videos, and notes into a
              conversational research companion. Ask anything — get answers
              grounded in what you actually have.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-10">
              <Button
                onClick={handleNoteBook}
                disabled={loading}
                className="h-12 px-6 text-[15px] font-medium bg-stone-100 text-stone-950 hover:bg-amber-300 transition-colors cursor-pointer rounded-md group disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader tone="default" size={5} className="mr-2.5" />
                    Opening notebook…
                  </>
                ) : (
                  <>
                    Open your notebook
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </Button>

              <Link
                href="https://youtu.be/3QpY7EyjPXw"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="ghost"
                  className="h-12 px-5 text-[15px] text-stone-300 hover:text-stone-100 hover:bg-stone-900 cursor-pointer rounded-md"
                >
                  <Play className="w-4 h-4 mr-2 text-amber-400" />
                  Watch demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="mt-20 relative fade-up" style={{ animationDelay: "120ms" }}>
            <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-1 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="rounded-lg bg-stone-950 border border-stone-900 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-900">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-800" />
                  </div>
                  <div className="flex-1 text-center text-[11px] text-stone-600 tracking-wider">
                    notionary.app/notebook
                  </div>
                </div>
                <div className="grid grid-cols-12 min-h-[280px]">
                  <div className="col-span-4 border-r border-stone-900 p-4 space-y-2">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-stone-600 font-medium mb-2">
                      Sources · 3
                    </div>
                    {[
                      { t: "research-paper.pdf", indexed: true },
                      { t: "vercel.com/blog/ai-sdk", indexed: true },
                      { t: "Lecture 04 — Transformers", indexed: false },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-2 py-1.5 rounded text-[12px] text-stone-300"
                      >
                        <div className="w-5 h-5 rounded bg-stone-900 border border-stone-800 flex-shrink-0" />
                        <span className="truncate">{s.t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-8 p-5 space-y-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-stone-600 font-medium mb-1.5">
                        You
                      </div>
                      <p className="text-[13px] text-stone-200">
                        What are the three core ideas across these sources?
                      </p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-amber-400/70 font-medium mb-1.5">
                        Notionary
                      </div>
                      <p className="text-[13px] text-stone-300 leading-relaxed">
                        All three converge on attention as a routing primitive,
                        but differ on…
                      </p>
                      <div className="mt-3">
                        <Loader tone="muted" size={5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 bg-stone-950">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-amber-400/80 font-medium mb-3">
              Why it works
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-stone-100 tracking-tight leading-tight">
              Built for research, not chitchat.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-stone-900/60 rounded-xl overflow-hidden border border-stone-900">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-stone-950 p-8 hover:bg-stone-900/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 group-hover:text-amber-400 group-hover:border-amber-400/30 transition-colors mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-[17px] font-medium text-stone-100 tracking-tight mb-2">
                  {feature.title}
                </h3>
                <p className="text-stone-400 text-[14px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported inputs */}
      <SupportedInputs inputTypes={inputTypes} />

      {/* CTA */}
      <section className="px-6 py-24 bg-stone-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-medium text-stone-100 tracking-[-0.02em] leading-tight">
            Stop searching.
            <br />
            <span className="text-stone-500">Start asking.</span>
          </h2>
          <p className="mt-5 text-stone-400 max-w-xl mx-auto">
            Open a notebook. Drop in your sources. Ask better questions of the
            things you already have.
          </p>
          <Button
            onClick={handleNoteBook}
            disabled={loading}
            className="mt-10 h-12 px-6 text-[15px] font-medium bg-amber-400 hover:bg-amber-300 text-stone-950 transition-colors cursor-pointer rounded-md group"
          >
            {loading ? (
              <>
                <Loader tone="default" size={5} className="mr-2.5" />
                Opening…
              </>
            ) : (
              <>
                Get started — it&apos;s free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Page;
