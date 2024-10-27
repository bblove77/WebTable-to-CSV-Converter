import React from 'react';
import { FileDown } from 'lucide-react';

interface TablePreviewProps {
  tables: string[][];
  onDownload: (tableIndex: number) => void;
}

export function TablePreview({ tables, onDownload }: TablePreviewProps) {
  if (tables.length === 0) return null;

  return (
    <>
      {tables.map((table, tableIndex) => (
        <div key={tableIndex} className="mb-8 bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              テーブル {tableIndex + 1}
            </h2>
            <button
              onClick={() => onDownload(tableIndex)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
            >
              <FileDown className="w-5 h-5" />
              CSVダウンロード
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  {table[0]?.map((header, i) => (
                    <th key={i} className="px-4 py-2 text-left text-gray-700">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.slice(1).map((row, i) => (
                  <tr key={i} className="border-t border-gray-200">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-2 text-gray-800">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}