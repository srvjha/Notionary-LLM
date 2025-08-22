
interface UploadFormData extends FormData {
  get(key: "pdf"): File | null;
  get(key: "website"): string | null;
  get(key: "copiedText"): string | null;
  get(key: "youtube"): string | null;
}

interface UploadSourcesModalProps {
  trigger: React.ReactNode;
  onFilesSelected?: (formdata: UploadFormData) => void;
  onWebsiteClick?: (formdata: UploadFormData) => void;
  onCopiedTextClick?: (formdata: UploadFormData) => void;
  onYoutubeClick?: (formdata: UploadFormData) => void;
  accept?: string;
  multiple?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
export type { UploadFormData, UploadSourcesModalProps };