use env_logger;
use log::trace;
use tauri::{utils::config::FrontendDist, webview::WebviewWindowBuilder, Url, WebviewUrl};

mod event;
pub mod system;

const WINDOW_TITLE: &str = "픽업컴";
const WINDOW_WIDTH: f64 = 800.0;
const WINDOW_HEIGHT: f64 = 600.0;

pub fn run() {
    env_logger::init();
    trace!("Start PickupCom");

    let port = portpicker::pick_unused_port().expect("failed to find unused port");
    let mut context = tauri::generate_context!();
    let url: Url   = format!("http://localhost:{}", port).parse().expect("failed to parse url");
    let window_url = WebviewUrl::External(url.clone());
    // IPC를 활성화하려면 URL을 재설정해야 합니다.
    let dist = context.config_mut().build.frontend_dist.as_mut().expect("failed to get frontend dist");
    *dist = FrontendDist::Url(url.clone());
    

    tauri::Builder::default()
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .setup(move |app| {
            let window = WebviewWindowBuilder::new(app, "main", window_url)
            .title(WINDOW_TITLE)
            .min_inner_size(WINDOW_WIDTH, WINDOW_HEIGHT)
            .build()?;

            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                window.open_devtools();
                window.close_devtools();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![event::get_system_info])
        .run(context)
        .expect("error while running tauri application");
}
