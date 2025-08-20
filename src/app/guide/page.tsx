"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Upload, 
  MessageSquare, 
  HelpCircle, 
  Brain, 
  FileText, 
  Globe, 
  Copy, 
  Video,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Zap,
  Search,
  Download,
  Play,
  ChevronDown,
  ChevronUp,
  LineChart
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section:any) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

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
      icon: <Brain className="w-6 h-6 text-blue-400" />,
      title: "RAG Technology",
      description: "Retrieval-Augmented Generation ensures accurate, source-backed answers"
    },
    {
      icon: <Search className="w-6 h-6 text-green-400" />,
      title: "Smart Search",
      description: "AI understands context and finds relevant information across all your documents"
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-purple-400" />,
      title: "Source Attribution",
      description: "Every answer shows exactly where the information came from"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
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
    },
    {
      title: "Follow Up Questions",
      description: "Build on previous answers with follow-up questions for deeper insights"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative px-6 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">AI-Powered Document Intelligence</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              NoteCast Complete Guide
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform any content into an intelligent chat experience. Upload documents, add websites, paste text, or analyze YouTube videos — then have natural conversations powered by advanced AI.
            </p>
          </div>
        </div>
      </div>

      {/* Core Features Overview */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose NoteCast?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800/70 transition-colors">
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

      {/* Supported Input Types */}
      <div className="px-6 py-16 bg-neutral-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Supported Content Types</h2>
            <p className="text-gray-300">NoteCast works with multiple content formats to give you maximum flexibility</p>
          </div>

          <div className="grid gap-8">
            {inputTypes.map((type, index) => (
              <Card key={index} className="bg-neutral-800/50 border-neutral-700">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {type.icon}
                    <div className="flex-1">
                      <CardTitle className="text-white">{type.title}</CardTitle>
                      <p className="text-gray-400 text-sm mt-1">{type.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSection(index)}
                      className="text-gray-400 hover:text-white"
                    >
                      {expandedSection === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>

                {expandedSection === index && (
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Capabilities */}
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          Capabilities
                        </h4>
                        <ul className="space-y-2">
                          {type.details.map((detail, idx) => (
                            <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
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
                          {type.steps.map((step, idx) => (
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
                          {type.tips.map((tip, idx) => (
                            <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                              <AlertCircle className="w-3 h-3 text-yellow-400 mt-1 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Interface Guide */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mastering the Chat Interface</h2>
            <p className="text-gray-300">Learn how to ask the right questions and get the most out of your AI conversations</p>
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
                  <Card key={index} className="bg-neutral-800/50 border-neutral-700">
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
                <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4">
                  <div className="mb-3">
                    <div className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">You</div>
                    <p className="text-gray-300 mt-2 text-sm">"What are the main findings about renewable energy costs in this report?"</p>
                  </div>
                  <div>
                    <div className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">NoteCast</div>
                    <p className="text-gray-400 mt-2 text-sm">Based on pages 12-15 of your report, the main findings show that renewable energy costs have decreased by 85% since 2010...</p>
                  </div>
                </div>

                <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4">
                  <div className="mb-3">
                    <div className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">You</div>
                    <p className="text-gray-300 mt-2 text-sm">"Compare the methodologies used in the first and third sections"</p>
                  </div>
                  <div>
                    <div className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">NoteCast</div>
                    <p className="text-gray-400 mt-2 text-sm">The methodologies differ significantly: Section 1 uses quantitative analysis with statistical modeling, while Section 3 employs qualitative interviews...</p>
                  </div>
                </div>

                <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4">
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

      {/* Advanced Features */}
      <div className="px-6 py-16 bg-neutral-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Advanced Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardContent className="p-6">
                <Search className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold text-white mb-3">Multi-Document Search</h3>
                <p className="text-gray-400 text-sm mb-4">Search across all uploaded documents simultaneously for comprehensive insights.</p>
                <ul className="text-gray-500 text-xs space-y-1">
                  <li>• Cross-reference information</li>
                  <li>• Find connections between sources</li>
                  <li>• Comprehensive analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardContent className="p-6">
                <Download className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="font-semibold text-white mb-3">Export Conversations</h3>
                <p className="text-gray-400 text-sm mb-4">Save your chat history and insights for future reference or sharing.</p>
                <ul className="text-gray-500 text-xs space-y-1">
                  <li>• PDF export with sources</li>
                  <li>• Markdown format support</li>
                  <li>• Share insights easily</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardContent className="p-6">
                <Brain className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="font-semibold text-white mb-3">Context Awareness</h3>
                <p className="text-gray-400 text-sm mb-4">AI maintains conversation context for more natural, flowing discussions.</p>
                <ul className="text-gray-500 text-xs space-y-1">
                  <li>• Remembers previous questions</li>
                  <li>• Builds on conversations</li>
                  <li>• Contextual follow-ups</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Getting Started CTA */}
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-transparent p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Content?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Start your intelligent document conversations today. Upload any content type and experience the power of AI-driven insights.
            </p>
            <Link href="/">
            <Button 
              className=" text-base cursor-pointer"
            >
              Get Started
             <ArrowRight />
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;