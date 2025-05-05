import { Upload, X, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useContentStore } from "@/store/contentstore";

export function FileUpload() {
  const { file, setFile } = useContentStore();
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const fileType = droppedFile.type;
      
      // Check file type
      if (
        fileType === 'application/pdf' || 
        fileType === 'application/msword' || 
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        setFile(droppedFile);
      }
    }
  };
  
  const removeFile = () => {
    setFile(null);
  };
  
  const fileInputId = "file-upload";
  
  return (
    <div className="w-full">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          
          <h3 className="text-lg font-medium mb-2">
            Upload your document
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your file here, or click to browse
          </p>
          
          <p className="text-xs text-muted-foreground mb-4">
            Supported formats: PDF, DOC, DOCX
          </p>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById(fileInputId)?.click()}
          >
            Browse files
          </Button>
          
          <input
            id={fileInputId}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-8 w-8 mr-3 text-primary" />
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={removeFile}
            className="text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}