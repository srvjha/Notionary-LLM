import React from "react";
import { Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-950 border-t border-stone-900/60 mt-24">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        {/* Wordmark */}
        <div className="overflow-hidden flex justify-center pointer-events-none select-none mb-12">
          <span className="text-[16vw] md:text-[14vw] leading-[0.8] font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-stone-100/[0.04] to-stone-100/[0.01]">
            Notionary
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-amber-400 flex items-center justify-center">
              <span className="text-stone-950 text-[11px] font-bold">N</span>
            </div>
            <p className="text-sm text-stone-500">
              &copy; {new Date().getFullYear()} Notionary LLM
            </p>
          </div>

          <div className="flex items-center gap-1">
            <a
              href="https://x.com/J_srv001"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-md flex items-center justify-center text-stone-500 hover:text-amber-400 hover:bg-stone-900 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/srvjha"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-md flex items-center justify-center text-stone-500 hover:text-amber-400 hover:bg-stone-900 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/srvjha02/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-md flex items-center justify-center text-stone-500 hover:text-amber-400 hover:bg-stone-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
