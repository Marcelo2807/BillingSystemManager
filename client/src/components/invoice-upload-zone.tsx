import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface FileUpload {
  file: File;
  id: string;
  status: "pending" | "uploading" | "processing" | "success" | "error";
  progress: number;
  error?: string;
}

export function InvoiceUploadZone() {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: FileUpload[] = Array.from(fileList).map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: "pending" as const,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((upload) => {
      simulateUpload(upload.id);
    });
  };

  const simulateUpload = (id: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "uploading" as const } : f))
    );

    const interval = setInterval(() => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === id);
        if (!file || file.progress >= 100) {
          clearInterval(interval);
          return prev;
        }

        const newProgress = Math.min(file.progress + 10, 100);
        const newStatus = newProgress === 100 ? ("processing" as const) : ("uploading" as const);

        if (newProgress === 100) {
          setTimeout(() => {
            setFiles((p) =>
              p.map((f) =>
                f.id === id ? { ...f, status: "success" as const } : f
              )
            );
            toast({
              title: "Arquivo processado",
              description: "Dados extraídos com sucesso pela IA",
            });
          }, 1500);
        }

        return prev.map((f) =>
          f.id === id ? { ...f, progress: newProgress, status: newStatus } : f
        );
      });
    }, 300);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <Card
        className={cn(
          "border-2 border-dashed transition-colors",
          isDragging && "border-primary bg-primary/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Upload de Faturas</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Arraste arquivos aqui ou clique para selecionar
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF, PNG, JPG ou WEBP (máx. 5MB)
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.webp"
            className="hidden"
            id="file-upload"
            onChange={handleFileSelect}
            data-testid="input-file-upload"
          />
          <label htmlFor="file-upload">
            <Button className="mt-4" asChild>
              <span data-testid="button-select-files">Selecionar Arquivos</span>
            </Button>
          </label>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((upload) => (
            <Card key={upload.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{upload.file.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    {upload.status === "success" ? (
                      <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Processado com sucesso
                      </span>
                    ) : upload.status === "processing" ? (
                      <span className="text-xs text-primary flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Processando com IA...
                      </span>
                    ) : (
                      <>
                        <div className="h-1 flex-1 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${upload.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">
                          {upload.progress}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(upload.id)}
                  data-testid={`button-remove-${upload.id}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
