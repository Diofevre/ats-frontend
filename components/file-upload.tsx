/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useCallback, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { validateFile, ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPES } from '@/lib/file-upload';

interface FileUploadProps {
  onUpload: (fileUrl: string) => void;
  accept?: 'image' | 'pdf' | 'both';
  className?: string;
}

export function FileUpload({ onUpload, accept = 'both', className = '' }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const acceptedTypes = {
    image: ACCEPTED_IMAGE_TYPES,
    pdf: ACCEPTED_PDF_TYPES,
    both: [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_PDF_TYPES],
  }[accept];

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (!validateFile(selectedFile, acceptedTypes)) {
      return;
    }

    setFile(selectedFile);

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }, [acceptedTypes]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const response = await fetch('/api/s3-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur s'est produite");
      }

      toast.success('Fichier téléchargé avec succès');
      onUpload(data.fileUrl);
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error("Erreur lors du téléchargement du fichier");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 transition-colors hover:border-gray-400"
      >
        {file ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium text-gray-900">{file.name}</div>
                <div className="text-xs text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {preview && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full h-9 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Téléchargement...
                </>
              ) : (
                'Télécharger'
              )}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
              <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                <span>Télécharger un fichier</span>
                <input
                  type="file"
                  className="sr-only"
                  accept={acceptedTypes.join(',')}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileSelect(file);
                    }
                  }}
                />
              </label>
            </div>
            <p className="text-xs leading-5 text-gray-600 mt-2">
              {accept === 'image' ? 'PNG, JPG, WEBP' : accept === 'pdf' ? 'PDF' : 'PNG, JPG, WEBP, PDF'} jusqu&apos;à 5MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}