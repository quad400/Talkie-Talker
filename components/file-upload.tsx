import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { FileCheck2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-40 w-52">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-xl h-full w-full"
        />
        <button
          onClick={() => onChange("")}
          type="button"
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4 " />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="w-full relative">
        <div className="bg-indigo-200 px-5 py-4 h-full w-full rounded-xl flex items-center justify-center">
          <FileCheck2 className="h-10 w-10 text-indigo-600" />
          <Link target="_blank" href={value} className="text-indigo-600 text-sm font-semibold">{value}</Link>
        </div>

        <button
          onClick={() => onChange("")}
          type="button"
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4 " />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default FileUpload;
