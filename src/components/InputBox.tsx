"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import {
  FileCheck,
  PlusCircle,
  SquarePen,
  CheckCircle2,
  Delete,
  Trash,
} from "lucide-react";
import UploadSourcesModal from "./UploadSourceModal";
import {
  useUploadPdfMutation,
  useUploadTextMutation,
  useUploadWebsiteMutation,
  useUploadYoutubeMutation,
} from "@/services/pdfApi";
import { ClipLoader } from "react-spinners";

type SummaryData = { name: string; summary: string };
type SummaryMap = Record<string, SummaryData>;

const STORAGE_TITLES = "titles";
const STORAGE_SUMMARIES = "SummaryDetailsMap";

const getSummaryMap = (): SummaryMap => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_SUMMARIES) || "{}");
  } catch {
    return {};
  }
};
const saveSummaryFor = (titleKey: string, data: SummaryData) => {
  const map = getSummaryMap();
  map[titleKey] = data;
  localStorage.setItem(STORAGE_SUMMARIES, JSON.stringify(map));
};

const InputBox = ({
  open,
  setOpen,
  onUploadSuccess,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onUploadSuccess: (pdf: { name: string; summary: string }) => void;
}) => {
  const [uploadPdf, { isLoading: isLoadingPdf }] = useUploadPdfMutation();
  const [uploadWebsite, { isLoading: isLoadingWebsite }] =
    useUploadWebsiteMutation();
  const [uploadText, { isLoading: isLoadingText }] = useUploadTextMutation();
  const [uploadYoutube, { isLoading: isLoadingYoutube }] = useUploadYoutubeMutation();

  const [titles, setTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [uploadingTitle, setUploadingTitle] = useState<string | null>(null);

  useEffect(() => {
    const storedTitles = localStorage.getItem(STORAGE_TITLES);
    if (storedTitles) {
      try {
        const parsedTitles = JSON.parse(storedTitles);
        if (Array.isArray(parsedTitles)) {
          setTitles(parsedTitles);
        }
      } catch (error) {
        console.error("Error parsing stored titles:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save titles whenever they change (but only after initialization)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_TITLES, JSON.stringify(titles));
    }
  }, [titles, isInitialized]);

  const upsertTitle = (titleKey: string) => {
    setTitles((prev) => (prev.includes(titleKey) ? prev : [...prev, titleKey]));
  };

  const handleFilesSelected = async (formData: FormData) => {
    const pdfFile = formData.get("pdf");
    const titleKey =
      pdfFile instanceof File ? pdfFile.name : `PDF ${Date.now()}`;

    upsertTitle(titleKey);
    setUploadingTitle(titleKey);

    try {
      const response = await uploadPdf(formData).unwrap();
      const summaryData: SummaryData = {
        name: response.collectionName,
        summary: response.summary,
      };
      saveSummaryFor(titleKey, summaryData);
      setSelectedTitle(titleKey);
      onUploadSuccess(summaryData);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploadingTitle(null);
    }
  };

  const handleWebsite = async (formData: FormData) => {
    const websiteUrl = formData.get("website");
    const titleKey =
      typeof websiteUrl === "string" ? websiteUrl : `Website ${Date.now()}`;

    upsertTitle(titleKey);
    setUploadingTitle(titleKey);

    try {
      const response = await uploadWebsite(formData).unwrap();
      const summaryData: SummaryData = {
        name: response.collectionName,
        summary: response.summary,
      };
      saveSummaryFor(titleKey, summaryData);
      setSelectedTitle(titleKey);
      onUploadSuccess(summaryData);
    } catch (error) {
      console.error("Error uploading website:", error);
    } finally {
      setUploadingTitle(null);
    }
  };

  const handleCopiedText = async (formData: FormData) => {
    const collectionName = formData.get("collectionName") as string;
    const titleKey = collectionName ;

    upsertTitle(titleKey);
    setUploadingTitle(titleKey);

    try {
      const response = await uploadText(formData).unwrap();
      const summaryData: SummaryData = {
        name: response.collectionName,
        summary: response.summary,
      };
      saveSummaryFor(titleKey, summaryData);
      setSelectedTitle(titleKey);
      onUploadSuccess(summaryData);
    } catch (error) {
      console.error("Error uploading text:", error);
    } finally {
      setUploadingTitle(null);
    }
  };

  const handleYoutubeText = async (formData: FormData) => {
    const youtubeUrl = formData.get("youtube");
    const titleKey =
      typeof youtubeUrl === "string" ? youtubeUrl : `YouTube ${Date.now()}`;

    upsertTitle(titleKey);
    setUploadingTitle(titleKey);

    try {
      const response = await uploadYoutube(formData).unwrap();
      const summaryData: SummaryData = {
        name: response.collectionName,
        summary: response.summary,
      };
      saveSummaryFor(titleKey, summaryData);
      setSelectedTitle(titleKey);
      onUploadSuccess(summaryData);
    } catch (error) {
      console.error("Error uploading website:", error);
    } finally {
      setUploadingTitle(null);
    }
  };

  // Click title -> load its own summary
  const handleTitleClick = (title: string) => {
    setSelectedTitle(title);
    const map = getSummaryMap();
    const data = map[title];
    if (data) onUploadSuccess(data);
  };

  const deleteSummaryFor = (titleKey: string) => {
    const map = getSummaryMap();
    delete map[titleKey];
    localStorage.setItem(STORAGE_SUMMARIES, JSON.stringify(map));
  };

  const handleDelete = (title: string) => {
    setTitles((prev) => prev.filter((t) => t !== title));
    deleteSummaryFor(title);
    if (selectedTitle === title) {
      setSelectedTitle(null);
    }
    onUploadSuccess({
      name: "",
      summary: "",
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-neutral-800">
        <p className="text-lg font-semibold">Sources</p>
      </div>

      <div className="p-1.5">
        {titles.map((title, index) => (
          <div
            key={index}
            onClick={() => handleTitleClick(title)}
            className={`flex items-center gap-2 border rounded-lg p-3 mb-3 mt-1 cursor-pointer transition
            ${
              selectedTitle === title
                ? "bg-blue-700/70 text-white"
                : "bg-neutral-900 text-neutral-100"
            }`}
          >
            {uploadingTitle === title ? (
              <ClipLoader size={20} color="white" />
            ) : selectedTitle === title ? (
              <CheckCircle2 size={20} />
            ) : (
              <ClipLoader size={20} color="white" />
            )}
            <div className="flex justify-between w-full">
              <span className="truncate">{title}</span>
              <Trash
                size={20}
                className="text-neutral-200 hover:text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent title click when deleting
                  handleDelete(title);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {titles.length === 0 ? (
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

export default InputBox;
