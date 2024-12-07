use tauri::Manager;

mod event;
pub mod system;

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![event::get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}