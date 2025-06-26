import { useRef, useState } from 'react';
import axiosInstance from '../../../../../service/axiosInstance';

export default function AvatarUploadForm() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const empid = localStorage.getItem("employeeId");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      setMessage('Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    setSelectedFile(file);
    setMessage('Image selected. Click "Upload Avatar" to continue.');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      setMessage('Uploading...');

      const formData = new FormData();
      formData.append('user_Avatar', selectedFile);

      const response = await axiosInstance.post(
        `/registration/upload/avatar/${empid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage(response.data.success ? 'Upload successful!' : response.data.message || 'Upload failed.');
    } catch (error) {
      console.error(error);
      setMessage('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 h-full justify-center">
      <h3 className="text-lg font-semibold text-white">Profile Image</h3>

      <div
        className="w-40 h-40 rounded-full border-2 border-gray-500 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => fileInputRef.current.click()}
        title="Click to select"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition"
        >
          Select Image
        </button>

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
          className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {uploading ? 'Uploading...' : 'Upload Avatar'}
        </button>
      </div>

      {message && <p className="text-sm text-gray-300">{message}</p>}
    </div>
  );
}
