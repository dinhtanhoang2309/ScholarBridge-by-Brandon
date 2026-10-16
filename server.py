import http.server
import socketserver
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class FastHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Asset caching for frames and imagery
        if self.path.endswith('.jpg') or self.path.endswith('.jpeg') or self.path.endswith('.png'):
            self.send_header('Cache-Control', 'public, max-age=604800, immutable')
        else:
            self.send_header('Cache-Control', 'no-cache')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, format, *args):
        # Mute individual asset GET spam
        pass

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    port = PORT
    for attempt in range(5):
        try:
            with socketserver.TCPServer(("127.0.0.1", port), FastHandler) as httpd:
                print(f"ScholarBridge Server running at http://127.0.0.1:{port}", flush=True)
                httpd.serve_forever()
        except OSError as e:
            if "Address already in use" in str(e) or getattr(e, 'winerror', None) == 10048:
                port += 1
            else:
                raise

if __name__ == "__main__":
    start_server()
