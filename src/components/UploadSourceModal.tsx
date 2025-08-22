"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  Upload,
  Link as LinkIcon,
  ClipboardList,
  PlusCircle,
  Youtube,
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
import {
  validateUploadPDF,
  validateUploadText,
  validateUploadWebsiteURL,
  validateUploadYoutubeURL,
} from "@/validators/upload.validator";
import { UploadFormData, UploadSourcesModalProps } from "@/types/upload.type";

const defaultAccept = ".pdf";

export default function UploadSourcesModal({
  trigger,
  onFilesSelected,
  onWebsiteClick,
  onCopiedTextClick,
  onYoutubeClick,
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
    youtube: false,
  });

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [textError, setTextError] = useState({
    website: "",
    copiedText: "",
    youtube: "",
  });

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const file = fileList[0];
    // for now i m only taking pdf
    // TODO: add more files types
    // zod validation for pdf
    const validation = validateUploadPDF({ file });
    if (!validation.success) {
      setTextError((prev) => ({ ...prev, pdf: validation.error.message }));
      return;
    }
    const formData = new FormData() as UploadFormData;
    formData.append("pdf", file);
    onFilesSelected?.(formData);
    onOpenChange?.(false);
  };

  const handleWebsiteUpload = () => {
    if (!websiteUrl) {
      setTextError((prev) => ({
        ...prev,
        website: "Website URL is required.",
      }));
      return;
    }
    // zod validation for website
    const validation = validateUploadWebsiteURL({ url: websiteUrl });
    if (!validation.success) {
      setTextError((prev) => ({ ...prev, website: validation.error.message }));
      return;
    }
    const formData = new FormData() as UploadFormData;
    formData.append("website", websiteUrl);
    onWebsiteClick?.(formData);
    onOpenChange?.(false);
    setTextError((prev) => ({ ...prev, website: "" }));
  };

  const handleYoutubeUpload = () => {
    if (!youtubeUrl) {
      setTextError((prev) => ({
        ...prev,
        youtube: "YouTube URL is required.",
      }));
      return;
    }
    // zod validation for youtube
    const validation = validateUploadYoutubeURL({ url: youtubeUrl });
    if (!validation.success) {
      setTextError((prev) => ({ ...prev, youtube: validation.error.message }));
      return;
    }
    const formData = new FormData() as UploadFormData;
    formData.append("youtube", youtubeUrl);
    onYoutubeClick?.(formData);
    onOpenChange?.(false);
    setTextError((prev) => ({ ...prev, youtube: "" }));
  };

  const handleCopiedTextUpload = () => {
    if (!copiedText.trim()) {
      setTextError((prev) => ({
        ...prev,
        copiedText: "Copied text is required.",
      }));
      return;
    }
    // zod validation for copied text
    const validation = validateUploadText({ text: copiedText });
    if (!validation.success) {
      setTextError((prev) => ({
        ...prev,
        copiedText: validation.error.message,
      }));
      return;
    }
    const formData = new FormData() as UploadFormData;
    formData.append("copiedText", copiedText);
    if (collectionName) {
      formData.append("collectionName", collectionName);
    }
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
    setPopUpContent({
      uploadFile: true,
      website: false,
      copiedText: false,
      youtube: false,
    });
  const handleWebsiteClick = () =>
    setPopUpContent({
      uploadFile: false,
      website: true,
      copiedText: false,
      youtube: false,
    });
  const handleCopiedTextClick = () =>
    setPopUpContent({
      uploadFile: false,
      website: false,
      copiedText: true,
      youtube: false,
    });
  const handleYoutubeTextClick = () =>
    setPopUpContent({
      uploadFile: false,
      website: false,
      copiedText: false,
      youtube: true,
    });

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

        {/* Youtube */}
        {popUpContent.youtube && (
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Paste your YouTube URL"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
            <Button onClick={handleYoutubeUpload}>Upload</Button>
            {textError["youtube"] && (
              <p className="text-sm text-red-500">{textError["youtube"]}</p>
            )}
          </div>
        )}

        {/* Bottom buttons */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={handleUploadClick}
            className="flex flex-col items-center justify-center gap-2 cursor-pointer p-4 border border-neutral-700 rounded-xl hover:bg-neutral-800/70 active:scale-[0.99] transition"
          >
            <PlusCircle className="w-6 h-6" />
            <span className="text-sm">Upload File</span>
          </button>
          <button
            onClick={handleWebsiteClick}
            className="flex flex-col items-center justify-center gap-2 cursor-pointer p-4 border border-neutral-700 rounded-xl hover:bg-neutral-800/70 active:scale-[0.99] transition"
          >
            <LinkIcon className="w-6 h-6" />
            <span className="text-sm">Website</span>
          </button>

          <button
            onClick={handleCopiedTextClick}
            className="flex flex-col items-center justify-center gap-2 cursor-pointer p-4 border border-neutral-700 rounded-xl hover:bg-neutral-800/70 active:scale-[0.99] transition"
          >
            <ClipboardList className="w-6 h-6" />
            <span className="text-sm">Copied text</span>
          </button>

          <button
            onClick={handleYoutubeTextClick}
            className="flex flex-col items-center justify-center gap-2 cursor-pointer p-4 border border-neutral-700 rounded-xl hover:bg-neutral-800/70 active:scale-[0.99] transition"
          >
            <Youtube className="w-6 h-6" />
            <span className="text-sm">YouTube Video</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
