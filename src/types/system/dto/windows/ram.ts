export type IWindowsRam = {
  Capacity: number;
  Speed: number;
  Manufacturer: string; // Samsung, etc.
  MemoryType: number; // Physical memory type. ( DDR3(24), DDR4(26), DDR5(34), etc.)
  SmbiosMemoryType: number; // SMBIOS memory type. ( DDR3(24), DDR4(26), DDR5(34), etc.)
  PartNumber: string;
  SerialNumber: string | null;
  FormFactor: number | null;
  DeviceLocator: string | null;
  Tag: string | null;
  DataWidth: number | null;
  TotalWidth: number | null;
};
