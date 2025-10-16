"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  onFileSelect?: (file: File | null) => void; // New prop for deferred upload
  deferUpload?: boolean; // If true, don't upload immediately
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  placeholder,
  onFileSelect,
  deferUpload = false,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when value prop changes
  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // If deferUpload is true, just store the file and notify parent
    if (deferUpload && onFileSelect) {
      setPendingFile(file);
      onFileSelect(file);
      return;
    }

    // Otherwise, upload immediately (old behavior)
    try {
      setUploading(true);

      // Upload to server
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // If there was an old image, delete it (optional - you can implement deletion API)
        if (value && value.startsWith("/uploads/")) {
          // Optional: Call delete API for old image
          console.log("Old image would be deleted:", value);
        }

        // Update with new image URL
        onChange(data.data.url);
        setPreview(data.data.url);
        alert("Image uploaded successfully!");
      } else {
        alert(data.error || "Failed to upload image");
        setPreview(value); // Revert preview
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
      setPreview(value); // Revert preview
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    if (confirm("Remove this image?")) {
      onChange("");
      setPreview("");
      setPendingFile(null);
      if (onFileSelect) {
        onFileSelect(null);
      }
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {/* Preview */}
      {preview ? (
        <div className="relative group">
          <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
            <img
              src={preview}
              alt={label}
              className="w-full h-full object-cover"
              onError={() => setPreview("")}
            />
          </div>

          {/* Overlay buttons on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-[1] transition-opacity rounded-lg flex items-center justify-center space-x-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium disabled:opacity-[0.5]"
            >
              Change
            </button>
            <button
              onClick={handleRemove}
              disabled={uploading}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-[0.5]"
            >
              Remove
            </button>
          </div>

          {/* Uploading overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-white text-sm">Uploading...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Upload Area */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer flex flex-col items-center justify-center"
        >
          {uploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-green mx-auto mb-2"></div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Uploading...
              </p>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                Click to upload image
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* URL Input (alternative) */}
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <input
            type="url"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setPreview(e.target.value);
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
            placeholder={placeholder || "Or paste image URL..."}
          />
        </div>
        {value && (
          <button
            onClick={handleRemove}
            className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            title="Clear"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// Helper function to upload a file - can be used by parent components
export async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/media/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (data.success) {
    return data.data.url;
  } else {
    throw new Error(data.error || "Failed to upload image");
  }
}
