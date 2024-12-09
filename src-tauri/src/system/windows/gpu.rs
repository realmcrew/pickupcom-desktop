use serde::{Deserialize, Serialize};
use wmi::{WMIConnection, WMIDateTime};
use std::process::Command;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename = "Win32_VideoController")]
#[serde(rename_all = "PascalCase")]
pub struct Win32VideoController {
    pub adapter_compatibility: Option<String>,
    pub adapter_dac_type: Option<String>,
    pub adapter_ram: Option<u32>,
    pub caption: Option<String>,
    pub description: Option<String>,
    pub device_id: Option<String>,
    pub driver_date: Option<WMIDateTime>,
    pub driver_version: Option<String>,
    pub installed_display_drivers: Option<String>,
    pub name: Option<String>,
    pub video_processor: Option<String>,
    // ... add other fields as needed ...
}


#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "PascalCase")]
pub struct Win32VideoControllerExpended {
    #[serde(flatten)]
    pub base: Win32VideoController, // Embed the base struct
    pub vram_capacity: Option<u64>, // Fetch from windows powershell
    pub vram_capacity_unit: Option<String>, // MB, GB, etc. (default: MB)
}

pub fn get_gpu_info(
    wmi_con: &WMIConnection,
) -> Result<Vec<Win32VideoControllerExpended>, Box<dyn std::error::Error>> {
    let video_controllers: Vec<Win32VideoController> = wmi_con.query()?;
    for video_controller in &video_controllers {
        let video_controller_detail = format!("{:#?}\n", video_controller);
        println!("{}", video_controller_detail);
    }

    let gpu_vram_infos = get_gpu_vram_from_powershell()?;
    for gpu_vram_info in gpu_vram_infos {
        println!("{}", gpu_vram_info);
    }
    // aggregate video_controllers and gpu_vram_infos.
    let video_controllers_with_vram = video_controllers.iter().map(|video_controller| {
        let vram_capacity_mb = gpu_vram_infos.iter().find(|gpu_vram_info| gpu_vram_info.0 == video_controller.name.unwrap_or("Unknown GPU")).map(|gpu_vram_info| gpu_vram_info.1);
        Win32VideoControllerExpended {
            base: video_controller.clone(),
            vram_capacity: vram_capacity_mb,
            vram_capacity_unit: "MB".to_string(),
        }
    }).collect::<Vec<Win32VideoControllerExpended>>();

    Ok(video_controllers_with_vram)
}


pub fn get_gpu_vram_from_powershell() -> Result<Vec<(String, u64)>, Box<dyn std::error::Error>> {
    // PowerShell script to fetch GPU VRAM information in MB
    // "4d36e968-e325-11ce-bfc1-08002be10318" is the class GUID for video controllers. (Same for every PC)
    let ps_script = r#"
    $adapterMemory = (Get-ItemProperty -Path "HKLM:\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0*" -Name "HardwareInformation.AdapterString", "HardwareInformation.qwMemorySize" -Exclude PSPath -ErrorAction SilentlyContinue)
    $result = @()
    foreach ($adapter in $adapterMemory) {
        $result += [PSCustomObject] @{
            Model = $adapter."HardwareInformation.AdapterString"
            VRAM_MB = [math]::round($adapter."HardwareInformation.qwMemorySize"/1MB)
        }
    }
    $result | ConvertTo-Json -Depth 1
    "#;

    // Execute PowerShell command
    let output = Command::new("powershell")
        .arg("-NoProfile")
        .arg("-Command")
        .arg(ps_script)
        .output()?;

    if !output.status.success() {
        return Err(format!(
            "PowerShell script failed with error: {}",
            String::from_utf8_lossy(&output.stderr)
        )
        .into());
    }

    // Parse PowerShell output
    let stdout = String::from_utf8(output.stdout)?;
    let gpu_info: Vec<serde_json::Value> = serde_json::from_str(&stdout)?;

    // Convert parsed JSON into a vector of tuples
    let gpu_vram_info: Vec<(String, u64)> = gpu_info
        .into_iter()
        .map(|item| {
            let model = item["Model"]
                .as_str()
                .unwrap_or("Unknown GPU")
                .to_string();
            let vram_mb = item["VRAM_MB"].as_u64().unwrap_or(0); // Keep VRAM as u64
            (model, vram_mb)
        })
        .collect();

    Ok(gpu_vram_info)
}
