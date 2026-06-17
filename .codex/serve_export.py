from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1] / "out"
PORT = 3005


class ExportHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        parsed_path = unquote(urlparse(path).path)
        relative_path = parsed_path.lstrip("/")

        if not relative_path:
            relative_path = "index.html"
        else:
            candidate = ROOT / relative_path
            if candidate.is_dir():
                relative_path = f"{relative_path.rstrip('/')}/index.html"
            elif "." not in Path(relative_path).name:
                html_candidate = ROOT / f"{relative_path}.html"
                if html_candidate.exists():
                    relative_path = f"{relative_path}.html"

        return str((ROOT / relative_path).resolve())

    def log_message(self, format: str, *args) -> None:
        print("%s - - [%s] %s" % (self.client_address[0], self.log_date_time_string(), format % args))


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), ExportHandler)
    print(f"Serving static export from {ROOT} on http://127.0.0.1:{PORT}")
    server.serve_forever()
