# from flask import Flask, render_template, request, jsonify, json, Response
# from flask_cors import CORS, cross_origin
# import pandas as pd
# import numpy as np
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# import cv2
# import mediapipe as mp
# import numpy as np
# import math
# import logging
# # import PoseModule as pm

# app = Flask(__name__)
# CORS(app)

# ##### virtual trainer #####
# ## curl ##
# # mp_drawing = mp.solutions.drawing_utils
# # mp_pose = mp.solutions.pose
# # video_capture = None

# # counter = 0
# # stage = None

# # pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# # logging.basicConfig(level=logging.DEBUG)


# ##### recipe generator #####
# def filter_recipes(data, cannot_have):
#     filtered_data = data.copy()
#     for ingredient in cannot_have:
#         filtered_data = filtered_data[~filtered_data['Cleaned-Ingredients'].str.contains(ingredient.strip().lower())]
#     return filtered_data

# def convert_to_builtin_type(obj):
#     if isinstance(obj, np.int64):
#         return int(obj)

# @app.route('/api/ingredform',methods =['POST'])
# def index():
#     if request.method == 'POST':
#         logging.debug("called server")
#         input_ingredients = request.form.getlist('input_ingredients')
#         print(input_ingredients)
#         cannot_have = request.form.getlist('cannot_have')
#         print(cannot_have)

#         unique_ingredients = set()
#         for i in data['Cleaned-Ingredients']:
#             for j in i.split(','):
#                 unique_ingredients.add(j.strip())        

#         vectorizer = TfidfVectorizer(vocabulary=unique_ingredients)
#         ingredient_matrix = vectorizer.fit_transform(data['Cleaned-Ingredients'])

#         input_ingredients_str = ', '.join(input_ingredients)
#         input_ingredients_vector = vectorizer.transform([input_ingredients_str])

#         similarities = cosine_similarity(input_ingredients_vector, ingredient_matrix)

#         cannot_have_str = ', '.join(cannot_have)
#         # print("cannot have string",cannot_have_str)
#         filtered_data = filter_recipes(data, cannot_have)

#         filtered_similarities = similarities[:, filtered_data.index]

#         top_6_index = filtered_similarities.argsort()[0][-6:][::-1]


#         top_recipes = []
#         for i in top_6_index:
#             recipe_info = {
#                 'name': filtered_data.iloc[i]['TranslatedRecipeName'],
#                 'ingredients': filtered_data.iloc[i]['TranslatedIngredients'],
#                 'time': filtered_data.iloc[i]['TotalTimeInMins'],
#                 'instructions': filtered_data.iloc[i]['TranslatedInstructions']
#             }
#             top_recipes.append(recipe_info)
        
#         # print(top_recipes)

#         json_data = json.dumps(top_recipes, default=convert_to_builtin_type)
#         decoded_data = json.loads(json_data)
#         # return jsonify({'top_recipes': decoded_data})
#         # # return jsonify({'input_ingredients': input_ingredients_str, 'cannot_have': cannot_have_str, 'top_recipes': decoded_data})
        
        
#         # response = jsonify({'top_recipes': decoded_data})
#         # # Set Cache-Control header to prevent caching
#         # response.headers['Cache-Control'] = 'no-store'
        
#         response = jsonify({'top_recipes': decoded_data})
#         return response
#         # return response


#     return jsonify({'error': 'Invalid request format'})
 
 
#  ##### virtual trainer #####
 
# # def process_image(frame):
# #     global counter, stage

# #     # Recolor image to RGB
# #     image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
# #     image.flags.writeable = False

# #     # Makking the detection 
# #     results = pose.process(image=image)

# #     # Recolor back to BGR
# #     image.flags.writeable = True
# #     image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

# #     try:
# #         landmarks = results.pose_landmarks.landmark
# #         # Get coordinates
# #         shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
# #         elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
# #         wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]

# #         def Calculate_angle(a, b, c):
# #             a = np.array(a)  # first landmark - shoulder
# #             b = np.array(b)  # second landmark - elbow
# #             c = np.array(c)  # third landmark - wrist
# #             radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
# #             angle = np.abs(radians * 180 / np.pi)
# #             if angle > 180.0:
# #                 angle = 360 - angle
# #             return angle

# #         # Calculate angle
# #         angle = Calculate_angle(shoulder, elbow, wrist)

# #         # Visualize angle
# #         cv2.putText(image, str(angle),
# #                     tuple(np.multiply(elbow, [640, 480]).astype(int)),
# #                     cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA)

# #         # Curl Logic :)
# #         if angle > 160:
# #             stage = "down"
# #         if angle < 30 and stage == 'down':
# #             stage = "up"
# #             counter += 1
# #             print(counter)
# #     except:
# #         pass

# #     # Render curl counter
# #     # Setup status box
# #     cv2.rectangle(image, (0, 0), (225, 73), (245, 117, 16), -1)

# #     # Rep data
# #     cv2.putText(image, 'REPS', (15, 12),
# #                 cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
# #     cv2.putText(image, str(counter),
# #                 (10, 60),
# #                 cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)

# #     # Stage data
# #     cv2.putText(image, 'STAGE', (65, 12),
# #                 cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
# #     cv2.putText(image, stage,
# #                 (60, 60),
# #                 cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)

# #     # Render detections
# #     mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
# #                                mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
# #                                mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
# #                                )

# #     return image

# # def generate_frames():
# #     global video_capture
# #     video_capture = cv2.VideoCapture(0)

# #     while video_capture.isOpened():
# #         ret, frame = video_capture.read()

# #         if not ret:
# #             break

# #         frame = process_image(frame)

# #         ret, buffer = cv2.imencode('.jpg', frame)
# #         frame = buffer.tobytes()

# #         yield (b'--frame\r\n'
# #                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

 
# # @app.route('/curl/api/video_feed')
# # def video_feed():
# #     return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# # @app.route('/curl/api/stop_video_feed')
# # def stop_video_feed():
# #     global video_capture, counter, stage

# #     if video_capture is not None:
# #         video_capture.release()
# #         video_capture = None
    
# #     counter = 0
# #     stage = None
 
 
 
# ###### push ups ######

# # class poseDetector() :
    
# #     def __init__(self, mode=False, complexity=1, smooth_landmarks=True,
# #                  enable_segmentation=False, smooth_segmentation=True,
# #                  detectionCon=0.5, trackCon=0.5):
        
# #         self.mode = mode 
# #         self.complexity = complexity
# #         self.smooth_landmarks = smooth_landmarks
# #         self.enable_segmentation = enable_segmentation
# #         self.smooth_segmentation = smooth_segmentation
# #         self.detectionCon = detectionCon
# #         self.trackCon = trackCon
        
# #         self.mpDraw = mp.solutions.drawing_utils
# #         self.mpPose = mp.solutions.pose
# #         self.pose = self.mpPose.Pose(self.mode, self.complexity, self.smooth_landmarks,
# #                                      self.enable_segmentation, self.smooth_segmentation,
# #                                      self.detectionCon, self.trackCon)
        
        
# #     def findPose (self, img, draw=True):
# #         imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
# #         self.results = self.pose.process(imgRGB)
        
# #         if self.results.pose_landmarks:
# #             if draw:
# #                 self.mpDraw.draw_landmarks(img,self.results.pose_landmarks,
# #                                            self.mpPose.POSE_CONNECTIONS)
                
# #         return img
    
# #     def findPosition(self, img, draw=True):
# #         self.lmList = []
# #         if self.results.pose_landmarks:
# #             for id, lm in enumerate(self.results.pose_landmarks.landmark):
# #                 #finding height, width of the image printed
# #                 h, w, c = img.shape
# #                 #Determining the pixels of the landmarks
# #                 cx, cy = int(lm.x * w), int(lm.y * h)
# #                 self.lmList.append([id, cx, cy])
# #                 if draw:
# #                     cv2.circle(img, (cx, cy), 5, (255,0,0), cv2.FILLED)
# #         return self.lmList
        
# #     def findAngle(self, img, p1, p2, p3, draw=True):   
# #         #Get the landmarks
# #         x1, y1 = self.lmList[p1][1:]
# #         x2, y2 = self.lmList[p2][1:]
# #         x3, y3 = self.lmList[p3][1:]
        
# #         #Calculate Angle
# #         angle = math.degrees(math.atan2(y3-y2, x3-x2) - 
# #                              math.atan2(y1-y2, x1-x2))
# #         if angle < 0:
# #             angle += 360
# #             if angle > 180:
# #                 angle = 360 - angle
# #         elif angle > 180:
# #             angle = 360 - angle
# #         # print(angle)
        
# #         #Draw
# #         if draw:
# #             cv2.line(img, (x1, y1), (x2, y2), (255,255,255), 3)
# #             cv2.line(img, (x3, y3), (x2, y2), (255,255,255), 3)

            
# #             cv2.circle(img, (x1, y1), 5, (0,0,255), cv2.FILLED)
# #             cv2.circle(img, (x1, y1), 15, (0,0,255), 2)
# #             cv2.circle(img, (x2, y2), 5, (0,0,255), cv2.FILLED)
# #             cv2.circle(img, (x2, y2), 15, (0,0,255), 2)
# #             cv2.circle(img, (x3, y3), 5, (0,0,255), cv2.FILLED)
# #             cv2.circle(img, (x3, y3), 15, (0,0,255), 2)
            
# #             cv2.putText(img, str(int(angle)), (x2-50, y2+50), 
# #                         cv2.FONT_HERSHEY_PLAIN, 2, (0,0,255), 2)
# #         return angle
        
# # count = 0
# # direction = 0
# # form = 0
# # feedback = "Fix Form"
# # video_capture_pushup = None

# # # Create PoseDetector instance
# # detector = poseDetector()

# # # Function to detect push-ups in each frame
# # def detect_pushups(frame):
# #     global count, direction, form, feedback

# #     frame = detector.findPose(frame, False)

# #     # Your existing push-up detection logic goes here
# #     lmList = detector.findPosition(frame, False)
# #     if len(lmList) != 0:
# #         elbow = detector.findAngle(frame, 11, 13, 15)
# #         shoulder = detector.findAngle(frame, 13, 11, 23)
# #         hip = detector.findAngle(frame, 11, 23, 25)

# #         per = np.interp(elbow, (90, 160), (0, 100))
# #         bar = np.interp(elbow, (90, 160), (380, 50))

# #         if elbow > 160 and shoulder > 40 and hip > 160:
# #             form = 1

# #         if form == 1:
# #             if per == 0:
# #                 if elbow <= 90 and hip > 160:
# #                     feedback = "Up"
# #                     if direction == 0:
# #                         count += 0.5
# #                         direction = 1
# #                 else:
# #                     feedback = "Fix Form"

# #             if per == 100:
# #                 if elbow > 160 and shoulder > 40 and hip > 160:
# #                     feedback = "Down"
# #                     if direction == 1:
# #                         count += 0.5
# #                         direction = 0
# #                 else:
# #                     feedback = "Fix Form"
# #         #Draw Bar
# #         if form == 1:
# #             cv2.rectangle(frame, (580, 50), (600, 380), (0, 255, 0), 3)
# #             cv2.rectangle(frame, (580, int(bar)), (600, 380), (0, 255, 0), cv2.FILLED)
# #             cv2.putText(frame, f'{int(per)}%', (565, 430), cv2.FONT_HERSHEY_PLAIN, 2,
# #                         (255, 0, 0), 2)


# #         #Pushup counter
# #         cv2.rectangle(frame, (0, 380), (100, 480), (0, 255, 0), cv2.FILLED)
# #         cv2.putText(frame, str(int(count)), (25, 455), cv2.FONT_HERSHEY_PLAIN, 5,
# #                     (255, 0, 0), 5)
        
# #         #Feedback 
# #         cv2.rectangle(frame, (500, 0), (640, 40), (255, 255, 255), cv2.FILLED)
# #         cv2.putText(frame, feedback, (500, 40 ), cv2.FONT_HERSHEY_PLAIN, 2,
# #                     (0, 255, 0), 2)


# #     return frame

# # def generate_pushup_frames():
# #     global video_capture_pushup
    
# #     video_capture_pushup = cv2.VideoCapture(0)

# #     while video_capture_pushup.isOpened():
# #         ret, frame = video_capture_pushup.read()

# #         if not ret:
# #             break

# #         frame = detect_pushups(frame)

# #         # Encode image to JPEG
# #         ret, buffer = cv2.imencode('.jpg', frame)
# #         frame = buffer.tobytes()

# #         yield (b'--frame\r\n'
# #                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# # # @app.route('/')
# # # def pushup_counter_page():
# # #     return render_template('pushup.html', count=int(count), feedback=feedback)

# # @app.route('/api/pushup/pushup_feed')
# # def pushup_feed():
# #     return Response(generate_pushup_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# # @app.route('/api/pushup/stop_video_feed')
# # def stop_video_feed():
# #     global video_capture_pushup, count, direction, form, feedback

# #     if video_capture_pushup is not None:
# #         video_capture_pushup.release()
# #         video_capture_pushup = None
    
# #     count = 0
# #     direction = 0
# #     form = 0
# #     feedback = "Fix Form"

# if __name__ == '__main__':
#     data = pd.read_csv('Cleaned_Indian_Food_Dataset.csv', encoding='utf-8')
#     app.run(host = '0.0.0.0', debug = False)


from flask import Flask, render_template, request, jsonify, json, Response
from flask_cors import CORS, cross_origin
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import cv2
import mediapipe as mp
import numpy as np
import PoseModule as pm

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
    
def get_user_limits(given):
    m_given = given.strip().lower().split(',')
    return m_given


@app.route('/api/ingredform',methods =['POST'])
def index():
    if request.method == 'POST':
        print("called server")
        req_ipr = request.get_json('input_ingredients')
        # print(input_ingredients)
        # cannot_have = request.get_json('cannot_have')
        input_ingredients = get_user_limits(req_ipr['input_ingredients'])
        cannot_have = get_user_limits(req_ipr['cannot_have'])
        print(input_ingredients, "wegfiwufg", cannot_have)

        # print("biwfbwigw")
        # print(cannot_have)
        # print("inout inde", cannot_have)
        # cannot_have = get_user_limits()

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
        print(json_data)
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
 

# push-up counter variables
pushup_count = 0
pushup_direction = 0
pushup_form = 0
pushup_feedback = "Fix Form"
video_capture_pushup = None

# curl counter variables
curl_counter = 0
curl_stage = None
video_capture_curl = None

# create PoseDetector instance for push-up
pushup_detector = pm.poseDetector()

# create Mediapipe Pose instance for curl
curl_pose = mp.solutions.pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# function to detect push-ups in each frame
def detect_pushups(frame):
    global pushup_count, pushup_direction, pushup_form, pushup_feedback

    frame = pushup_detector.findPose(frame, False)

    lmList = pushup_detector.findPosition(frame, False)
    if len(lmList) != 0:
        elbow = pushup_detector.findAngle(frame, 11, 13, 15)
        shoulder = pushup_detector.findAngle(frame, 13, 11, 23)
        hip = pushup_detector.findAngle(frame, 11, 23, 25)

        per = np.interp(elbow, (90, 160), (0, 100))
        bar = np.interp(elbow, (90, 160), (380, 50))

        if elbow > 160 and shoulder > 40 and hip > 160:
            pushup_form = 1

        if pushup_form == 1:
            if per == 0:
                if elbow <= 90 and hip > 160:
                    pushup_feedback = "Up"
                    if pushup_direction == 0:
                        pushup_count += 0.5
                        pushup_direction = 1
                else:
                    pushup_feedback = "Fix Form"

            if per == 100:
                if elbow > 160 and shoulder > 40 and hip > 160:
                    pushup_feedback = "Down"
                    if pushup_direction == 1:
                        pushup_count += 0.5
                        pushup_direction = 0
                else:
                    pushup_feedback = "Fix Form"

        if pushup_form == 1:
            cv2.rectangle(frame, (580, 50), (600, 380), (0, 255, 0), 3)
            cv2.rectangle(frame, (580, int(bar)), (600, 380), (0, 255, 0), cv2.FILLED)
            cv2.putText(frame, f'{int(per)}%', (565, 430), cv2.FONT_HERSHEY_PLAIN, 2,
                        (255, 0, 0), 2)

        cv2.rectangle(frame, (0, 380), (100, 480), (0, 255, 0), cv2.FILLED)
        cv2.putText(frame, str(int(pushup_count)), (25, 455), cv2.FONT_HERSHEY_PLAIN, 5,
                    (255, 0, 0), 5)

        cv2.rectangle(frame, (500, 0), (640, 40), (255, 255, 255), cv2.FILLED)
        cv2.putText(frame, pushup_feedback, (500, 40), cv2.FONT_HERSHEY_PLAIN, 2,
                    (0, 255, 0), 2)

    return frame

# function to process frames for curl counter
def process_curl_image(frame):
    global curl_counter, curl_stage

    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False

    results = curl_pose.process(image=image)

    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    try:
        landmarks = results.pose_landmarks.landmark

        shoulder = [landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                    landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value].y]
        elbow = [landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value].x,
                 landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value].y]
        wrist = [landmarks[mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value].x,
                 landmarks[mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value].y]

        def Calculate_angle(a, b, c):
            a = np.array(a)  # first landmark - shoulder
            b = np.array(b)  # second landmark - elbow
            c = np.array(c)  # third landmark - wrist
            radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
            angle = np.abs(radians * 180 / np.pi)
            if angle > 180.0:
                angle = 360 - angle
            return angle

        angle = Calculate_angle(shoulder, elbow, wrist)

        # Curl Logic :)
        if angle > 160:
            curl_stage = "down"
        if angle < 30 and curl_stage == 'down':
            curl_stage = "up"
            curl_counter += 1
            print(curl_counter)
    except:
        pass


    cv2.rectangle(image, (0, 0), (225, 73), (245, 117, 16), -1)

    cv2.putText(image, 'REPS', (15, 12),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
    cv2.putText(image, str(curl_counter),
                (10, 60),
                cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)

    cv2.putText(image, 'STAGE', (65, 12),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
    cv2.putText(image, curl_stage,
                (60, 60),
                cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)

    mp.solutions.drawing_utils.draw_landmarks(image, results.pose_landmarks,
                                              mp.solutions.pose.POSE_CONNECTIONS,
                                              mp.solutions.drawing_utils.DrawingSpec(
                                                  color=(245, 117, 66), thickness=2, circle_radius=2),
                                              mp.solutions.drawing_utils.DrawingSpec(
                                                  color=(245, 66, 230), thickness=2, circle_radius=2)
                                              )

    return image

# function to generate frames for push-up counter ^_^
def generate_pushup_frames():
    global video_capture_pushup

    video_capture_pushup = cv2.VideoCapture(0)

    while video_capture_pushup.isOpened():
        ret, frame = video_capture_pushup.read()

        if not ret:
            break

        frame = detect_pushups(frame)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# function to generate frames for curl counter ^_^
def generate_curl_frames():
    global video_capture_curl
    video_capture_curl = cv2.VideoCapture(0)

    while video_capture_curl.isOpened():
        ret, frame = video_capture_curl.read()

        if not ret:
            break

        frame = process_curl_image(frame)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# route for push-up counter
@app.route('/pushup_counter')
def pushup_counter_page():
    return render_template('pushup.html', count=int(pushup_count), feedback=pushup_feedback)

# route for push-up counter video feed
@app.route('/api/pushup_feed')
def pushup_feed():
    return Response(generate_pushup_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# route for stopping push-up counter video feed :)
@app.route('/api/stop_pushup_feed')
def stop_pushup_feed():
    global video_capture_pushup, pushup_count, pushup_direction, pushup_form, pushup_feedback

    if video_capture_pushup is not None:
        video_capture_pushup.release()
        video_capture_pushup = None

    pushup_count = 0
    pushup_direction = 0
    pushup_form = 0
    pushup_feedback = "Fix Form"
    return "stopped"
    

# route for curl counter
@app.route('/curl_counter')
def curl_counter_page():
    return render_template('curl.html', curl_count=curl_counter, curl_stage=curl_stage)

# route for curl counter video feed
@app.route('/api/curl_feed')
def curl_feed():
    return Response(generate_curl_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# route for stopping curl counter video feed :)
@app.route('/api/stop_curl_feed')
def stop_curl_feed():
    global video_capture_curl, curl_counter, curl_stage

    if video_capture_curl is not None:
        video_capture_curl.release()
        video_capture_curl = None

    curl_counter = 0
    curl_stage = None
    return "stopped"


if __name__ == '__main__':
    data = pd.read_csv('Cleaned_Indian_Food_Dataset.csv', encoding='utf-8')
    app.run(host = '0.0.0.0', debug = True)