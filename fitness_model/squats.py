from flask import Flask, render_template, Response
import cv2
import mediapipe as mp
import numpy as np

app = Flask(__name__)

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
video_capture = None

counter = 0
last_state = 9

def find_angle(point_a, point_b, point_c, min_visibility=0.8):
    if (point_a.visibility > min_visibility and point_b.visibility > min_visibility and point_c.visibility > min_visibility):
        bc = np.array([point_c.x - point_b.x, point_c.y - point_b.y, point_c.z - point_b.z])
        ba = np.array([point_a.x - point_b.x, point_a.y - point_b.y, point_a.z - point_b.z])

        angle = np.arccos((np.dot(ba, bc)) / (np.linalg.norm(ba) * np.linalg.norm(bc))) * (180 / np.pi)

        if angle > 180:
            return 360 - angle
        else:
            return angle
    else:
        return -1

def leg_state(angle):
    if angle < 0:
        return 0
    elif angle < 105:
        return 1
    elif angle < 150:
        return 2
    else:
        return 3

def process_image(frame, pose):
    global counter, last_state

    try:
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame.flags.writeable = False

        results = pose.process(frame).pose_landmarks
        landmarks = results.landmark

        frame.flags.writeable = True
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        mp_drawing.draw_landmarks(frame, results, mp_pose.POSE_CONNECTIONS, mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2), mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=2, circle_radius=2))
        
        right_angle = find_angle(landmarks[24], landmarks[26], landmarks[28])
        left_angle = find_angle(landmarks[23], landmarks[25], landmarks[27])

        right_state = leg_state(right_angle)
        left_state = leg_state(left_angle)
        state = right_state * left_state

        if state == 0:
            if right_state == 0:
                print("Right Leg Not Detected")
            if left_state == 0:
                print("Left Leg Not Detected")
        elif state % 2 == 0 or right_state != left_state:
            if last_state == 1:
                if left_state == 2 or left_state == 1:
                    print("Fully extend left leg")
                if right_state == 2 or left_state == 1:
                    print("Fully extend right leg")
            else:
                if left_state == 2 or left_state == 3:
                    print("Fully retract left leg")
                if right_state == 2 or left_state == 3:
                    print("Fully retract right leg")
        else:
            if state == 1 or state == 9:
                if last_state != state:
                    last_state = state
                    if last_state == 1:
                        print("GOOD!")
                        counter += 1
    except:
        print("No legs detected")

    cv2.putText(frame, "Squats: " + str(counter), (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    return frame, counter

def generate_frames():
    global video_capture, counter
    video_capture = cv2.VideoCapture(0)

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while video_capture.isOpened():
            ret, frame = video_capture.read()

            if not ret:
                break

            frame, counter = process_image(frame, pose)

            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return render_template('squats.html', count=int(counter))

@app.route('/squats_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/stop_video_feed')
def stop_video_feed():
    global video_capture, counter, last_state

    if video_capture is not None:
        video_capture.release()
        video_capture = None
    
    counter = 0
    last_state = 9

if __name__ == "__main__":
    app.run(debug=True)
