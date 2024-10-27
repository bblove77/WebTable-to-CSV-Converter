import React from 'react';
import { Upload } from 'lucide-react';

interface InputSectionProps {
  url: string;
  html: string;
  loading: boolean;
  onUrlChange: (value: string) => void;
  onHtmlChange: (value: string) => void;
  onExtract: () => void;
}

export function InputSection({ 
  url, 
  html, 
  loading, 
  onUrlChange, 
  onHtmlChange, 
  onExtract 
}: InputSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          URL（CORS対応サイトのみ）
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="WebページのURLを入力してください"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="html" className="block text-sm font-medium text-gray-700">
          または HTML を直接貼り付け
        </label>
        <textarea
          id="html"
          value={html}
          onChange={(e) => onHtmlChange(e.target.value)}
          placeholder="HTMLを貼り付けてください"
          className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        onClick={onExtract}
        disabled={loading || (!url && !html)}
        className="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          <Upload className="w-5 h-5" />
        )}
        テーブルを抽出
      </button>
    </div>
  );
}