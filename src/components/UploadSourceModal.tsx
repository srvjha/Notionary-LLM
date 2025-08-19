"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  Upload,
  Link as LinkIcon,
  ClipboardList,
  PlusCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type UploadSourcesModalProps = {
  /** The element that opens the modal (e.g., a Button) */
  trigger: React.ReactNode;
  /** Callback with selected files (drop or choose) */
  onFilesSelected?: (formdata: FormData) => void;
  /** Click handlers for cards */
  onWebsiteClick?: () => void;
  onCopiedTextClick?: () => void;
  /** Accept string for file input */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Control the dialog from parent if needed */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const defaultAccept = ".pdf";

export default function UploadSourcesModal({
  trigger,
  onFilesSelected,
  onWebsiteClick,
  onCopiedTextClick,
  accept = defaultAccept,
  multiple = true,
  open,
  onOpenChange,
}: UploadSourcesModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [popUpContent, setPopUpContent] = useState({
    uploadFile: true,
    website: false,
    copiedText: false,
  });

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      
      const file = Array.from(fileList);
      const formData = new FormData();
      formData.append("pdf", file[0]);
      onFilesSelected?.(formData);
      onOpenChange?.(false);
    },
    [onFilesSelected]
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleWebsiteClick = () => {
    setPopUpContent({
      uploadFile: false,
      website: true,
      copiedText: false,
    });
  };
  const handleCopiedTextClick = () => {
    setPopUpContent({
      uploadFile: false,
      website: false,
      copiedText: true,
    });
  };
  const handleUploadClick = () => {
    setPopUpContent({
      uploadFile: true,
      website: false,
      copiedText: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload sources</DialogTitle>
        </DialogHeader>

        {popUpContent["uploadFile"] && (
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={[
              "rounded-xl border-2 border-dashed p-8",
              "bg-neutral-900/40",
              isDragging ? "border-blue-500/70" : "border-neutral-700",
              "transition-colors",
            ].join(" ")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                fileInputRef.current?.click();
              }
            }}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="bg-blue-600/20 p-3 rounded-full">
                <Upload className="w-6 h-6 text-blue-500" />
              </div>
              <p className="font-medium">Upload sources</p>
              <p className="text-sm text-neutral-400">
                Drag and drop or{" "}
                <button
                  type="button"
                  className="text-blue-500 underline underline-offset-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  choose file
                </button>{" "}
                to upload
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Supported file types: PDF
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={accept}
              multiple={false}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        )}

        {/* website area  */}
        {popUpContent["website"] && (
          <div>
            <Input className="" placeholder="Paste your Website URL" />
          </div>
        )}

        {/* copied text area  */}
        {popUpContent["copiedText"] && (
          <div>
            <Textarea placeholder="Paste your copied text" />
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={handleUploadClick}
            className="flex flex-col items-center justify-center gap-2 p-4 border border-neutral-700 rounded-xl hover:bg-neutral-800/70 active:scale-[0.99] transition"
          >
            <PlusCircle className="w-6 h-6" />
            <span className="text-sm">Upload File</span>
          </button>
          <button
            onClick={handleWebsiteClick}
            className="flex flex-col items-center justify-center gap-2 p-4 border border-neutral-700 rounded-xl hover:bg-neutral-800/70 active:scale-[0.99] transition"
          >
            <LinkIcon className="w-6 h-6" />
            <span className="text-sm">Website</span>
          </button>

          <button
            onClick={handleCopiedTextClick}
            className="flex flex-col items-center justify-center gap-2 p-4 border border-neutral-700 rounded-xl hover:bg-neutral-800/70 active:scale-[0.99] transition"
          >
            <ClipboardList className="w-6 h-6" />
            <span className="text-sm">Copied text</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
