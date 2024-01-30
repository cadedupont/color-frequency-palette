from flask import Flask, request, jsonify, send_file
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
    image.save(f"{os.getcwd()}/../img/uploaded.jpg")

    # Run the image processing script
    result: subprocess.CompletedProcess = subprocess.run(
        ["../bin/generate_palette"],
        capture_output=True
    )

    # If the script ran successfully, return the palette
    if result.returncode == 0:
        return jsonify({
            "success": True,
            "message": "Palette generated successfully"
        })
    else:
        return jsonify({
            "success": False,
            "message": "Palette generation failed"
        })

@app.route("/palette", methods=["GET"])
def get_palette() -> send_file or jsonify:
    filepath: str = f"{os.getcwd()}/../img/palette.jpg"
    if os.path.exists(filepath):
        return send_file(filepath, mimetype="image/jpg")    
    return jsonify({
        "success": False,
        "message": "Palette not found"
    })
    
if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
