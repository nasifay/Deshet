"use client";

import { useState, useRef } from "react";
import { Upload, X, Clock } from "lucide-react";

export interface PendingImage {
  id: string;
  file?: File;
  url?: string;
  preview: string;
  type: "file" | "url" | "existing";
}

interface DeferredImageUploadFieldProps {
  label: string;
  value: PendingImage | null;
  onChange: (image: PendingImage | null) => void;
  description?: string;
}

export default function DeferredImageUploadField({
  label,
  value,
  onChange,
  description,
}: DeferredImageUploadFieldProps) {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    reader.onload = (e) => {
      const preview = e.target?.result as string;

      const newImage: PendingImage = {
        id: `pending-${Date.now()}`,
        file,
        preview,
        type: "file",
      };

      onChange(newImage);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      const newImage: PendingImage = {
        id: `url-${Date.now()}`,
        url: urlInput.trim(),
        preview: urlInput.trim(),
        type: "url",
      };
      onChange(newImage);
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  const handleRemove = () => {
    if (confirm("Remove this image?")) {
      onChange(null);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-700 dark:text-blue-400">
            Image will be uploaded to the server when you click the Save button.
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* URL Input (when shown) */}
      {showUrlInput && (
        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
            placeholder="Enter image URL..."
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowUrlInput(false);
              setUrlInput("");
            }}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Image Preview or Upload Area */}
      {value ? (
        <div className="space-y-3">
          {/* Image Preview */}
          <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
            <img
              src={value.preview}
              alt="Preview"
              className="w-full h-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EError%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>

          {/* Image Info and Actions */}
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
            {/* Image Info */}
            <div className="flex-1 min-w-0 mr-4">
              {value.type === "file" ? (
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {value.file?.name || "Selected file"}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center space-x-1 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>Pending upload</span>
                  </p>
                </div>
              ) : (
                <p
                  className="text-sm text-gray-700 dark:text-gray-300 truncate"
                  title={value.url}
                >
                  {value.url}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 text-sm bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
                title="Change image"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                title="Remove"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Option to use URL instead */}
          {!showUrlInput && (
            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-green dark:hover:text-primary-green"
            >
              Or use URL instead
            </button>
          )}
        </div>
      ) : (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
            No image selected
          </p>
          <div className="flex items-center justify-center space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <Upload className="w-4 h-4" />
              <span>Select File</span>
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <span>Use URL</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
