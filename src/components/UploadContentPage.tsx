import { FileUpload } from "@/components/ui/file-upload";
import { useAuth } from "@/contexts/AuthContext";
import { Copy, Check, Home, Upload as UploadIcon, Image as ImageIcon, Trash2 } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { uploadApi } from "@/api/client";

interface UploadedFile {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  uploadedAt: Date;
}

export function UploadContentPage({ onBack }: { onBack: () => void }) {
  const { isAuthenticated } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleUploadComplete = useCallback((url: string, file: File) => {
    // Extract filename from URL
    const filename = url.split("/").pop() || "";
    const newFile: UploadedFile = {
      url,
      filename,
      originalName: file.name,
      size: file.size,
      mimetype: file.type,
      uploadedAt: new Date(),
    };
    setUploadedFiles((prev) => [newFile, ...prev]);
  }, []);

  const handleCopyUrl = useCallback((url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  }, []);

  const handleDelete = useCallback(async (filename: string) => {
    setDeleting(filename);
    try {
      await uploadApi.delete(filename);
      setUploadedFiles((prev) => prev.filter((f) => f.filename !== filename));
    } catch (error) {
      console.error("Failed to delete file:", error);
    } finally {
      setDeleting(null);
    }
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
            <UploadIcon className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Требуется авторизация</h2>
          <p className="text-muted-foreground mb-6">
            Войдите в аккаунт для загрузки файлов
          </p>
          <Button onClick={onBack}>На главную</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gradient" style={{ fontFamily: "var(--font-display)" }}>
                Загрузка контента
              </h1>
              <p className="text-sm text-muted-foreground">
                Управление файлами для игры
              </p>
            </div>
            <Button variant="outline" onClick={onBack} className="gap-2">
              <Home className="w-4 h-4" />
              На главную
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Upload Section */}
        <div className="animate-fade-in-up">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Загрузить файлы</h2>
            <p className="text-sm text-muted-foreground">
              Загружайте изображения для использования в игре (PNG, JPG, GIF, WebP до 5MB)
            </p>
          </div>

          <Card className="p-6">
            <FileUpload onUploadComplete={handleUploadComplete} />
          </Card>
        </div>

        {/* Uploaded Files Section */}
        {uploadedFiles.length > 0 && (
          <div className="animate-fade-in-up">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-1">Загруженные файлы</h2>
                <p className="text-sm text-muted-foreground">
                  {uploadedFiles.length} {uploadedFiles.length === 1 ? "файл" : "файлов"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <Card key={file.filename} className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={file.url}
                        alt={file.originalName}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "";
                          e.currentTarget.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
                        }}
                      />
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.originalName}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)} • {file.uploadedAt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>

                      {/* URL with Copy */}
                      <div className="flex items-center gap-2 mt-2">
                        <code className="flex-1 text-xs bg-muted px-2 py-1 rounded truncate">
                          {file.url}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyUrl(file.url)}
                          className="flex-shrink-0"
                        >
                          {copiedUrl === file.url ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(file.filename)}
                          disabled={deleting === file.filename}
                          className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {uploadedFiles.length === 0 && (
          <div className="animate-fade-in-up">
            <Card className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Нет загруженных файлов</h3>
              <p className="text-sm text-muted-foreground">
                Загрузите изображения выше, чтобы увидеть их здесь
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
