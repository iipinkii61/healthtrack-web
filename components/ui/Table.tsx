import React from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode) | string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
}

const Table = <T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
}: TableProps<T>) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 border-b border-gray-200">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className={`group transition-colors hover:bg-blue-50/50 ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                >
                  {columns.map((col, idx) => (
                    <td key={idx} className="px-6 py-4 whitespace-nowrap">
                      {typeof col.accessor === "function"
                        ? col.accessor(item)
                        : (item[col.accessor as keyof T] as React.ReactNode) ||
                          "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-gray-400 italic"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
