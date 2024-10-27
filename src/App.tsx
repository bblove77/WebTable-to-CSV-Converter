import React, { useState } from 'react';
import { Table } from 'lucide-react';
import { InputSection } from './components/InputSection';
import { TablePreview } from './components/TablePreview';
import { extractTablesFromHtml } from './utils/tableExtractor';

function App() {
  const [url, setUrl] = useState('');
  const [html, setHtml] = useState('');
  const [tables, setTables] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const extractTables = async () => {
    try {
      setLoading(true);
      setError('');
      
      let htmlContent = html;
      
      if (url && !html) {
        const response = await fetch(url);
        htmlContent = await response.text();
      }
      
      const extractedTables = extractTablesFromHtml(htmlContent);
      
      if (extractedTables.length === 0) {
        setError('テーブルが見つかりませんでした');
        return;
      }

      setTables(extractedTables);
    } catch (err) {
      setError('テーブルの抽出中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = (tableIndex: number) => {
    const table = tables[tableIndex];
    const csv = table.map(row => row.map(cell => 
      `"${cell.replace(/"/g, '""')}"`
    ).join(',')).join('\n');
    
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `table-${tableIndex + 1}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Table className="w-8 h-8 text-indigo-600" />
            テーブル抽出ツール
          </h1>
          
          <InputSection
            url={url}
            html={html}
            loading={loading}
            onUrlChange={setUrl}
            onHtmlChange={setHtml}
            onExtract={extractTables}
          />

          {error && (
            <div className="p-4 my-6 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <TablePreview
            tables={tables}
            onDownload={downloadCSV}
          />
        </div>
      </div>
    </div>
  );
}

export default App;