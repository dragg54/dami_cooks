

/* eslint-disable react/prop-types */

const Table = ({ children }) => <table className=" shadow-md shadow-gray-300 border-collapse ">{children}</table>;

const TableHeader = ({ children }) => <thead className="bg-tertiary  sticky top-0   z-40">{children}</thead>;

const TableBody = ({ children }) => <tbody>{children}</tbody>;

const TableRow = ({ children }) => <tr className="border-b sticky  truncate">{children}</tr>;

const TableCaption = ({ children }) => <tr className="border-b">{children}</tr>;

const TableHead = ({ children, className, ...props }) => (
    <th className={`px-4 py-2 text-left ${className}`} {...props}>
      {children}
    </th>
  );

const TableCell = ({ children }) => <td className="px-4 py-2">{children}</td>;

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption };
