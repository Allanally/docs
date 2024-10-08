"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUpLoadProps {
    onChange: (Url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
    skipPolling?: boolean;
}

export const FileUpload = ({
    onChange,
    endpoint,
    skipPolling = false, 
}: FileUpLoadProps) => {
  return (
    <UploadDropzone 
    endpoint={endpoint} 
    onClientUploadComplete={(res) => {
      onChange(res?.[0].url);
    }}
    onUploadError={(error: Error) => {
      toast.error(error?.message);
    }} 
    skipPolling={skipPolling} 
    />
  );
};
