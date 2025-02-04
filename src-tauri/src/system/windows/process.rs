use sysinfo::System;

pub fn get_process_names() -> Vec<String> {
  let mut sys = System::new_all();
  let process_names: Vec<String> = sys.processes().iter().map(|(_, process)| {
      println!("{}", process.name());
      process.name().to_string()
  }).collect();

  println!("Process Names: {:?}", process_names);

  process_names
}
