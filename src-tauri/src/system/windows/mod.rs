#![allow(non_camel_case_types)]
#![allow(non_snake_case)]

mod cpu;
mod disk;
pub mod dto;
mod gpu;
mod memory;
mod motherboard;
pub mod native;
mod os;
mod platform;
mod process;

use log::{trace, info};
use cpu::Win32Processor;
use disk::{Win32DiskDrive, Win32DiskDriveExpended};
use gpu::{Win32VideoController, Win32VideoControllerExpended};
use memory::Win32PhysicalMemory;
use motherboard::Win32BaseBoard;
use os::Win32OperatingSystem;
use platform::Win32SystemEnclosure;
use serde::Deserialize;
use wmi::{COMLibrary, Variant, WMIConnection, WMIDateTime};

pub fn get_windows_system_info() -> Result<dto::WindowsSystem, Box<dyn std::error::Error>> {
    trace!("get_windows_system_info");
    let com_con = unsafe { COMLibrary::assume_initialized() };
    let wmi_con = WMIConnection::new(com_con.into())?;

    
    let cpu = cpu::get_cpu_info(&wmi_con)?;
    let motherboard = motherboard::get_motherboard_info(&wmi_con)?;
    let rams = memory::get_rams_info(&wmi_con)?;
    let disks = disk::get_disks_info(&wmi_con)?;
    let gpu = gpu::get_gpu_info(&wmi_con)?;
    let os = os::get_os_info(&wmi_con)?;
    let platform = platform::get_platform_info(&wmi_con)?;
    let process_names = process::get_process_names();   

    let windows_system = dto::WindowsSystem {
        os,
        platform,
        cpu,
        motherboard,
        rams,
        disks,
        gpu,
        process_names,
    };
    
    info!("Windows System {:?}", windows_system);
    Ok(windows_system)
}
