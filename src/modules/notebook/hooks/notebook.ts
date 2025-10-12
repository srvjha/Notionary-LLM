import { useMutation } from "@tanstack/react-query";
import {
  handlePdfIndexing,
  handleTextIndexing,
  handleWebsiteIndexing,
  handleYoutubeIndexing,
} from "../actions/indexing";


export function usePdfIndexing() {
  return useMutation({
    mutationFn: (formData: FormData) => handlePdfIndexing(formData),
  });
}

export function useWebsiteIndexing() {
  return useMutation({
    mutationFn: (formData: FormData) => handleWebsiteIndexing(formData),
  });
}

export function useYoutubeIndexing() {
  return useMutation({
    mutationFn: (formData: FormData) => handleYoutubeIndexing(formData),
  });
}

export function useTextIndexing() {
  return useMutation({
    mutationFn: (formData: FormData) => handleTextIndexing(formData),
  });
}

