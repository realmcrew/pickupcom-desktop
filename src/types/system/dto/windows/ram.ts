export type IWindowsRam = {
  Capacity: number;
  Speed: number; // 메모리 속도 (MHz)
  Manufacturer: string; // 메모리 제조사 (Samsung, etc.)
  MemoryType: number; // 물리적 메모리 유형. ( DDR3(24), DDR4(26), DDR5(34), etc.)
  SmbiosMemoryType: number; // SMBIOS 메모리 유형. ( DDR3(24), DDR4(26), DDR5(34), etc.)
  PartNumber: string;
  SerialNumber: string | null;
  FormFactor: number | null;
  DeviceLocator: string | null;
  Tag: string | null;
  DataWidth: number | null;
  TotalWidth: number | null;
};
