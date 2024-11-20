// eslint-disable-next-line @typescript-eslint/no-require-imports
const { exec } = require("child_process");

exec("npm run build", (err, stdout, stderr) => {
  if (err) {
    console.error("Error executing script:", err);
    return;
  }
  console.log("Script output:", stdout);
  console.error("Script stderr:", stderr);

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("./build/main.js");
});
