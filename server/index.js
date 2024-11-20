// build.js
import { exec } from "child_process";

exec("sh ../build.sh", (err, stdout, stderr) => {
  if (err) {
    console.error("Error executing script:", err);
    return;
  }
  console.log("Script output:", stdout);
  console.error("Script stderr:", stderr);
});

import "./build/main.js";
