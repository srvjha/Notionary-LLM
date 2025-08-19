import { useState, useEffect } from "react";

export const usePdfData = () => {
  const [pdfData, setPdfData] = useState<{ name: string; summary: string } | null>(null);

  // Load initial value from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("pdfData");
    if (stored) {
      setPdfData(JSON.parse(stored));
    }
  }, []);

  // Function to update both state + localStorage
  const updatePdfData = (data: { name: string; summary: string }) => {
    setPdfData(data);
    localStorage.setItem("pdfData", JSON.stringify(data));
  };

  return { pdfData, updatePdfData };
};
