/* eslint-disable react/prop-types */
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onPageChange, showLabel }) => {
    if(showLabel == null || showLabel == undefined){
        showLabel = true
    }
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className={`${!totalPages && 'hidden'} flex items-center gap-3 text-gray-500 mt-4 py-4`}>
      <button className="rounded-full p-2 border border-red-500 text-red-600" onClick={handlePreviousPage} disabled={currentPage === 1}>
        <MdOutlineNavigateBefore className="text-red-600"/>
      </button>
      {showLabel && <span> Page {currentPage} of {totalPages} </span>}
      <button className="rounded-full border-red-500 p-2 border text-red-600" onClick={handleNextPage} disabled={currentPage === totalPages}>
        <MdOutlineNavigateNext className="text-red-600"/>
      </button>
    </div>
  );
};

export default Pagination;
