"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

import UploadSourcesModal from "./UploadSourceModal";
import {
  useDeleteSourceMutation,
  useUploadPdfMutation,
  useUploadTextMutation,
  useUploadWebsiteMutation,
  useUploadYoutubeMutation,
} from "@/services/pdfApi";
import {
  DockIcon,
  FileCheck,
  Globe,
  Plus,
  PlusCircle,
  SquarePen,
  TextIcon,
  Trash,
  Youtube,
} from "lucide-react";
import { UploadFormData } from "@/types/upload.type";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { PdfIcon, WebsiteIcon, YoutubeIcon } from "@/utils/icons";
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
} from "./ui/alert-dialog";

const STORAGE_SOURCES = "source_uploaded";
interface SourceBoxProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  contextCreated: boolean;
  setContextCreated: (created: boolean) => void;
}
interface Source {
  title: string;
  type: "pdf" | "website" | "text" | "youtube";
  fileID?: string;
}
const SourceBox = ({
  open,
  setOpen,
  contextCreated,
  setContextCreated,
}: SourceBoxProps) => {
  const [uploadPdf, { isLoading: isUploadingPdf }] = useUploadPdfMutation();
  const [uploadWebsite, { isLoading: isUploadingWebsite }] =
    useUploadWebsiteMutation();
  const [uploadText, { isLoading: isUploadingText }] = useUploadTextMutation();
  const [uploadYoutube, { isLoading: isUploadingYoutube }] =
    useUploadYoutubeMutation();
  const [deleteSource, { isLoading: isDeletingSource }] =
    useDeleteSourceMutation();
  const [sources, setSources] = useState<Source[]>([]);

  useEffect(() => {
    const storedSources = localStorage.getItem(STORAGE_SOURCES);
    if (storedSources) {
      setSources(JSON.parse(storedSources));
    }
  }, []);

  useEffect(() => {
    if (sources.length > 0) {
      localStorage.setItem(STORAGE_SOURCES, JSON.stringify(sources));
    }
  }, [sources]);

  const handleFilesSelected = async (formData: UploadFormData) => {
    const pdfFileName = formData.get("pdf")?.name;
    const isExisting = sources.some(
      (source) => source.title === pdfFileName && source.type === "pdf"
    );
    if (isExisting) {
      toast.error("This PDF is already added!");
      return;
    }
    if (pdfFileName) {
      setSources((prev) => [...prev, { title: pdfFileName, type: "pdf" }]);
    }

    try {
      const response = await uploadPdf(formData).unwrap();
      if (response.success) {
        const { fileId } = response.data;
        console.log({ fileId });
        if (fileId) {
          setSources((prev) =>
            prev.map((source) =>
              source.title === pdfFileName && source.type === "pdf"
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
      (source) => source.title === websiteUrl && source.type === "website"
    );
    if (isExisting) {
      toast.error("This website is already added!");
      return;
    }

    if (websiteUrl) {
      setSources((prev) => [...prev, { title: websiteUrl, type: "website" }]);
    }
    try {
      const response = await uploadWebsite(formData).unwrap();
      if (response.success) {
        const { fileId } = response.data;
        console.log({ fileId });
        if (fileId) {
          setSources((prev) =>
            prev.map((source) =>
              source.title === websiteUrl && source.type === "website"
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
      (source) => source.title === copiedText && source.type === "text"
    );
    if (isExisting) {
      toast.error("This text is already added!");
      return;
    }
    if (copiedText) {
      setSources((prev) => [...prev, { title: copiedText, type: "text" }]);
    }
    try {
      const response = await uploadText(formData).unwrap();

      if (response.success) {
        const { fileId } = response.data;
        console.log({ fileId });
        if (fileId) {
          setSources((prev) =>
            prev.map((source) =>
              source.title === copiedText && source.type === "text"
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
      (source) => source.title === youtubeUrl && source.type === "youtube"
    );
    if (isExisting) {
      toast.error("This YouTube video is already added!");
      return;
    }
    if (youtubeUrl) {
      setSources((prev) => [...prev, { title: youtubeUrl, type: "youtube" }]);
    }
    try {
      const response = await uploadYoutube(formData).unwrap();
      if (response.success) {
        const { fileId } = response.data;
        console.log({ fileId });
        if (fileId) {
          setSources((prev) =>
            prev.map((source) =>
              source.title === youtubeUrl && source.type === "youtube"
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
    localStorage.removeItem(STORAGE_SOURCES);
    setContextCreated(false);
  };

  const handleDeleteSource = async (fileId?: string) => {
    console.log("Deleting source with fileId:", fileId);
    if (!fileId) return;

    toast.loading("Deleting source...", { id: "deleteSource" });

    try {
      await deleteSource({ fileID: fileId }).unwrap();
      setSources((prev) => prev.filter((source) => source.fileID !== fileId));
      const locallyStoredSources = JSON.parse(localStorage.getItem(STORAGE_SOURCES) || "[]");
      localStorage.setItem(STORAGE_SOURCES, JSON.stringify(locallyStoredSources.filter((source: Source) => source.fileID !== fileId)));
      toast.success("Source deleted successfully!", { id: "deleteSource" });
    } catch (error: any) {
      console.error("Error deleting source:", error);
      toast.error(error.message || "Error deleting source", { id: "deleteSource" });
    } finally {
      toast.dismiss("deleteSource");
    }
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
        {sources.map((source, index) => (
          <div
            key={index}
            className="flex items-center gap-2 border rounded-lg p-3 mb-3 mt-1 cursor-pointer transition bg-neutral-900 text-neutral-100"
          >
            <div className="flex gap-2 w-full text-neutral-50 ">
              {source.type === "pdf" &&
                (isUploadingPdf ? (
                  <ClipLoader size={24} color="white" />
                ) : (
                  <SquarePen className="w-5 h-5 mt-0.5 text-white" />
                ))}

              {source.type === "website" &&
                (isUploadingWebsite ? (
                  <ClipLoader size={24} color="white" />
                ) : (
                  <Globe className="w-5 h-5 mt-0.5 text-white" />
                ))}

              {source.type === "text" &&
                (isUploadingText ? (
                  <ClipLoader size={24} color="white" />
                ) : (
                  <DockIcon className="w-5 h-5 mt-0.5 text-white" />
                ))}

              {source.type === "youtube" &&
                (isUploadingYoutube ? (
                  <ClipLoader size={24} color="white" />
                ) : (
                  <Youtube className="w-5 h-5 mt-0.5 text-white" />
                ))}
             
             <div className="flex justify-between items-center w-full">
              <span className="truncate flex">{source.title}</span>
              <Trash
                className="w-5 h-5 mt-0.5 text-red-500"
                onClick={() => handleDeleteSource(source.fileID)}
              />
              </div>
            </div>
          </div>
        ))}
      </div>

      {sources.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <FileCheck size={50} />
          <p className="text-sm text-neutral-400 max-w-xs">
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
