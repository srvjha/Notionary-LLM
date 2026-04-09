import React from 'react'
import { Twitter, Github, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <div className="bg-black">
      <footer className="pt-16 relative overflow-hidden flex flex-col items-center shadow-[0_-10px_40px_rgba(30,58,138,0.05)]">
        {/* Subtle background glow for the footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-800/40 to-transparent"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-sm"></div>

        <div className="w-full relative z-10 flex flex-col items-center">
          
          {/* Massive Background Text */}
          <div className="w-full overflow-hidden flex justify-center items-center pointer-events-none select-none px-4 pb-8 md:pb-12">
             <span className="text-[14vw] md:text-[15.5vw] leading-[0.75] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-blue-800/40 to-blue-950/10">
               NOTIONARY
             </span>
          </div>

          {/* Bottom Bar: Copyright and Socials */}
          <div className="w-full bg-black/50 backdrop-blur-sm shadow-[0_-5px_20px_rgba(30,58,138,0.1)]">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
              
              <p className="text-blue-200/40 text-center md:text-left">
                &copy; {new Date().getFullYear()} Notionary LLM. All rights reserved.
              </p>

              <div className="flex items-center gap-6">
                <a href="#" className="text-blue-200/40 hover:text-blue-400 transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-blue-200/40 hover:text-blue-400 transition-colors" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-blue-200/40 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              
            </div>
          </div>

        </div>
      </footer>
    </div>
  )
}

export default Footer
