import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CheckCircle, ArrowRight, Lightbulb } from "lucide-react";

export default function SupportedInputs({ inputTypes }: { inputTypes: Array<any> }) {
  return (
    <div className="px-6 py-16 bg-black relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-400">Supported Content Types</h2>
          <p className="text-blue-200/60 text-lg max-w-2xl mx-auto">
            Notionary LLM works with multiple content formats to give you maximum flexibility
          </p>
        </div>

        <Accordion type="single" collapsible className="grid gap-6">
          {inputTypes.map((type, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl border-none shadow-[0_4px_25px_rgba(30,58,138,0.08)] bg-blue-950/10 backdrop-blur-sm px-6 overflow-hidden transition-all duration-300 hover:shadow-[0_4px_35px_rgba(30,58,138,0.2)] hover:bg-blue-900/20 group"
            >
              <AccordionTrigger className="py-6 hover:no-underline">
                <div className="flex items-center gap-6 w-full">
                  <div className="p-3 rounded-xl bg-blue-900/20 shadow-inner group-hover:bg-blue-800/40 group-hover:shadow-[0_0_15px_rgba(30,58,138,0.3)] transition-all duration-300">
                     {type.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-blue-100 font-semibold text-lg">{type.title}</div>
                    <p className="text-blue-200/50 text-sm mt-1.5">{type.description}</p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-8 pt-2">
                <div className="grid md:grid-cols-3 gap-8 mt-4 pt-6 shadow-[inset_0_1px_0_rgba(30,58,138,0.2)]">
                  {/* Capabilities */}
                  <div>
                    <h4 className="font-semibold text-blue-100 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                      Capabilities
                    </h4>
                    <ul className="space-y-3">
                      {type.details.map((detail: string, idx: number) => (
                        <li key={idx} className="text-blue-200/60 text-sm flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to Use */}
                  <div>
                    <h4 className="font-semibold text-blue-100 mb-4 flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-blue-400" />
                      How to Use
                    </h4>
                    <ol className="space-y-3">
                      {type.steps.map((step: string, idx: number) => (
                        <li key={idx} className="text-blue-200/60 text-sm flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 text-blue-300 shadow-[0_0_10px_rgba(30,58,138,0.3)] border-none text-xs font-semibold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tips */}
                  <div>
                    <h4 className="font-semibold text-blue-100 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-blue-400" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-3">
                      {type.tips.map((tip: string, idx: number) => (
                        <li key={idx} className="text-blue-200/60 text-sm flex items-start gap-3">
                          <span className="w-2 h-2 mt-1.5 rounded-full bg-blue-400/50 flex-shrink-0" />
                          <span className="leading-relaxed">{tip}</span>
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
    </div>
  );
}
