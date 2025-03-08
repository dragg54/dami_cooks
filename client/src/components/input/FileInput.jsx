/* eslint-disable react/prop-types */
import { useState } from "react";

const FileInput = ({ onFileSelect, title}) => {
    const [fileName, setFileName] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setFileName(file.name);
          onFileSelect(file);
        }
      };
  return (
    <div className="flex flex-col items-center w-full">
        {title}
      <input
        type="file"
        id="fileInput"
        className="hidden w-full"
        onChange={handleFileChange}
      />

      <label
        htmlFor="fileInput"
        className="cursor-pointer w-full border border-gray-300 px-4 py-2 rounded-lg shadow "
      >
      {fileName ?<p className="text-gray-700">{fileName}</p>: "Choose File"}
      </label>

      {/* {fileName && <p className="text-gray-700">{fileName}</p>} */}
    </div>
  );
};

export default FileInput;
