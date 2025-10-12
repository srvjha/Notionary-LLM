"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import UploadSourcesModal from "./uploadSourceModal";
import {
  DockIcon,
  FileCheck,
  Globe,
  Plus,
  PlusCircle,
  SquarePen,
  Trash,
  Youtube,
} from "lucide-react";
import { UploadFormData } from "@/types/upload.type";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

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
                ? { ...source, fileID: fileId }
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
      setSources((prev) => [...prev, { title: websiteUrl, type: "website" }]);
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
                ? { ...source, fileID: fileId }
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
      setSources((prev) => [...prev, { title: copiedText, type: "text" }]);
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
                ? { ...source, fileID: fileId }
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
      setSources((prev) => [...prev, { title: youtubeUrl, type: "youtube" }]);
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
                ? { ...source, fileID: fileId }
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
    toast.success("Source deleted successfully");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Sources Header  */}
      <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
        <p className="text-lg font-semibold">Sources</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="cursor-pointer"
              disabled={sources.length === 0}
            >
              New Chat <Plus />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                chat and remove your sources.
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

      <div className="p-1.5">
        {false ? (
          <div className="flex justify-center items-center px-4 py-6">
            <ClipLoader size={28} color="white" />
          </div>
        ) : (
          sources.map((source, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border rounded-lg p-3 mb-3 mt-1 cursor-pointer transition bg-neutral-900 text-neutral-100"
            >
              <div className="flex gap-2 w-full text-neutral-50 ">
                {source.sourceType === SourceType.PDF &&
                  (isUploadingPdf ? (
                    <ClipLoader size={24} color="white" />
                  ) : (
                    <SquarePen className="w-5 h-5 mt-0.5 text-white" />
                  ))}

                {source.sourceType === SourceType.WEBSITE &&
                  (isUploadingWebsite ? (
                    <ClipLoader size={24} color="white" />
                  ) : (
                    <Globe className="w-5 h-5 mt-0.5 text-white" />
                  ))}

                {source.sourceType === SourceType.TEXT &&
                  (isUploadingText ? (
                    <ClipLoader size={24} color="white" />
                  ) : (
                    <DockIcon className="w-5 h-5 mt-0.5 text-white" />
                  ))}

                {source.sourceType === SourceType.YOUTUBE &&
                  (isUploadingYoutube ? (
                    <ClipLoader size={24} color="white" />
                  ) : (
                    <Youtube className="w-5 h-5 mt-0.5 text-white" />
                  ))}

                <div className="flex justify-between items-center w-full">
                  <span className="truncate flex">{source.title}</span>
                  <Trash
                    className="w-5 h-5 mt-0.5 text-red-500"
                    onClick={() => handleDeleteSource(source.id)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {sources.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <FileCheck size={50} />
          <p className="text-sm text-neutral-400 w-full px-4">
            Click below to add PDFs, websites or directly import a file.
          </p>
        </div>
      ) : null}

      <div className="p-4 border-t border-neutral-700">
        <UploadSourcesModal
          trigger={
            <Button className="w-full text-base cursor-pointer flex items-center gap-2">
              Add
              <PlusCircle className="size-[20px]" />
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
