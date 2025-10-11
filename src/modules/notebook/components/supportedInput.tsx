import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CheckCircle, ArrowRight, Lightbulb, Brain } from "lucide-react";


export default function SupportedInputs({ inputTypes }: { inputTypes: Array<any> }) {
  return (
    <div className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Supported Content Types</h2>
          <p className="text-gray-300">
            Notionary LLM works with multiple content formats to give you maximum flexibility
          </p>
        </div>

        <Accordion type="single" collapsible className="grid gap-4">
          {inputTypes.map((type, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border border-neutral-800 shadow-sm shadow-neutral-800 bg-neutral-900/10 px-4"
            >
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  {type.icon}
                  <div className="flex-1 text-left">
                    <div className="text-white font-semibold">{type.title}</div>
                    <p className="text-gray-400 text-sm mt-1">{type.description}</p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-5">
                <div className="grid md:grid-cols-3 gap-6 mt-2">
                  {/* Capabilities */}
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {type.details.map((detail: string, idx: number) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to Use */}
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                      How to Use
                    </h4>
                    <ol className="space-y-2">
                      {type.steps.map((step: string, idx: number) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-start gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mt-0.5">
                            {idx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tips */}
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-2">
                      {type.tips.map((tip: string, idx: number) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="w-3 h-3 mt-1 rounded-full bg-yellow-400/70 flex-shrink-0" />
                          {tip}
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
