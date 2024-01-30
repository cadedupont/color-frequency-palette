from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.datastructures import FileStorage
import subprocess, os

# Declare constants for host and port server will run on
HOST: str = "localhost"
PORT: int = 5000

# Initialize the Flask application
app: Flask = Flask(__name__)
CORS(app)

@app.route("/upload", methods=["POST"])
def upload_file() -> jsonify:
    # Save image with appropriate file extension to disk
    image: FileStorage = request.files["image"]
    filepath: str = f"{os.getcwd()}/../img/uploaded.{image.filename.split('.')[-1]}"
    image.save(filepath)

    # Run image analysis executable
    result: subprocess.CompletedProcess = subprocess.run(
        ["python", "test.py"],
        capture_output=True,
        text=True
    )

    # Return result of image analysis to frontend
    return jsonify({
        "result": result.stdout,
        "error": result.stderr
    })

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
