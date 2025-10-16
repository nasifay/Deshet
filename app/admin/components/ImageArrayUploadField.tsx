"use client";

import { useState, useRef } from "react";
import { Upload, X, Plus, GripVertical } from "lucide-react";

interface ImageArrayUploadFieldProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  onReorder?: (urls: string[]) => void; // Callback when reordering happens
  placeholder?: string;
  description?: string;
}

export default function ImageArrayUploadField({
  label,
  value,
  onChange,
  onReorder,
  placeholder,
  description,
}: ImageArrayUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [reordering, setReordering] = useState(false);
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
        // Add new image URL to array
        onChange([...value, data.data.url]);
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      onChange([...value, urlInput.trim()]);
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  const handleRemove = (index: number) => {
    if (confirm("Remove this image?")) {
      const newValue = [...value];
      newValue.splice(index, 1);
      onChange(newValue);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const newValue = [...value];
    [newValue[index - 1], newValue[index]] = [
      newValue[index],
      newValue[index - 1],
    ];
    onChange(newValue);

    // Auto-save if onReorder callback is provided
    if (onReorder) {
      setReordering(true);
      try {
        await onReorder(newValue);
      } catch (error) {
        console.error("Error saving order:", error);
      } finally {
        setReordering(false);
      }
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === value.length - 1) return;
    const newValue = [...value];
    [newValue[index], newValue[index + 1]] = [
      newValue[index + 1],
      newValue[index],
    ];
    onChange(newValue);

    // Auto-save if onReorder callback is provided
    if (onReorder) {
      setReordering(true);
      try {
        await onReorder(newValue);
      } catch (error) {
        console.error("Error saving order:", error);
      } finally {
        setReordering(false);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
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
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center space-x-1 px-3 py-1.5 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload</span>
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add URL</span>
          </button>
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
            placeholder={placeholder || "Enter image URL..."}
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

      {/* Uploading indicator */}
      {uploading && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Uploading image...
            </p>
          </div>
        </div>
      )}

      {/* Reordering/Saving indicator */}
      {reordering && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
            <p className="text-green-800 dark:text-green-200 text-sm">
              Saving order...
            </p>
          </div>
        </div>
      )}

      {/* Image List */}
      {value.length > 0 ? (
        <div className="space-y-2">
          {value.map((url, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg group hover:border-primary-green dark:hover:border-primary-green transition-colors"
            >
              {/* Drag Handle */}
              <div className="flex flex-col space-y-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <GripVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preview */}
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 flex-shrink-0 bg-gray-50 dark:bg-gray-700">
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EError%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              {/* URL Display */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-primary-green rounded-full flex-shrink-0">
                    {index + 1}
                  </span>
                  <p
                    className="text-sm text-gray-700 dark:text-gray-300 truncate"
                    title={url}
                  >
                    {url}
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-8">
                  Order: {index + 1} of {value.length}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 text-gray-600 hover:text-primary-green dark:text-gray-400 dark:hover:text-primary-green disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === value.length - 1}
                  className="p-1.5 text-gray-600 hover:text-primary-green dark:text-gray-400 dark:hover:text-primary-green disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
            No images added yet
          </p>
          <div className="flex items-center justify-center space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Add URL</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
