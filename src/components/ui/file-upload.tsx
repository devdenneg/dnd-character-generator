import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { uploadApi } from "@/api/client";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, X, Image as ImageIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onUploadComplete?: (url: string, file: File) => void;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
}

interface UploadProgress {
  file: File;
  progress: number;
  status: "uploading" | "success" | "error";
  url?: string;
  error?: string;
}

export function FileUpload({
  onUploadComplete,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  className = "",
}: FileUploadProps) {
  const { isAuthenticated } = useAuth();
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    // Check file size
    if (file.size > maxSize) {
      setUploads((prev) => [
        ...prev,
        {
          file,
          progress: 0,
          status: "error",
          error: `File size exceeds ${maxSize / 1024 / 1024}MB limit`,
        },
      ]);
      return;
    }

    setUploads((prev) => [
      ...prev,
      { file, progress: 0, status: "uploading" },
    ]);

    try {
      const response = await uploadApi.upload(file);

      if (response.success) {
        setUploads((prev) =>
          prev.map((u) =>
            u.file === file
              ? { ...u, progress: 100, status: "success", url: response.data.url }
              : u
          )
        );

        if (onUploadComplete) {
          onUploadComplete(response.data.url, file);
        }
      } else {
        throw new Error(response.error || "Upload failed");
      }
    } catch (error: any) {
      setUploads((prev) =>
        prev.map((u) =>
          u.file === file
            ? {
                ...u,
                progress: 0,
                status: "error",
                error: error.response?.data?.error || error.message || "Upload failed",
              }
            : u
        )
      );
    }
  }, [maxSize, onUploadComplete]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => uploadFile(file));
  }, [uploadFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxSize,
    disabled: !isAuthenticated,
    multiple: true,
  });

  const handleClick = () => {
    if (!isAuthenticated) return;
    inputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => uploadFile(file));
    }
  };

  const removeUpload = (index: number) => {
    setUploads((prev) => prev.filter((_, i) => i !== index));
  };

  if (!isAuthenticated) {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5 ${className}`}>
        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
        <p className="text-sm text-amber-700 dark:text-amber-300">
          Необходимо войти для загрузки файлов
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileSelect}
        disabled={!isAuthenticated}
      />

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
          }
          ${!isAuthenticated ? "opacity-50 cursor-not-allowed" : ""}
        `}
        onClick={handleClick}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">
              {isDragActive ? "Перетащите файлы сюда" : "Перетащите или нажмите для загрузки"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, GIF, WebP до {maxSize / 1024 / 1024}MB
            </p>
          </div>
        </div>
      </div>

      {uploads.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploads.map((upload, index) => (
            <div
              key={`${upload.file.name}-${index}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border"
            >
              <div className="h-10 w-10 rounded bg-background flex items-center justify-center flex-shrink-0">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium truncate">{upload.file.name}</p>
                  {upload.status === "success" && (
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  )}
                  {upload.status === "error" && (
                    <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  )}
                </div>

                {upload.status === "uploading" && (
                  <Progress value={upload.progress} className="h-1" />
                )}

                {upload.status === "error" && (
                  <p className="text-xs text-destructive">{upload.error}</p>
                )}

                {upload.status === "success" && upload.url && (
                  <p className="text-xs text-muted-foreground truncate">
                    {upload.url}
                  </p>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeUpload(index)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
