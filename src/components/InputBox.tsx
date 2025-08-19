"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { FileCheck, PlusCircle, SquarePen } from "lucide-react";
import UploadSourcesModal from "./UploadSourceModal";
import { useUploadPdfMutation } from "@/services/pdfApi";
import { ClipLoader } from "react-spinners";

const InputBox = ({
  onUploadSuccess,
}: {
  onUploadSuccess: (pdf: { name: string; summary: string }) => void;
}) => {
  const [uploadPdf, { isLoading }] = useUploadPdfMutation();
  const [pdfDetails, setPdfDetails] = useState<FormDataEntryValue | null>(null);
  const [open, setOpen] = useState(false);

  const handleFilesSelected = async (formData: FormData) => {
    const pdfFile = formData.get("pdf");
    setPdfDetails(pdfFile);
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

  const pdfName = pdfDetails instanceof File ? pdfDetails.name : "";

  const handleWebsite = () => {
    console.log("Website clicked");
    // TODO: open website input flow
  };

  const handleCopiedText = () => {
    console.log("Copied text clicked");
    // TODO: open pasted text flow
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-neutral-800">
        <p className="text-lg font-semibold">Sources</p>
      </div>

      {pdfName ? (
        <p className="flex flex-row items-center gap-2 p-2 bg-neutral-900">
          {isLoading ? (
            <ClipLoader size={20} color="white" />
          ) : (
            pdfName && <SquarePen size={20} color="white" />
          )}
          {pdfName}
        </p>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
          <FileCheck size={50} />
          <p className="text-sm text-neutral-400 max-w-xs">
            Click below to add PDFs, websites or directly import a file.
          </p>
        </div>
      )}

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
