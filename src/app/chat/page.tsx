"use client";
import ChatBox from "@/components/ChatBox";
import SourceBox from "@/components/SourceBox";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [contextCreated, setContextCreated] = useState(false);

  return (
    <>
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col lg:flex-row gap-4 min-h-[85vh]">
          <div className="bg-neutral-800/40 w-full lg:w-1/3 rounded-xl">
            <SourceBox
              open={open}
              setOpen={setOpen}
              contextCreated={contextCreated}
              setContextCreated={setContextCreated}
            />
          </div>

          <div className="bg-neutral-800/40 w-full lg:flex-1 rounded-xl">
            <ChatBox
              setOpen={setOpen}
              setContextCreated={setContextCreated}
              contextCreated={contextCreated}
            />
          </div>
        </div>
      </div>
    </>
  );
}
