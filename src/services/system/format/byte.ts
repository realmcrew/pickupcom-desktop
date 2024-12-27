import prettyBytes from 'pretty-bytes';
import bytesFormat from 'bytes';

export function formatBytes(bytes: number, options?: { unit?: bytesFormat.Unit; unitSeparator?: string }): string {
  return bytesFormat(bytes, { unit: options?.unit ?? 'GB', unitSeparator: options?.unitSeparator }) ?? '';
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
