import React from 'react';
import { useTable } from 'react-table';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <div className="relative overflow-x-auto rounded">
      <table
        className="w-full text-sm text-left table-auto whitespace-nowrap"
        {...getTableProps()}
      >
        <thead className="text-xs uppercase bg-slate-200 dark:bg-slate-900">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-6 py-3 font-medium"
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="border-b border-slate-200 bg-slate-50 dark:bg-slate-700 dark:border-slate-700"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td className="px-6 py-4" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
