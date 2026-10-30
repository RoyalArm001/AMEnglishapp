import { UserProgressData } from './types';

/**
 * Universal browser helper to export SQLite backup as file download.
 * Calls /api/backup/sqlite endpoint which runs createSqliteBackupBuffer in Node.js.
 */
export async function downloadSqliteBackupFile(data: UserProgressData): Promise<void> {
  const response = await fetch('/api/backup/sqlite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`SQLite export failed with status ${response.status}`);
  }

  const blob = await response.blob();
  const dateStr = new Date().toISOString().slice(0, 10);
  const fileName = `HayLingo_Backup_${dateStr}.db`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Universal browser helper to import a SQLite .db backup file.
 * Uploads binary file to /api/backup/sqlite which deserializes and validates PRAGMA integrity.
 */
export async function uploadSqliteBackupFile(
  file: File
): Promise<{ ok: boolean; data?: Partial<UserProgressData>; errorAm?: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const response = await fetch('/api/backup/sqlite', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: arrayBuffer,
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return {
      ok: false,
      errorAm: `Ֆայլի վերականգնումը ձախողվեց: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
