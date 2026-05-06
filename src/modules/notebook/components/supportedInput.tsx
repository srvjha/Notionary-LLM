import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CheckCircle, ArrowRight, Lightbulb } from "lucide-react";

export default function SupportedInputs({
  inputTypes,
}: {
  inputTypes: Array<any>;
}) {
  return (
    <section className="px-6 py-24 bg-stone-950">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-amber-400/80 font-medium mb-3">
            What it supports
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-stone-100 tracking-tight leading-tight">
            Bring your own knowledge.
            <br />
            <span className="text-stone-500">Any format. Any source.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {inputTypes.map((type, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-stone-800/80 bg-stone-900/30 px-5 hover:border-stone-700/80 transition-colors data-[state=open]:bg-stone-900/60 data-[state=open]:border-stone-700"
            >
              <AccordionTrigger className="py-5 hover:no-underline group">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-10 h-10 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400/30 transition-colors">
                    {React.cloneElement(type.icon, {
                      className: "w-4 h-4 text-stone-300",
                    })}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-stone-100 font-medium text-[15px] tracking-tight">
                      {type.title}
                    </div>
                    <p className="text-stone-500 text-sm mt-0.5">
                      {type.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-7 pt-1">
                <div className="grid md:grid-cols-3 gap-8 mt-3 pt-6 border-t border-stone-800/60">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.18em] text-amber-400/80 font-medium mb-3 flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3" />
                      Capabilities
                    </h4>
                    <ul className="space-y-2.5">
                      {type.details.map((detail: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-stone-400 text-[13px] leading-relaxed flex items-start gap-2.5"
                        >
                          <div className="w-1 h-1 rounded-full bg-stone-600 mt-1.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.18em] text-amber-400/80 font-medium mb-3 flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3" />
                      How to use
                    </h4>
                    <ol className="space-y-2.5">
                      {type.steps.map((step: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-stone-400 text-[13px] leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="flex-shrink-0 w-4 h-4 rounded-sm bg-stone-800 text-stone-300 text-[10px] font-medium flex items-center justify-center mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.18em] text-amber-400/80 font-medium mb-3 flex items-center gap-1.5">
                      <Lightbulb className="w-3 h-3" />
                      Pro tips
                    </h4>
                    <ul className="space-y-2.5">
                      {type.tips.map((tip: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-stone-400 text-[13px] leading-relaxed flex items-start gap-2.5"
                        >
                          <div className="w-1 h-1 rounded-full bg-amber-400/60 mt-1.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
