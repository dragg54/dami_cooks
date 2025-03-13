/* eslint-disable react/prop-types */

const FileInput = ({ onFileSelect, title, file}) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
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
      {file?.name ?<p className="text-gray-700">{file?.name}</p>: "Choose File"}
      </label>
    </div>
  );
};

export default FileInput;
