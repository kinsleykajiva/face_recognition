import face_recognition
import cv2
import time
import numpy as np
import constants as const


def loadFacesImages(listOfImages: list):
    loaded_encodes = []
    loaded_labels = []
    for img in listOfImages:
        # Load a sample picture and learn how to recognize it.
        load = face_recognition.load_image_file(const.NEW_FACES + img)
        encode = face_recognition.face_encodings(load)[0]
        loaded_encodes.append(encode)
        # "".replace('.jpg' , '')
        loaded_labels.append(img.replace('.jpg', ''))
    return loaded_labels, loaded_encodes


def runRecognition(known_face_names, known_face_encodings):
    # Initialize some variables
    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = True
    while True:
        # Grab a single frame of video
        ret, frame = video_capture.read()
        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]
        # Only process every other frame of video to save time
        if process_this_frame:
            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            face_names = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = const.UNKNOWN
                face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]

                face_names.append(name)
        process_this_frame = not process_this_frame
        # Display the results
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4
            # Draw a box around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
            roi_color = frame[top:top + left, top:top + bottom]
            if name == const.UNKNOWN:
                millis = int(round(time.time() * 1000))
                millis = 'kil' + str(millis)
                cv2.imwrite(const.NEW_FACES + millis + '.jpg', roi_color)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
        # Display the resulting image
        cv2.imshow('Video', frame)
        # Hit 'q' on the keyboard to quit!
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break


# Get a reference to webcam #0 (the default one)
video_capture = cv2.VideoCapture(0)

known_face_names, known_face_encodings = loadFacesImages(['obama.jpg', 'biden.jpg', 'Me.jpg'])
runRecognition(known_face_names, known_face_encodings)
# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()
