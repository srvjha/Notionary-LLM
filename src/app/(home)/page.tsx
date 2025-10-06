"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  HelpCircle, 
  Brain, 
  FileText, 
  Globe, 
  Copy, 
  Video,
  ArrowRight,
  Zap,
  Search,
  Play,
} from "lucide-react";
import Link from "next/link";
import SupportedInputs from "@/modules/notebook/components/supportedInput";

const Page = () => {

 

  const inputTypes = [
    {
      icon: <FileText className="w-8 h-8 text-blue-400" />,
      title: "PDF Documents",
      description: "Research papers, reports, manuals, books",
      details: [
        "Supports multi-page PDFs up to 100MB",
        "Extracts text, tables, and structured content",
        "Preserves document hierarchy and sections",
        "Works with scanned PDFs using OCR technology"
      ],
      steps: [
        "Click the 'Upload PDF' button or drag & drop your file",
        "Wait for processing (usually 10-30 seconds)",
        "See confirmation when document is ready",
        "Start asking questions about the content"
      ],
      tips: [
        "Higher quality PDFs give better results",
        "Password-protected PDFs need to be unlocked first",
        "Large documents may take longer to process"
      ]
    },
    {
      icon: <Globe className="w-8 h-8 text-green-400" />,
      title: "Website URLs",
      description: "Articles, blogs, documentation, web pages",
      details: [
        "Scrapes content from any public webpage",
        "Handles dynamic content and JavaScript",
        "Extracts main content while filtering ads/navigation",
        "Supports news articles, blogs, and documentation sites"
      ],
      steps: [
        "Paste the website URL in the input field",
        "Click 'Add Website' to start scraping",
        "System extracts and processes the content",
        "Begin chatting with the webpage content"
      ],
      tips: [
        "Use specific article URLs rather than homepage URLs",
        "Some sites may block automated access",
        "Login-required content cannot be accessed"
      ]
    },
    {
      icon: <Copy className="w-8 h-8 text-purple-400" />,
      title: "Copied Text",
      description: "Emails, notes, articles, any text content",
      details: [
        "Paste any text content directly",
        "Supports formatted text and preserves structure",
        "Ideal for emails, notes, or clipboard content",
        "No file size limits for text input"
      ],
      steps: [
        "Copy your text from any source",
        "Paste it into the text input area",
        "Add a title or description (optional)",
        "Submit to start analyzing the content"
      ],
      tips: [
        "Clean up formatting for better results",
        "Break very long texts into sections",
        "Add context about the text source"
      ]
    },
    {
      icon: <Video className="w-8 h-8 text-red-400" />,
      title: "YouTube Videos",
      description: "Educational content, tutorials, lectures",
      details: [
        "Extracts transcripts from YouTube videos",
        "Works with videos that have captions/subtitles",
        "Supports educational content and tutorials",
        "Processes both auto-generated and manual captions"
      ],
      steps: [
        "Copy the YouTube video URL",
        "Paste it in the YouTube URL field",
        "System downloads and processes transcript",
        "Chat with the video content and key points"
      ],
      tips: [
        "Videos must have available captions",
        "Longer videos may take more time to process",
        "Educational content works best"
      ]
    }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: "RAG Technology",
      description: "Retrieval-Augmented Generation ensures accurate, source-backed answers"
    },
    {
      icon: <Search className="w-8 h-8 text-green-400" />,
      title: "Smart Search",
      description: "AI understands context and finds relevant information across all your documents"
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-purple-400" />,
      title: "Source Attribution",
      description: "Every answer shows exactly where the information came from"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Instant Responses",
      description: "Get answers in seconds, not minutes of manual searching"
    }
  ];

  const chatTips = [
    {
      title: "Ask Specific Questions",
      description: "Instead of 'What is this about?', try 'What are the main conclusions about climate change impacts?'"
    },
    {
      title: "Request Comparisons",
      description: "Ask to compare information across different sources or sections"
    },
    {
      title: "Seek Explanations",
      description: "Use 'Explain why...' or 'How does...' for deeper understanding"
    },
    {
      title: "Ask for Summaries",
      description: "Request summaries of specific sections or the entire document"
    }
  ];

  return (
    <div className="min-h-screen  text-white">
 
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative px-6 py-16">
          <div className="max-w-4xl  mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-900/20 border border-cyan-500/20">
              <Brain className="w-4 h-4 text-neutral-100" />
              <span className="text-sm font-medium text-cyan-100">AI-Powered Document Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-5">
           Simplified Learning
            </h1>
            <p className="text-lg text-neutral-400 max-w-5xl mx-auto leading-relaxed">
              Transform any content into an intelligent chat experience. Upload documents, add websites, paste text, or analyze YouTube videos — have natural conversations powered by advanced AI.
            </p>
             <Link href="/chat">
            <Button 
              className=" text-base px-4 py-5 cursor-pointer"
            >
              Get Started
             <ArrowRight />
            </Button>
            </Link>

            {/* embeding a yt video autoplay */}
             <div className="max-w-5xl mx-auto mb-20 bg-transparent rounded-2xl mt-12 ">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-900 shadow-sm shadow-neutral-800">
            <div className=" ">
              <video
                className="w-full h-full object-cover"
                src="/notecast.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose NoteCast?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-neutral-800/10 border-neutral-800 hover:bg-neutral-800/20 transition-colors">
                <CardContent className="p-6 flex flex-col justify-center items-center text-center space-y-3">
                  {feature.icon}
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <SupportedInputs inputTypes={inputTypes} />

      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mastering the Chat Interface</h2>
            <p className="text-neutral-300">Learn how to ask the right questions and get the most out of your AI conversations</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Chat Tips */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-400" />
                Effective Question Strategies
              </h3>
              <div className="space-y-4">
                {chatTips.map((tip, index) => (
                  <Card key={index} className="border border-neutral-800 shadow-sm shadow-neutral-800 bg-neutral-900/10">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-white mb-2">{tip.title}</h4>
                      <p className="text-gray-400 text-sm">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Example Interactions */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Play className="w-5 h-5 text-purple-400" />
                Example Interactions
              </h3>
              <div className="space-y-4">
                <div className="border border-neutral-800 shadow-sm shadow-neutral-800 bg-neutral-900/10 rounded-lg p-4">
                  <div className="mb-3">
                    <div className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">You</div>
                    <p className="text-gray-300 mt-2 text-sm">"What are the main findings about renewable energy costs in this report?"</p>
                  </div>
                  <div>
                    <div className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">NoteCast</div>
                    <p className="text-gray-400 mt-2 text-sm">Based on pages 12-15 of your report, the main findings show that renewable energy costs have decreased by 85% since 2010...</p>
                  </div>
                </div>

                <div className="border border-neutral-800 shadow-sm shadow-neutral-800 bg-neutral-900/10 rounded-lg p-4">
                  <div className="mb-3">
                    <div className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">You</div>
                    <p className="text-gray-300 mt-2 text-sm">"Compare the methodologies used in the first and third sections"</p>
                  </div>
                  <div>
                    <div className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">NoteCast</div>
                    <p className="text-gray-400 mt-2 text-sm">The methodologies differ significantly: Section 1 uses quantitative analysis with statistical modeling, while Section 3 employs qualitative interviews...</p>
                  </div>
                </div>

                <div className="border border-neutral-800 shadow-sm shadow-neutral-800 bg-neutral-900/10 rounded-lg p-4">
                  <div className="mb-3">
                    <div className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">You</div>
                    <p className="text-gray-300 mt-2 text-sm">"Summarize the key takeaways from the YouTube video about machine learning"</p>
                  </div>
                  <div>
                    <div className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">NoteCast</div>
                    <p className="text-gray-400 mt-2 text-sm">The video covers 5 key takeaways: 1) Data quality matters more than quantity, 2) Feature engineering is crucial...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Page;