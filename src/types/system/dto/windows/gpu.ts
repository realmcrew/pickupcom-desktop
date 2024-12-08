export type IWindowsGpu = {
  Name: string;
  Caption: string;
  VideoProcessor: string; // OS에서 추출한 그래픽카드 칩셋 이름 (e.g, NVIDIA GeForce RTX 4080 SUPER). DB에 저장되는 HW key 역할
  AdapterDacType: string | null; // 내장그래픽, 외장그래픽 여부. 내장그래픽 예시 ('Internal DAC(400MHz)'), 외장그래픽 예시 ('Integrated RAMDAC')
  AdapterCompatibility: string;
  Description: string | null;
  DeviceID: string | null;
  DriverDate: string | null;
  DriverVersion: string | null;
  AdapterRAM: number | null;
  InstalledDisplayDrivers: string | null;
};
