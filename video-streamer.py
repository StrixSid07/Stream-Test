import cv2
import requests
import base64
import time

ROOM_ID = "test-room"
URL = f"http://localhost:5000/api/stream/broadcast/{ROOM_ID}"
headers = {"Content-Type": "application/json"}

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    _, buffer = cv2.imencode('.jpg', frame)
    frame_data = base64.b64encode(buffer).decode('utf-8')

    response = requests.post(URL, json={"frameData": frame_data})
    print("Frame Sent:", response.status_code)

    time.sleep(0.1)

cap.release()
