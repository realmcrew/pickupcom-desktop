use serde::{Deserialize, Serialize};
use wmi::{WMIConnection, WMIDateTime};
use std::process::Command;

#[derive(Serialize, Deserialize, Debug, Clone)]
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
    for (gpu_name, vram) in &gpu_vram_infos {
        println!("GPU: {}, VRAM: {} MB", gpu_name, vram);
    }
    
    // video_controllers와 gpu_vram_infos를 결합하고 Option 타입을 올바르게 처리
    let video_controllers_with_vram = video_controllers.iter().map(|video_controller| {
        let vram_capacity_mb = gpu_vram_infos.iter()
            .find(|gpu_vram_info| {
                gpu_vram_info.0 == *video_controller.name.as_ref().unwrap_or(&"Unknown GPU".to_string())
            })
            .map(|gpu_vram_info| gpu_vram_info.1);
            
        Win32VideoControllerExpended {
            base: video_controller.clone(),
            vram_capacity: vram_capacity_mb,
            vram_capacity_unit: Some(String::from("MB")),
        }
    }).collect::<Vec<Win32VideoControllerExpended>>();

    Ok(video_controllers_with_vram)
}


pub fn get_gpu_vram_from_powershell() -> Result<Vec<(String, u64)>, Box<dyn std::error::Error>> {
    let ps_script = r#"
    $adapters = Get-ItemProperty -Path "HKLM:\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0*" -ErrorAction SilentlyContinue
    $result = @()
    foreach ($adapter in $adapters) {
        if ($adapter."HardwareInformation.AdapterString" -and $adapter."HardwareInformation.qwMemorySize") {
            $result += [PSCustomObject] @{
                Model = $adapter."HardwareInformation.AdapterString"
                VRAM_MB = [math]::round($adapter."HardwareInformation.qwMemorySize"/1MB)
            }
        }
    }
    if ($result.Count -eq 0) {
        Write-Output "[]"
    } else {
        Write-Output "[$($result | ConvertTo-Json -Compress)]"
    }
    "#;

    // Execute PowerShell command
    let output = Command::new("powershell")
        .arg("-NoProfile")
        .arg("-Command")
        .arg(ps_script)
        .output()?;

    let stdout = String::from_utf8(output.stdout)?;
    
    // 디버깅을 위한 출력
    println!("PowerShell Output: {}", stdout);

    // 빈 배열 반환 조건 처리
    if stdout.trim().is_empty() || stdout.trim() == "[]" {
        return Ok(Vec::new());
    }

    // JSON 파싱 시도
    let gpu_info: Vec<serde_json::Value> = match serde_json::from_str(&stdout.trim()) {
        Ok(info) => info,
        Err(e) => {
            println!("JSON parsing error: {}. Raw output: {}", e, stdout);
            return Ok(Vec::new());
        }
    };

    // Convert parsed JSON into a vector of tuples with better error handling
    let gpu_vram_info: Vec<(String, u64)> = gpu_info
        .into_iter()
        .filter_map(|item| {
            let model = item.get("Model")?.as_str()?.to_string();
            let vram_mb = item.get("VRAM_MB")?.as_u64()?;
            Some((model, vram_mb))
        })
        .collect();

    Ok(gpu_vram_info)
}
