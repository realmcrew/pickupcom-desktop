export type IWindowsCpu = {
  Name: string; // OS에서 추출한 CPU 이름 (e.g, AMD Ryzen 7 9800X3D 8-Core Processor). DB에 저장되는 HW key 역할
  Manufacturer: string;
  Caption: string;
  NumberOfCores: number;
  NumberOfLogicalProcessors: number;
  MaxClockSpeed: number;
  CurrentClockSpeed: number | null;
  AddressWidth: number | null;
  Architecture: number | null;
  AssetTag: string | null;
  Availability: number | null;
  ProcessorId: string | null;
  Status: string | null;
};
