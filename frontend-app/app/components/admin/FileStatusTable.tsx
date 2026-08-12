import { UploadedFile, UploadStatus } from "../../lib/types";
import Badge, { BadgeTone } from "../ui/Badge";
import Card from "../ui/Card";

const STATUS_TONE: Record<UploadStatus, BadgeTone> = {
  ready: "success",
  processing: "warning",
  failed: "danger",
};

const STATUS_LABEL: Record<UploadStatus, string> = {
  ready: "Ready",
  processing: "Processing",
  failed: "Failed",
};

export default function FileStatusTable({ files }: { files: UploadedFile[] }) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-border md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-alt text-text-muted">
            <tr>
              <th className="p-3 font-semibold">Filename</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Size</th>
              <th className="p-3 font-semibold">Uploaded</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="border-t border-border">
                <td className="max-w-xs truncate p-3 font-medium text-text">{file.filename}</td>
                <td className="p-3 uppercase text-text-muted">{file.fileType}</td>
                <td className="p-3 text-text-muted">{file.sizeLabel}</td>
                <td className="p-3 text-text-muted">{file.uploadedAt}</td>
                <td className="p-3">
                  <Badge tone={STATUS_TONE[file.status]}>{STATUS_LABEL[file.status]}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {files.map((file) => (
          <Card key={file.id}>
            <div className="flex items-start justify-between gap-2">
              <p className="min-w-0 truncate font-semibold text-text">{file.filename}</p>
              <Badge tone={STATUS_TONE[file.status]} className="shrink-0">
                {STATUS_LABEL[file.status]}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-text-muted">
              {file.fileType.toUpperCase()} · {file.sizeLabel} · {file.uploadedAt}
            </p>
          </Card>
        ))}
      </div>
    </>
  );
}
