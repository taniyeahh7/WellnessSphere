from flask import Flask, render_template, Response
import cv2
import numpy as np
import PoseModule as pm

app = Flask(__name__)

# Push-up counter variables
count = 0
direction = 0
form = 0
feedback = "Fix Form"
video_capture_pushup = None

# Create PoseDetector instance
detector = pm.poseDetector()

# Function to detect push-ups in each frame
def detect_pushups(frame):
    global count, direction, form, feedback

    frame = detector.findPose(frame, False)

    # Your existing push-up detection logic goes here
    lmList = detector.findPosition(frame, False)
    if len(lmList) != 0:
        elbow = detector.findAngle(frame, 11, 13, 15)
        shoulder = detector.findAngle(frame, 13, 11, 23)
        hip = detector.findAngle(frame, 11, 23, 25)

        per = np.interp(elbow, (90, 160), (0, 100))
        bar = np.interp(elbow, (90, 160), (380, 50))

        if elbow > 160 and shoulder > 40 and hip > 160:
            form = 1

        if form == 1:
            if per == 0:
                if elbow <= 90 and hip > 160:
                    feedback = "Up"
                    if direction == 0:
                        count += 0.5
                        direction = 1
                else:
                    feedback = "Fix Form"

            if per == 100:
                if elbow > 160 and shoulder > 40 and hip > 160:
                    feedback = "Down"
                    if direction == 1:
                        count += 0.5
                        direction = 0
                else:
                    feedback = "Fix Form"
        #Draw Bar
        if form == 1:
            cv2.rectangle(frame, (580, 50), (600, 380), (0, 255, 0), 3)
            cv2.rectangle(frame, (580, int(bar)), (600, 380), (0, 255, 0), cv2.FILLED)
            cv2.putText(frame, f'{int(per)}%', (565, 430), cv2.FONT_HERSHEY_PLAIN, 2,
                        (255, 0, 0), 2)


        #Pushup counter
        cv2.rectangle(frame, (0, 380), (100, 480), (0, 255, 0), cv2.FILLED)
        cv2.putText(frame, str(int(count)), (25, 455), cv2.FONT_HERSHEY_PLAIN, 5,
                    (255, 0, 0), 5)
        
        #Feedback 
        cv2.rectangle(frame, (500, 0), (640, 40), (255, 255, 255), cv2.FILLED)
        cv2.putText(frame, feedback, (500, 40 ), cv2.FONT_HERSHEY_PLAIN, 2,
                    (0, 255, 0), 2)


    return frame

def generate_pushup_frames():
    global video_capture_pushup
    
    video_capture_pushup = cv2.VideoCapture(0)

    while video_capture_pushup.isOpened():
        ret, frame = video_capture_pushup.read()

        if not ret:
            break

        frame = detect_pushups(frame)

        # Encode image to JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def pushup_counter_page():
    return render_template('pushup.html', count=int(count), feedback=feedback)

@app.route('/pushup_feed')
def pushup_feed():
    return Response(generate_pushup_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/stop_video_feed')
def stop_video_feed():
    global video_capture_pushup, count, direction, form, feedback

    if video_capture_pushup is not None:
        video_capture_pushup.release()
        video_capture_pushup = None
    
    count = 0
    direction = 0
    form = 0
    feedback = "Fix Form"

if __name__ == "__main__":
    app.run(debug=True)
