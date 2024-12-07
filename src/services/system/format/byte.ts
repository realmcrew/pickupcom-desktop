import prettyBytes from 'pretty-bytes';
import bytesFormat from 'bytes';

export function formatBytes(bytes: number): string {
  return bytesFormat(bytes, { unit: 'GB' }) ?? '';
}

export function formatDecimalDiskSize(bytes: number): string {
  return prettyBytes(bytes, { maximumFractionDigits: 1, space: false });
}
