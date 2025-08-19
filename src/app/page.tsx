'use client'
import ChatBox from "@/components/ChatBox";
import InputBox from "@/components/InputBox";
import { useState } from "react";

export default function Home() {
   const [pdf, setPdf] = useState<{
    name: string;
    summary: string;
  }>({
    name: "",
    summary: ""
   });

  return (
    <div className=" max-w-7xl mx-auto mt-5">
      <div className="flex gap-4 min-h-[80vh] ">
        <div className="bg-neutral-800/40 w-full flex-1 rounded-xl">
           <InputBox onUploadSuccess={(pdf) => setPdf({ ...pdf })} />
        </div>
        <div className="bg-neutral-800/40 w-full flex-2 rounded-xl">
          <ChatBox pdf={pdf} />
        </div>
      </div>
    </div>
  );
}
