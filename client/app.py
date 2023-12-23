from flask import Flask, render_template, request, jsonify, json, Response
from flask_cors import CORS, cross_origin
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import cv2
import mediapipe as mp
import numpy as np

app = Flask(__name__)
CORS(app)

##### virtual trainer #####
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
video_capture = None

counter = 0
stage = None

pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)


##### recipe generator #####
def filter_recipes(data, cannot_have):
    filtered_data = data.copy()
    for ingredient in cannot_have:
        filtered_data = filtered_data[~filtered_data['Cleaned-Ingredients'].str.contains(ingredient.strip().lower())]
    return filtered_data

def convert_to_builtin_type(obj):
    if isinstance(obj, np.int64):
        return int(obj)

@app.route('/api/ingredform',methods =['POST'])
def index():
    if request.method == 'POST':
        print("called server")
        input_ingredients = request.form.getlist('input_ingredients')
        print(input_ingredients)
        cannot_have = request.form.getlist('cannot_have')

        unique_ingredients = set()
        for i in data['Cleaned-Ingredients']:
            for j in i.split(','):
                unique_ingredients.add(j.strip())        

        vectorizer = TfidfVectorizer(vocabulary=unique_ingredients)
        ingredient_matrix = vectorizer.fit_transform(data['Cleaned-Ingredients'])

        input_ingredients_str = ', '.join(input_ingredients)
        input_ingredients_vector = vectorizer.transform([input_ingredients_str])

        similarities = cosine_similarity(input_ingredients_vector, ingredient_matrix)

        cannot_have_str = ', '.join(cannot_have)
        print("cannot have string",cannot_have_str)
        filtered_data = filter_recipes(data, cannot_have)

        filtered_similarities = similarities[:, filtered_data.index]

        top_6_index = filtered_similarities.argsort()[0][-6:][::-1]


        top_recipes = []
        for i in top_6_index:
            recipe_info = {
                'name': filtered_data.iloc[i]['TranslatedRecipeName'],
                'ingredients': filtered_data.iloc[i]['TranslatedIngredients'],
                'time': filtered_data.iloc[i]['TotalTimeInMins'],
                'instructions': filtered_data.iloc[i]['TranslatedInstructions']
            }
            top_recipes.append(recipe_info)

        json_data = json.dumps(top_recipes, default=convert_to_builtin_type)
        decoded_data = json.loads(json_data)
        # return jsonify({'top_recipes': decoded_data})
        # # return jsonify({'input_ingredients': input_ingredients_str, 'cannot_have': cannot_have_str, 'top_recipes': decoded_data})
        
        
        # response = jsonify({'top_recipes': decoded_data})
        # # Set Cache-Control header to prevent caching
        # response.headers['Cache-Control'] = 'no-store'
        
        response = jsonify({'top_recipes': decoded_data})
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        return response
        # return response


    return jsonify({'error': 'Invalid request format'})
 
 
 ##### virtual trainer #####
 
def process_image(frame):
    global counter, stage

    # Recolor image to RGB
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False

    # Makking the detection 
    results = pose.process(image=image)

    # Recolor back to BGR
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    try:
        landmarks = results.pose_landmarks.landmark

        # Get coordinates
        shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
        elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
        wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]

        def Calculate_angle(a, b, c):
            a = np.array(a)  # first landmark - shoulder
            b = np.array(b)  # second landmark - elbow
            c = np.array(c)  # third landmark - wrist
            radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
            angle = np.abs(radians * 180 / np.pi)
            if angle > 180.0:
                angle = 360 - angle
            return angle

        # Calculate angle
        angle = Calculate_angle(shoulder, elbow, wrist)

        # Visualize angle
        cv2.putText(image, str(angle),
                    tuple(np.multiply(elbow, [640, 480]).astype(int)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA)

        # Curl Logic :)
        if angle > 160:
            stage = "down"
        if angle < 30 and stage == 'down':
            stage = "up"
            counter += 1
            print(counter)
    except:
        pass

    # Render curl counter
    # Setup status box
    cv2.rectangle(image, (0, 0), (225, 73), (245, 117, 16), -1)

    # Rep data
    cv2.putText(image, 'REPS', (15, 12),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
    cv2.putText(image, str(counter),
                (10, 60),
                cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)

    # Stage data
    cv2.putText(image, 'STAGE', (65, 12),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
    cv2.putText(image, stage,
                (60, 60),
                cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)

    # Render detections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                               mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                               mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
                               )

    return image

def generate_frames():
    global video_capture
    video_capture = cv2.VideoCapture(0)

    while video_capture.isOpened():
        ret, frame = video_capture.read()

        if not ret:
            break

        frame = process_image(frame)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

 
@app.route('/api/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/stop_video_feed')
def stop_video_feed():
    global video_capture, counter, stage

    if video_capture is not None:
        video_capture.release()
        video_capture = None
    
    counter = 0
    stage = None
 

if __name__ == '__main__':
    data = pd.read_csv('Cleaned_Indian_Food_Dataset.csv', encoding='utf-8')
    app.run(host = '0.0.0.0', debug = True)


