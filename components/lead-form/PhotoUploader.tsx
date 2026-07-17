"use client";

import { useId, useState } from "react";

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 8;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

// TODO(FORM-005): collegare l'upload reale allo storage privato quando
// disponibile (API-003). Per ora i file restano solo lato client: alla
// sottomissione del modulo vengono ignorati (nessun photoKeys generato).
export function PhotoUploader({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const inputId = useId();
  const [error, setError] = useState<string | null>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;

    const incoming = Array.from(fileList);
    const combined = [...files, ...incoming];

    if (combined.length > MAX_FILES) {
      setError(`Sie können höchstens ${MAX_FILES} Fotos hochladen.`);
      return;
    }

    for (const file of incoming) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Nur JPEG-, PNG-, WebP- oder HEIC-Dateien sind erlaubt.");
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`Jede Datei darf höchstens ${MAX_FILE_SIZE_MB} MB gross sein.`);
        return;
      }
    }

    setError(null);
    onChange(combined);
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-medium">
        Fotos (optional)
      </label>
      <input
        id={inputId}
        type="file"
        multiple
        accept={ACCEPTED_TYPES.join(",")}
        onChange={(event) => handleFiles(event.target.files)}
        className="text-sm"
      />
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {files.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-3">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-2 rounded-md border border-ink-200 px-3 py-2 text-sm"
            >
              <span className="max-w-[160px] truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`${file.name} entfernen`}
                className="text-ink-500 hover:text-ink-900"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
