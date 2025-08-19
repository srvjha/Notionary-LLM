"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { FileCheck, PlusCircle, SquarePen } from "lucide-react";
import UploadSourcesModal from "./UploadSourceModal";
import { useUploadPdfMutation, useUploadTextMutation, useUploadWebsiteMutation } from "@/services/pdfApi";
import { ClipLoader } from "react-spinners";

const InputBox = ({
  onUploadSuccess,
}: {
  onUploadSuccess: (pdf: { name: string; summary: string }) => void;
}) => {
  const [uploadPdf, { isLoading:isLoadingPdf }] = useUploadPdfMutation();
  const [uploadWebsite, { isLoading: isLoadingWebsite }] = useUploadWebsiteMutation();
  const [uploadText, { isLoading: isLoadingText }] = useUploadTextMutation();
  const isLoading = isLoadingPdf || isLoadingWebsite || isLoadingText;

  const [titles, setTitles] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleFilesSelected = async (formData: FormData) => {
    const pdfFile = formData.get("pdf");

    if (pdfFile instanceof File) {
      setTitles((prev) => [...prev, pdfFile.name]); // push filename into array
    }
    try {
      const response = await uploadPdf(formData).unwrap();
      onUploadSuccess({
        name: response.collectionName,
        summary: response.summary,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleWebsite = async (formData: FormData) => {
    const websiteUrl = formData.get("website");
    if (typeof websiteUrl === "string") {
      setTitles((prev) => [...prev, websiteUrl]);
    }
    try {
      const response = await uploadWebsite(formData).unwrap();
      onUploadSuccess({
        name: response.collectionName,
        summary: response.summary,
      });
    } catch (error) {
      console.error("Error uploading website:", error);
    }
  };

  const handleCopiedText = async (formData: FormData) => {
    const copiedText = formData.get("copiedText");
    if (typeof copiedText === "string") {
      setTitles((prev) => [...prev, copiedText]);
    }
    try {
      const response = await uploadText(formData).unwrap();
      onUploadSuccess({
        name: response.collectionName,
        summary: response.summary,
      });
    } catch (error) {
      console.error("Error uploading text:", error);
    }
  };

  console.log({ titles });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-neutral-800">
        <p className="text-lg font-semibold">Sources</p>
      </div>

      <div className="p-1.5">
        {titles.map((title, index) => (
          <p
            className="flex flex-row items-center mb-3 mt-1 gap-2 border rounded-lg p-3 bg-neutral-900"
            key={index}
          >
            {isLoading ? (
              <ClipLoader size={20} color="white" />
            ) : (
              title && <SquarePen size={20} color="white" />
            )}
            {title}
          </p>
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
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    </div>
  );
};

export default InputBox;
