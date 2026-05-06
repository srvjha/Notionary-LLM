"use client";
import React, { useRef, useState } from "react";
import {
  Upload,
  Link as LinkIcon,
  ClipboardList,
  PlusCircle,
  Youtube,
  FileText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import {
  validateUploadPDF,
  validateUploadText,
  validateUploadWebsiteURL,
  validateUploadYoutubeURL,
} from "@/validators/upload.validator";
import { UploadFormData, UploadSourcesModalProps } from "@/types/upload.type";
import { cn } from "@/lib/utils";

const defaultAccept = ".pdf";

type Tab = "uploadFile" | "website" | "copiedText" | "youtube";

const tabs: { key: Tab; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "uploadFile", label: "PDF", Icon: PlusCircle },
  { key: "website", label: "Website", Icon: LinkIcon },
  { key: "copiedText", label: "Text", Icon: ClipboardList },
  { key: "youtube", label: "YouTube", Icon: Youtube },
];

export default function UploadSourcesModal({
  trigger,
  onFilesSelected,
  onWebsiteClick,
  onCopiedTextClick,
  onYoutubeClick,
  accept = defaultAccept,
  open,
  onOpenChange,
}: UploadSourcesModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("uploadFile");

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [textError, setTextError] = useState({
    website: "",
    copiedText: "",
    youtube: "",
    pdf: "",
  });

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const file = fileList[0];
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
      setTextError((prev) => ({ ...prev, website: "Website URL is required." }));
      return;
    }
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
      setTextError((prev) => ({ ...prev, youtube: "YouTube URL is required." }));
      return;
    }
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
      setTextError((prev) => ({ ...prev, copiedText: "Copied text is required." }));
      return;
    }
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
    if (collectionName) formData.append("collectionName", collectionName);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-stone-950 border-stone-800 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-stone-100 tracking-tight font-medium">
            Add a source
          </DialogTitle>
          <p className="text-sm text-stone-500 mt-1">
            Choose a source type and upload, paste, or link your content.
          </p>
        </DialogHeader>

        {/* Tabs */}
        <div className="px-6 pt-3">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-stone-900/60 border border-stone-800">
            {tabs.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-md text-[13px] font-medium",
                  "transition-colors cursor-pointer",
                  activeTab === key
                    ? "bg-stone-800 text-stone-100"
                    : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 min-h-[260px]">
          {activeTab === "uploadFile" && (
            <div className="space-y-3">
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    fileInputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
                className={cn(
                  "rounded-xl border border-dashed py-12 px-6",
                  "flex flex-col items-center text-center gap-3",
                  "cursor-pointer transition-colors",
                  isDragging
                    ? "border-amber-400 bg-amber-400/5"
                    : "border-stone-800 hover:border-stone-700 hover:bg-stone-900/40"
                )}
              >
                <div className="w-11 h-11 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-stone-300" />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-stone-100">
                    Drop a PDF here
                  </p>
                  <p className="text-sm text-stone-500 mt-1">
                    or{" "}
                    <span className="text-amber-400 underline underline-offset-2">
                      browse files
                    </span>
                  </p>
                </div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-stone-600">
                  PDF · up to 100MB
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept={accept}
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>
              {textError.pdf && (
                <p className="text-sm text-amber-400">{textError.pdf}</p>
              )}
            </div>
          )}

          {activeTab === "website" && (
            <div className="space-y-3">
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-stone-500 font-medium">
                  Website URL
                </span>
                <Input
                  className="mt-2 h-10 bg-stone-900/60 border-stone-800 focus-visible:border-stone-600 focus-visible:ring-0 text-stone-100 placeholder:text-stone-600"
                  placeholder="https://example.com/article"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </label>
              {textError.website && (
                <p className="text-sm text-amber-400">{textError.website}</p>
              )}
              <Button
                onClick={handleWebsiteUpload}
                className="w-full h-10 bg-stone-100 hover:bg-amber-300 text-stone-950 font-medium cursor-pointer"
              >
                Add website
              </Button>
            </div>
          )}

          {activeTab === "copiedText" && (
            <div className="space-y-3">
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-stone-500 font-medium">
                  Title
                </span>
                <Input
                  className="mt-2 h-10 bg-stone-900/60 border-stone-800 focus-visible:border-stone-600 focus-visible:ring-0 text-stone-100 placeholder:text-stone-600"
                  placeholder="A short name for this text"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-stone-500 font-medium">
                  Text
                </span>
                <Textarea
                  className="mt-2 min-h-[140px] bg-stone-900/60 border-stone-800 focus-visible:border-stone-600 focus-visible:ring-0 text-stone-100 placeholder:text-stone-600"
                  placeholder="Paste your text here…"
                  value={copiedText}
                  onChange={(e) => setCopiedText(e.target.value)}
                />
              </label>
              {textError.copiedText && (
                <p className="text-sm text-amber-400">{textError.copiedText}</p>
              )}
              <Button
                onClick={handleCopiedTextUpload}
                className="w-full h-10 bg-stone-100 hover:bg-amber-300 text-stone-950 font-medium cursor-pointer"
              >
                Add text
              </Button>
            </div>
          )}

          {activeTab === "youtube" && (
            <div className="space-y-3">
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.16em] text-stone-500 font-medium">
                  YouTube URL
                </span>
                <Input
                  className="mt-2 h-10 bg-stone-900/60 border-stone-800 focus-visible:border-stone-600 focus-visible:ring-0 text-stone-100 placeholder:text-stone-600"
                  placeholder="https://youtube.com/watch?v=…"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
              </label>
              {textError.youtube && (
                <p className="text-sm text-amber-400">{textError.youtube}</p>
              )}
              <Button
                onClick={handleYoutubeUpload}
                className="w-full h-10 bg-stone-100 hover:bg-amber-300 text-stone-950 font-medium cursor-pointer"
              >
                Add video
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
