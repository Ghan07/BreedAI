import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

const DropZone = ({ file, setFile }) => {
  const onDrop = useCallback((accepted) => {
    if (accepted.length) setFile(accepted[0]);
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  if (file) {
    return (
      <div className="relative card">
        <button onClick={() => setFile(null)} className="absolute top-2 right-2 p-1.5 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 rounded-full transition-colors z-10">
          <X className="w-4 h-4 text-red-600" />
        </button>
        <div className="flex flex-col items-center">
          <img src={URL.createObjectURL(file)} alt="Preview" className="max-h-64 rounded-lg object-contain mb-3" />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{file.name}</span>
            <span className="ml-2">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`card border-2 border-dashed cursor-pointer transition-all duration-200 ${
        isDragActive
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
          : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center py-8">
        <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
          {isDragActive ? <ImageIcon className="w-8 h-8 text-primary-600" /> : <Upload className="w-8 h-8 text-primary-600" />}
        </div>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
          {isDragActive ? 'Drop image here' : 'Drag & drop animal image'}
        </p>
        <p className="text-sm text-gray-500">or click to browse • JPEG, PNG, WebP up to 10MB</p>
        <p className="text-xs text-gray-400 mt-2">Best results with side-view images under field conditions</p>
      </div>
    </div>
  );
};

export default DropZone;
