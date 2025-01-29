use tauri::{Manager, webview::WebviewWindowBuilder, WebviewUrl};

mod event;
pub mod system;

pub fn run() {
    let port = portpicker::pick_unused_port().expect("failed to find unused port");
    let url = format!("http://localhost:{}", port).parse().unwrap();

    tauri::Builder::default()
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let window = WebviewWindowBuilder::new(app, "main", WebviewUrl::External(url))
            .title("PickupCom")
            .build()?;

            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                // let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![event::get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
