import React, { useState } from 'react';
import api from '../../utils/api';

const BrochureUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(Date.now());

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
      setError('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file first.');
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await api.post('/brochure', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(response.data.message || 'Brochure PDF uploaded successfully!');
      setFile(null);
      document.getElementById('pdf-upload').value = '';
      
      // Force iframe to reload to show new PDF
      setRefreshKey(Date.now());
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error uploading brochure. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">Upload Company Brochure</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload a single PDF brochure. This file will be downloaded when users click the "Download" button on the home layout.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* Upload Form Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 lg:w-1/3 flex-shrink-0 h-fit">
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select PDF File (Max 50MB)
              </label>
              <input
                id="pdf-upload"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary-50 file:text-primary-700
                  hover:file:bg-primary-100
                  dark:file:bg-gray-700 dark:file:text-white dark:hover:file:bg-gray-600"
              />
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {message && <div className="text-green-600 text-sm mt-2">{message}</div>}

            <div className="mt-4">
              <button
                type="submit"
                disabled={loading || !file}
                className="w-full px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Uploading...' : 'Upload Brochure'}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-0 flex-1 flex flex-col min-h-[500px] overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200">Current PDF Preview</h2>
            <a 
              href="/api/brochure/download" 
              download
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              Test Download
            </a>
          </div>
          <iframe
            key={refreshKey}
            src={`/api/brochure/preview?t=${refreshKey}`}
            className="w-full h-full flex-1 border-none"
            title="PDF Preview"
          />
        </div>
      </div>
    </div>
  );
};

export default BrochureUpload;
