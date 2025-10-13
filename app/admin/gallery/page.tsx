'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  Upload, 
  Search, 
  Filter, 
  Trash2, 
  Download, 
  Copy, 
  Image as ImageIcon, 
  Plus, 
  Edit, 
  Folder, 
  FolderOpen,
  Grid3X3,
  List,
  Eye,
  MoreVertical,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

interface GalleryCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon: string;
  order: number;
  isActive: boolean;
  featuredImage?: string;
  hasBackground?: boolean;
  backgroundImage?: string;
  gap?: string;
  createdAt: string;
  updatedAt: string;
}

interface GalleryItem {
  _id: string;
  filename: string;
  originalName: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'other';
  mimeType: string;
  size: number;
  alt?: string;
  caption?: string;
  customClass?: string;
  category: GalleryCategory;
  uploadedBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

type ViewMode = 'grid' | 'list';

export default function GalleryPage() {
  // State management
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Load data when category filter changes
  useEffect(() => {
    loadGallery();
  }, [selectedCategory, searchTerm]);

  const loadData = async () => {
    await Promise.all([loadCategories(), loadGallery()]);
  };

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/admin/gallery/categories', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadGallery = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: '1',
        limit: '100', // Load more items for better UX
      });

      if (selectedCategory) {
        params.append('category', selectedCategory._id);
      }

      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }

      const response = await fetch(`/api/admin/gallery?${params}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (data.success) {
        setGallery(data.data);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  // Upload functionality
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (!selectedCategory) {
      alert('Please select a category first');
      return;
    }

    setUploading(true);
    const uploadPromises = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        formData.append('category', selectedCategory._id);

        uploadPromises.push(
          fetch('/api/admin/gallery/upload', {
            method: 'POST',
            credentials: 'include',
            body: formData,
          })
        );
      }

      const responses = await Promise.all(uploadPromises);
      const results = await Promise.all(responses.map(r => r.json()));

      const failed = results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error('Some uploads failed:', failed);
      }

      // Reload gallery
      await loadGallery();
      alert(`Successfully uploaded ${files.length} files!`);
      setShowUploadModal(false);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  // Delete functionality
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (data.success) {
        await loadGallery();
      } else {
        alert(data.error || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) return;

    try {
      const deletePromises = selectedItems.map(id =>
        fetch(`/api/admin/gallery/${id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        })
      );

      await Promise.all(deletePromises);
      setSelectedItems([]);
      await loadGallery();
    } catch (error) {
      console.error('Error bulk deleting:', error);
      alert('Failed to delete items');
    }
  };

  // Utility functions
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const getFileIcon = (type: string) => {
    if (type === 'image') return '🖼️';
    if (type === 'video') return '🎥';
    if (type === 'document') return '📄';
    return '📎';
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === gallery.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(gallery.map(item => item._id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
            <p className="text-gray-600 mt-1">Manage your gallery images and categories</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCategoryModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              disabled={!selectedCategory}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Files</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Folder className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Category:</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    !selectedCategory
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                      selectedCategory?._id === category._id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span style={{ color: selectedCategory?._id === category._id ? 'white' : category.color }}>
                      {category.icon}
                    </span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search and View Controls */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                  </span>
                  <button
                    onClick={selectAllItems}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {selectedItems.length === gallery.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Selected</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category Selection Warning */}
        {!selectedCategory && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800">
                Select a category to upload files or view category-specific images.
              </span>
            </div>
          </div>
        )}

        {/* Gallery Content */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        ) : gallery.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedCategory ? `No images in ${selectedCategory.name}` : 'No gallery items found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {selectedCategory 
                ? `Upload your first images to the ${selectedCategory.name} category.`
                : 'Select a category or upload some images to get started.'
              }
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              disabled={!selectedCategory}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Images</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Gallery Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedCategory ? `${selectedCategory.name} Gallery` : 'All Gallery Items'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {gallery.length} item{gallery.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={selectAllItems}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {selectedItems.length === gallery.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery Grid/List */}
            <div className="p-6">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {gallery.map((item) => (
                    <div
                      key={item._id}
                      className={`group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                        selectedItems.includes(item._id) ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => toggleItemSelection(item._id)}
                    >
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2 z-10">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedItems.includes(item._id)
                            ? 'bg-blue-600 border-blue-600'
                            : 'bg-white border-gray-300 group-hover:border-gray-400'
                        }`}>
                          {selectedItems.includes(item._id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>

                      {/* Image Preview */}
                      <div className="aspect-square bg-gray-200 flex items-center justify-center">
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={item.alt || item.originalName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl">{getFileIcon(item.type)}</span>
                        )}
                      </div>

                      {/* Item Info */}
                      <div className="p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span 
                            style={{ color: item.category.color }} 
                            className="text-xs"
                          >
                            {item.category.icon}
                          </span>
                          <span className="text-xs text-gray-500 truncate">
                            {item.category.name}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.originalName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(item.size)}
                        </p>
                      </div>

                      {/* Actions Menu */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="relative">
                          <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {/* Actions dropdown would go here */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {gallery.map((item) => (
                    <div
                      key={item._id}
                      className={`flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                        selectedItems.includes(item._id) ? 'bg-blue-50 ring-1 ring-blue-200' : ''
                      }`}
                      onClick={() => toggleItemSelection(item._id)}
                    >
                      {/* Selection Checkbox */}
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedItems.includes(item._id)
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        {selectedItems.includes(item._id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>

                      {/* Thumbnail */}
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={item.alt || item.originalName}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <span className="text-lg">{getFileIcon(item.type)}</span>
                        )}
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.originalName}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span 
                            style={{ color: item.category.color }}
                          >
                            {item.category.icon}
                          </span>
                          <span>{item.category.name}</span>
                          <span>•</span>
                          <span>{formatFileSize(item.size)}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(item.url);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <a
                          href={item.url}
                          download
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item._id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleFileUpload}
          selectedCategory={selectedCategory}
          uploading={uploading}
          dragOver={dragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          fileInputRef={fileInputRef}
          dropZoneRef={dropZoneRef}
        />
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <CategoryModal
          isOpen={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          onSuccess={loadCategories}
        />
      )}
    </div>
  );
}

// Upload Modal Component
function UploadModal({ 
  isOpen, 
  onClose, 
  onUpload, 
  selectedCategory, 
  uploading, 
  dragOver, 
  onDragOver, 
  onDragLeave, 
  onDrop, 
  fileInputRef,
  dropZoneRef
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: FileList | null) => void;
  selectedCategory: GalleryCategory | null;
  uploading: boolean;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  dropZoneRef: React.RefObject<HTMLDivElement>;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upload Files</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!selectedCategory ? (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Select a Category First</h4>
            <p className="text-gray-600">Please select a category from the main page before uploading files.</p>
          </div>
        ) : (
          <div>
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Uploading to: <span className="font-medium">{selectedCategory.name}</span>
              </p>
            </div>

            <div
              ref={dropZoneRef}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Drop files here or click to browse
              </h4>
              <p className="text-gray-600 mb-4">
                Supports images, videos, and documents
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Choose Files'}
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,.pdf"
              onChange={(e) => onUpload(e.target.files)}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Category Modal Component
function CategoryModal({ 
  isOpen, 
  onClose, 
  onSuccess 
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#128341');
  const [icon, setIcon] = useState('🖼️');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/gallery/categories', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description, color, icon }),
      });

      const data = await response.json();
      if (data.success) {
        onSuccess();
        onClose();
        // Reset form
        setName('');
        setDescription('');
        setColor('#128341');
        setIcon('🖼️');
      } else {
        alert(data.error || 'Failed to create category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Create New Category</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Events, Training, Recognition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Optional description for this category"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="🖼️"
                maxLength={2}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}