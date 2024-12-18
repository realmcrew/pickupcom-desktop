import prettyBytes from 'pretty-bytes';
import bytesFormat from 'bytes';

export function formatBytes(bytes: number): string {
  return bytesFormat(bytes, { unit: 'GB' }) ?? '';
}

export function formatDecimalDiskSize(
  bytes: number,
  options?: { maximumFractionDigits?: number; space?: boolean },
): string {
  const capacity = prettyBytes(bytes, {
    maximumFractionDigits: options?.maximumFractionDigits ?? 1,
    space: options?.space ?? false,
  });

  return capacity;
}
