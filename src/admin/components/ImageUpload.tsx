import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
    value?: string;
    onChange: (value: string) => void;
    className?: string;
}

export const ImageUpload = ({ value, onChange, className = "" }: ImageUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        // Check size (limit to 2MB for local storage sanity)
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image must be smaller than 2MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            onChange(base64String);
            toast.success("Image uploaded locally");
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <div
                className={`
                    relative border-2 border-dashed rounded-lg p-6 transition-colors
                    flex flex-col items-center justify-center gap-2 cursor-pointer
                    min-h-[200px]
                    ${isDragging ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"}
                `}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />

                {value ? (
                    <div className="relative w-full h-full min-h-[160px] flex items-center justify-center">
                        <img
                            src={value}
                            alt="Upload preview"
                            className="max-h-[200px] rounded-md object-contain"
                        />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-0 right-0 h-6 w-6 -mt-2 -mr-2 shadow-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange("");
                            }}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="p-4 rounded-full bg-secondary">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-foreground">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                SVG, PNG, JPG or GIF (max 2MB)
                            </p>
                        </div>
                    </>
                )}
            </div>

            <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground uppercase">Or use URL</span>
                <div className="h-px flex-1 bg-border" />
            </div>

            <div className="flex gap-2">
                <div className="relative flex-1">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>
        </div>
    );
};
