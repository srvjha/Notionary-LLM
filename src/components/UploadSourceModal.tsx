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
import { Button } from "./ui/button";

type UploadSourcesModalProps = {
  trigger: React.ReactNode;
  onFilesSelected?: (formdata: FormData) => void;
  onWebsiteClick?: (formdata: FormData) => void;
  onCopiedTextClick?: (formdata: FormData) => void;
  accept?: string;
  multiple?: boolean;
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

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [textError, setTextError] = useState({
    website: "",
    copiedText: "",
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
    [onFilesSelected, onOpenChange]
  );

  const handleWebsiteUpload = () => {
    if (!websiteUrl) return;
    const websiteRegex = /^(https?:\/\/)?(www\.)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
    if (!websiteRegex.test(websiteUrl)) {
      setTextError((prev) => ({ ...prev, website: "Invalid website URL." }));
      return;
    }
    const formData = new FormData();
    formData.append("website", websiteUrl);
    onWebsiteClick?.(formData);
    onOpenChange?.(false);
    setTextError((prev) => ({ ...prev, website: "" }));
  };

  const handleCopiedTextUpload = () => {
    if (copiedText.length > 25000) {
      setTextError((prev) => ({ ...prev, copiedText: "Text should be 25000 characters or less." }));
      return;
    }
    if (!collectionName) {
      setTextError((prev) => ({ ...prev, collectionName: "Collection name is required." }));
      return;
    }
    const formData = new FormData();
    formData.append("copiedText", copiedText);
    formData.append("collectionName", collectionName);
    onCopiedTextClick?.(formData);
    onOpenChange?.(false);
    setTextError((prev) => ({ ...prev, copiedText: "" }));
  };

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

  const handleUploadClick = () =>
    setPopUpContent({ uploadFile: true, website: false, copiedText: false });
  const handleWebsiteClick = () =>
    setPopUpContent({ uploadFile: false, website: true, copiedText: false });
  const handleCopiedTextClick = () =>
    setPopUpContent({ uploadFile: false, website: false, copiedText: true });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload sources</DialogTitle>
        </DialogHeader>

        {/* Upload File */}
        {popUpContent.uploadFile && (
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

        {/* Website */}
        {popUpContent.website && (
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Paste your Website URL"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
            <Button onClick={handleWebsiteUpload}>Upload</Button>
            {textError["website"] && (
              <p className="text-sm text-red-500">{textError["website"]}</p>
            )}
          </div>
        )}

        {/* Copied Text */}
        {popUpContent.copiedText && (
          <div className="flex flex-col gap-2">
            <Textarea
              placeholder="Paste your copied text"
              value={copiedText}
              onChange={(e) => setCopiedText(e.target.value)}
            />
            <Input
              placeholder="Enter title for the collection"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              required
            />
            {textError["copiedText"] && (
              <p className="text-sm text-red-500">{textError["copiedText"]}</p>
            )}
            <Button onClick={handleCopiedTextUpload}>Upload</Button>
          </div>
        )}

        {/* Bottom buttons */}
        <div className="grid grid-cols-3 gap-4 mt-4">
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
