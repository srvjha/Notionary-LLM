"use client";
import ChatBox from "@/components/ChatBox";
import InputBox from "@/components/InputBox";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [pdf, setPdf] = useState<{
    name: string;
    summary: string;
  }>({
    name: "",
    summary: "",
  });

  return (
    <div className="max-w-7xl mx-auto mt-5 px-4">
      <div className="flex flex-col lg:flex-row gap-4 min-h-[85vh]">
        <div className="bg-neutral-800/40 w-full lg:w-1/3 rounded-xl">
          <InputBox
            open={open}
            setOpen={setOpen}
            onUploadSuccess={(pdf) => setPdf({ ...pdf })}
          />
        </div>

        <div className="bg-neutral-800/40 w-full lg:flex-1 rounded-xl">
          <ChatBox open={open} setOpen={setOpen} pdf={pdf} />
        </div>
      </div>
    </div>
  );
}
