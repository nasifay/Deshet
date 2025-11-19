import { PendingImage } from "~/app/admin/components/DeferredImageArrayUploadField";

/**
 * Upload a single file to the server
 */
export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/media/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to upload file");
  }

  return data.data.url;
}

/**
 * Process an array of pending images and upload files
 * Returns array of final URLs
 */
export async function processImageArray(
  images: PendingImage[],
  onProgress?: (current: number, total: number) => void
): Promise<string[]> {
  const urls: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    if (onProgress) {
      onProgress(i + 1, images.length);
    }

    if (image.type === "file" && image.file) {
      // Upload the file
      const url = await uploadFile(image.file);
      urls.push(url);
    } else if (image.type === "url" && image.url) {
      // Use the URL directly
      urls.push(image.url);
    } else if (image.type === "existing" && image.url) {
      // Keep existing URL
      urls.push(image.url);
    }
  }

  return urls;
}

/**
 * Process a single pending image
 * Returns final URL or empty string
 */
export async function processSingleImage(
  image: PendingImage | null
): Promise<string> {
  if (!image) return "";

  if (image.type === "file" && image.file) {
    return await uploadFile(image.file);
  } else if ((image.type === "url" || image.type === "existing") && image.url) {
    return image.url;
  }

  return "";
}

/**
 * Convert existing URL strings to PendingImage objects
 */
export function urlsToPendingImages(urls: string[]): PendingImage[] {
  return urls.map((url, index) => ({
    id: `existing-${index}-${Date.now()}`,
    url,
    preview: url,
    type: "existing" as const,
  }));
}

/**
 * Convert a single URL to PendingImage object
 */
export function urlToPendingImage(url: string): PendingImage | null {
  if (!url) return null;

  return {
    id: `existing-${Date.now()}`,
    url,
    preview: url,
    type: "existing",
  };
}
