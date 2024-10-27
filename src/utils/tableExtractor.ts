export function extractTablesFromHtml(html: string): string[][] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const tableElements = doc.getElementsByTagName('table');
  
  if (tableElements.length === 0) {
    return [];
  }

  return Array.from(tableElements).map(table => {
    const rows = Array.from(table.rows);
    return rows.map(row => 
      Array.from(row.cells).map(cell => cell.textContent?.trim() || '')
    );
  });
}

export function generateCSV(table: string[]): string {
  return table.map(row => 
    `"${row.replace(/"/g, '""')}"`
  ).join(',');
}