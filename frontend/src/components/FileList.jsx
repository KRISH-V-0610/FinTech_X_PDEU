import React, { useEffect, useState } from "react";
import axios from "axios";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/files");
        setFiles(response.data);
      } catch (err) {
        console.error("Error fetching files:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : files.length > 0 ? (
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file._id} className="flex items-center justify-between p-2 border-b border-gray-200">
              <span className="text-gray-700">{file.filename}</span>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No files uploaded yet.</p>
      )}
    </div>
  );
};

export default FileList;