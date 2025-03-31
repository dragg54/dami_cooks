/* eslint-disable react/prop-types */
import { FaRegFileImage } from "react-icons/fa";

const FileInput = ({ onFileSelect, title, file, imageName}) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          onFileSelect(file);
        }
      };

  return (
    <div className="flex flex-col items-center w-full text-sm relative">
        {title}
      <input
        type="file"
        id="fileInput"
        className="hidden w-full text-gray-400"
        onChange={handleFileChange}
      />

      <label
        htmlFor="fileInput"
        className="cursor-pointer md:h-10 border-gray-400  w-full border flex 
        items-center border-gray-300 px-4 text-gray-400 py-1 md:py-2 h-8 rounded-md shadow "
      >
        <FaRegFileImage className="absolute h-full -top-1/2 translate-y-1/2 right-1"/>
      {file?.name ?<p className="text-gray-700">{file?.name}</p>: imageName != null ? imageName : "Choose File"}
      </label>
    </div>
  );
};

export default FileInput;
