

/* eslint-disable react/prop-types */

const Table = ({ children }) => <table className=" shadow-md shadow-gray-300 border-collapse w-full">{children}</table>;

const TableHeader = ({ children }) => <thead className="bg-tertiary !text-sm sticky top-0 !py-5  z-20">{children}</thead>;

const TableBody = ({ children }) => <tbody className="">{children}</tbody>;

const TableRow = ({ children }) => <tr className="border-b sticky max-w-[100px]   truncate">{children}</tr>;

const TableCaption = ({ children }) => <tr className="border-b">{children}</tr>;

const TableHead = ({ children, className, ...props }) => (
    <th className={`px-4 py-3 text-left ${className}`} {...props}>
      {children}
    </th>
  );

const TableCell = ({ children, hidden }) => <td className={`${hidden && 'hidden'} px-4 !text-xs py-3 truncate max-w-[400px]`}>{children}</td>;

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption };
