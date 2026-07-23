import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const MediaManager = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMediaPageActive, setIsMediaPageActive] = useState(false);
  const { user } = useAuth();

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const [mediaRes, settingsRes] = await Promise.all([
        api.get('/media'),
        api.get('/page-content/global')
      ]);
      setMediaFiles(mediaRes.data);
      setIsMediaPageActive(settingsRes.data.isMediaPageActive === 'true');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const { data } = await api.put(`/media/${id}/toggle-status`);
      alert(data.message);
      
      // Update local state
      setMediaFiles(mediaFiles.map(m => m._id === id ? { ...m, isActive: !currentStatus } : m));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to toggle status');
    }
  };

  const deleteMedia = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media file permanently?')) return;
    try {
      await api.delete(`/media/${id}`);
      alert('Media deleted successfully');
      setMediaFiles(mediaFiles.filter(m => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete media');
    }
  };

  const togglePageVisibility = async () => {
    try {
      const newValue = !isMediaPageActive;
      await api.post('/page-content/global', { isMediaPageActive: newValue.toString() });
      setIsMediaPageActive(newValue);
      alert(`Public Media Page is now ${newValue ? 'Enabled' : 'Disabled'}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update visibility');
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading media...</div>;
  }

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Media Access</h1>
          <p className="admin-page-subtitle">Manage uploaded images and their visibility status.</p>
        </div>
        <button
          onClick={togglePageVisibility}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            isMediaPageActive 
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-md border border-green-700' 
              : 'bg-red-600 hover:bg-red-700 text-white shadow-md border border-red-700'
          }`}
        >
          {isMediaPageActive ? '🟢 Public Page: Enabled' : '🔴 Public Page: Disabled'}
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>File Name</th>
                <th>Size</th>
                <th>Uploaded At</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaFiles.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">No media files found</td>
                </tr>
              ) : (
                mediaFiles.map((media) => (
                  <tr key={media._id}>
                    <td>
                      <div className="h-12 w-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                        {media.isActive ? (
                          <img src={`http://localhost:5001${media.url}`} alt={media.filename} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-xs text-gray-400">Hidden</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="font-medium text-gray-900 dark:text-white">{media.originalName || media.filename}</div>
                      <div className="text-xs text-gray-500">{media.filename}</div>
                    </td>
                    <td>
                      {media.size ? (media.size / 1024).toFixed(1) + ' KB' : 'N/A'}
                    </td>
                    <td>
                      {new Date(media.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        onClick={() => toggleStatus(media._id, media.isActive)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          media.isActive
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {media.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => deleteMedia(media._id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Delete Permanently"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MediaManager;
