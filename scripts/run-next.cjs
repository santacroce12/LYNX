const path = require("path");
const { spawn } = require("child_process");

function normalizeRoot(value) {
  return value && value.startsWith("\\\\?\\") ? value.slice(4) : value;
}

const rawRoot =
  process.env.npm_config_local_prefix ||
  process.env.INIT_CWD ||
  path.dirname(process.env.npm_package_json || path.join(process.cwd(), "package.json"));

const root = normalizeRoot(rawRoot);
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const args = process.argv.slice(2);

const child = spawn(process.execPath, [nextBin, ...args], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
