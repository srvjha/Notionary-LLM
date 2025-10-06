"use client";
import ChatBox from "@/modules/notebook/components/chatBox";
import SourceBox from "@/modules/notebook/components/sourceBox";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [contextCreated, setContextCreated] = useState(false);

  return (
    <>
      <div className="max-w-8xl mx-auto mt-5 px-4">
        <div className="flex flex-col lg:flex-row gap-4 min-h-[85vh]">
          <div className="bg-neutral-900/40  lg:w-1/4 rounded-xl">
            <SourceBox
              open={open}
              setOpen={setOpen}
              contextCreated={contextCreated}
              setContextCreated={setContextCreated}
            />
          </div>

          <div className="bg-neutral-900/40 w-full lg:flex-1 rounded-xl">
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
