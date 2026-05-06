"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import UploadSourcesModal from "./uploadSourceModal";
import {
  FileText,
  Globe,
  Plus,
  PlusCircle,
  Trash2,
  Youtube,
  ClipboardList,
  Inbox,
  Check,
} from "lucide-react";
import { UploadFormData } from "@/types/upload.type";
import toast from "react-hot-toast";
import { Loader } from "@/components/ai-elements/loader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  usePdfIndexing,
  useTextIndexing,
  useWebsiteIndexing,
  useYoutubeIndexing,
} from "../hooks/notebook";
import { ContextSource, SourceType } from "@prisma/client";
import { cn } from "@/lib/utils";

interface SourceBoxProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  contextCreated: boolean;
  contexts: ContextSource[];
  setContextCreated: (created: boolean) => void;
}

export interface Source {
  title: string;
  type: "pdf" | "website" | "text" | "youtube";
  fileID?: string;
}

const typeMeta: Record<
  SourceType,
  { label: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  [SourceType.PDF]: { label: "PDF", Icon: FileText },
  [SourceType.WEBSITE]: { label: "Web", Icon: Globe },
  [SourceType.TEXT]: { label: "Text", Icon: ClipboardList },
  [SourceType.YOUTUBE]: { label: "YouTube", Icon: Youtube },
};

const SourceBox = ({
  open,
  setOpen,
  contexts: UserContexts,
  contextCreated,
  setContextCreated,
}: SourceBoxProps) => {
  const [sources, setSources] = useState<Partial<ContextSource>[]>([]);
  const { mutateAsync: uploadWebsite, isPending: isUploadingWebsite } =
    useWebsiteIndexing();
  const { mutateAsync: uploadText, isPending: isUploadingText } =
    useTextIndexing();
  const { mutateAsync: uploadYoutube, isPending: isUploadingYoutube } =
    useYoutubeIndexing();
  const { mutateAsync: uploadPdf, isPending: isUploadingPdf } =
    usePdfIndexing();

  useEffect(() => {
    if (UserContexts.length > 0) {
      setSources(UserContexts);
    }
  }, [UserContexts.length]);

  const handleFilesSelected = async (formData: UploadFormData) => {
    const pdfFileName = formData.get("pdf")?.name;
    const isExisting = sources.some(
      (source) =>
        source.title === pdfFileName && source.sourceType === SourceType.PDF
    );
    if (isExisting) {
      toast.error("This PDF is already added!");
      return;
    }
    if (pdfFileName) {
      setSources((prev) => [
        ...prev,
        { title: pdfFileName, sourceType: SourceType.PDF },
      ]);
    }

    try {
      const response = await uploadPdf(formData);
      if (response.success) {
        const { fileId } = response.data;
        if (fileId) {
          setSources((prev) =>
            prev.map((source) =>
              source.title === pdfFileName &&
              source.sourceType === SourceType.PDF
                ? { ...source, id: fileId }
                : source
            )
          );
        }
        if (!contextCreated) {
          setContextCreated(true);
        }
        toast.success("PDF uploaded successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Error uploading PDF");
      console.error("Error uploading files:", error);
    }
  };

  const handleWebsite = async (formData: UploadFormData) => {
    const websiteUrl = formData.get("website");

    const isExisting = sources.some(
      (source) =>
        source.title === websiteUrl && source.sourceType === SourceType.WEBSITE
    );
    if (isExisting) {
      toast.error("This website is already added!");
      return;
    }

    if (websiteUrl) {
      setSources((prev) => [
        ...prev,
        { title: websiteUrl as string, sourceType: SourceType.WEBSITE },
      ]);
    }
    try {
      const response = await uploadWebsite(formData);
      if (response.success) {
        const { fileId } = response.data;
        if (fileId) {
          setSources((prev) =>
            prev.map((source) =>
              source.title === websiteUrl &&
              source.sourceType === SourceType.WEBSITE
                ? { ...source, id: fileId }
                : source
            )
          );
        }
        if (!contextCreated) {
          setContextCreated(true);
        }
        toast.success("Website uploaded successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Error uploading website");
      console.error("Error uploading website:", error);
    }
  };

  const handleCopiedText = async (formData: UploadFormData) => {
    const copiedText = formData.get("copiedText");
    const isExisting = sources.some(
      (source) =>
        source.title === copiedText && source.sourceType === SourceType.TEXT
    );
    if (isExisting) {
      toast.error("This text is already added!");
      return;
    }
    if (copiedText) {
      setSources((prev) => [
        ...prev,
        { title: copiedText as string, sourceType: SourceType.TEXT },
      ]);
    }
    try {
      const response = await uploadText(formData);

      if (response.success) {
        const { fileId } = response.data;
        if (fileId) {
          setSources((prev) =>
            prev.map((source) =>
              source.title === copiedText &&
              source.sourceType === SourceType.TEXT
                ? { ...source, id: fileId }
                : source
            )
          );
        }
        if (!contextCreated) {
          setContextCreated(true);
        }
        toast.success("Text uploaded successfully!");
      }
    } catch (error: any) {
      console.error("Error uploading text:", error);
      toast.error(error.message || "Error uploading text");
    }
  };

  const handleYoutubeText = async (formData: UploadFormData) => {
    const youtubeUrl = formData.get("youtube");
    const isExisting = sources.some(
      (source) =>
        source.title === youtubeUrl && source.sourceType === SourceType.YOUTUBE
    );
    if (isExisting) {
      toast.error("This YouTube video is already added!");
      return;
    }
    if (youtubeUrl) {
      setSources((prev) => [
        ...prev,
        { title: youtubeUrl as string, sourceType: SourceType.YOUTUBE },
      ]);
    }
    try {
      const response = await uploadYoutube(formData);
      if (response.success) {
        const { fileId } = response.data;
        if (fileId) {
          setSources((prev) =>
            prev.map((source) =>
              source.title === youtubeUrl &&
              source.sourceType === SourceType.YOUTUBE
                ? { ...source, id: fileId }
                : source
            )
          );
        }
        if (!contextCreated) {
          setContextCreated(true);
        }
        toast.success("YouTube video uploaded successfully!");
      }
    } catch (error: any) {
      console.error("Error uploading text:", error);
      toast.error(error.message || "Error uploading YouTube video");
    }
  };

  const handleNewChat = () => {
    setSources([]);
    setContextCreated(false);
  };

  const handleDeleteSource = async (fileId?: string) => {
    setSources((prev) => prev.filter((source) => source.id !== fileId));
    toast.success("Source removed");
  };

  const isUploadingFor = (type?: SourceType) => {
    switch (type) {
      case SourceType.PDF:
        return isUploadingPdf;
      case SourceType.WEBSITE:
        return isUploadingWebsite;
      case SourceType.TEXT:
        return isUploadingText;
      case SourceType.YOUTUBE:
        return isUploadingYoutube;
      default:
        return false;
    }
  };

  const grouped = useMemo(() => {
    const order: SourceType[] = [
      SourceType.PDF,
      SourceType.WEBSITE,
      SourceType.YOUTUBE,
      SourceType.TEXT,
    ];
    const map = new Map<SourceType, Partial<ContextSource>[]>();
    for (const t of order) map.set(t, []);
    for (const s of sources) {
      if (!s.sourceType) continue;
      map.get(s.sourceType)!.push(s);
    }
    return order
      .map((t) => ({ type: t, items: map.get(t)! }))
      .filter((g) => g.items.length > 0);
  }, [sources]);

  return (
    <div className="h-full flex flex-col">
      {/* Header — Sources label + New Chat */}
      <div className="px-4 pt-1 pb-3 flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-stone-500 font-medium">
            Sources
          </span>
          {sources.length > 0 && (
            <span className="text-[11px] text-stone-600 tabular-nums">
              {sources.length}
            </span>
          )}
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 cursor-pointer"
              disabled={sources.length === 0}
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              New
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Start a new notebook?</AlertDialogTitle>
              <AlertDialogDescription>
                This will clear your current chat and remove all attached
                sources. You can&apos;t undo this.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleNewChat()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Source list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
        {sources.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 px-4 py-12">
            <div className="w-11 h-11 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center">
              <Inbox className="w-5 h-5 text-stone-500" />
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-[200px]">
              No sources yet. Add a PDF, website, video, or pasted text to get
              started.
            </p>
          </div>
        ) : (
          <div className="space-y-5 pb-4">
            {grouped.map((group) => {
              const meta = typeMeta[group.type];
              return (
                <div key={group.type}>
                  <div className="flex items-center gap-2 px-2 mb-1.5">
                    <meta.Icon className="w-3 h-3 text-stone-500" />
                    <span className="text-[10px] uppercase tracking-[0.16em] text-stone-500 font-medium">
                      {meta.label}
                    </span>
                    <div className="flex-1 h-px bg-stone-800/60" />
                    <span className="text-[10px] text-stone-600 tabular-nums">
                      {group.items.length}
                    </span>
                  </div>
                  <ul className="space-y-0.5">
                    {group.items.map((source, idx) => {
                      const indexed = !!source.id;
                      const uploading =
                        !indexed && isUploadingFor(source.sourceType);
                      const Icon = meta.Icon;
                      const title = (source.title as string) || "Untitled";
                      return (
                        <li
                          key={`${source.id ?? "tmp"}-${idx}`}
                          className={cn(
                            "group/source relative flex items-center gap-2.5 rounded-md px-2 py-2",
                            "hover:bg-stone-900/70 transition-colors"
                          )}
                        >
                          <div className="relative flex-shrink-0 w-7 h-7 rounded-md bg-stone-900 border border-stone-800 flex items-center justify-center">
                            {uploading ? (
                              <Loader size={4} tone="accent" />
                            ) : (
                              <Icon className="w-3.5 h-3.5 text-stone-300" />
                            )}
                            {indexed && !uploading && (
                              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center">
                                <Check className="w-2 h-2 text-amber-400" />
                              </span>
                            )}
                          </div>

                          <Tooltip delayDuration={400}>
                            <TooltipTrigger asChild>
                              <div className="min-w-0 flex-1">
                                <p className="text-[13px] text-stone-200 truncate leading-tight">
                                  {title}
                                </p>
                                <p className="text-[10px] text-stone-500 mt-0.5">
                                  {uploading
                                    ? "Indexing…"
                                    : indexed
                                    ? "Indexed"
                                    : "Pending"}
                                </p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              className="max-w-xs break-words"
                            >
                              {title}
                            </TooltipContent>
                          </Tooltip>

                          <button
                            onClick={() => handleDeleteSource(source.id)}
                            disabled={uploading}
                            aria-label="Remove source"
                            className={cn(
                              "flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center",
                              "text-stone-500 hover:text-amber-400 hover:bg-stone-800",
                              "opacity-0 group-hover/source:opacity-100 transition-opacity",
                              "disabled:opacity-0 cursor-pointer"
                            )}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer — add sources */}
      <div className="p-3 border-t border-stone-900/80">
        <UploadSourcesModal
          trigger={
            <Button
              className={cn(
                "w-full h-10 text-sm font-medium cursor-pointer",
                "bg-stone-100 text-stone-950 hover:bg-amber-300 hover:text-stone-950",
                "transition-colors flex items-center justify-center gap-2 rounded-md"
              )}
            >
              <PlusCircle className="w-4 h-4" />
              Add source
            </Button>
          }
          onFilesSelected={handleFilesSelected}
          onWebsiteClick={handleWebsite}
          onCopiedTextClick={handleCopiedText}
          onYoutubeClick={handleYoutubeText}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    </div>
  );
};

export default SourceBox;
