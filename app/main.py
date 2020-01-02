import face_recognition
import cv2
import time
import numpy as np
import constants as const
import os

NEWFACES = []
toRun = True


def loadFacesImages(listOfImages: list):

    loaded_encodes = []
    loaded_labels = []
    # print(listOfImages)
    # print("sixe::"+str(len(listOfImages)))
    for img in listOfImages:
        if os.path.exists(img):
            # Load a sample picture and learn how to recognize it.
            load = face_recognition.load_image_file( img)
            encode = face_recognition.face_encodings(load)
            if len(encode) != 0:
                encode = encode[0]
                loaded_encodes.append(encode)
                img = img.replace('.jpg', '')
                img = img.replace('.png', '')
                loaded_labels.append(img)
            else:
                # we remove the file from the folder
                os.remove(img)
    NEWFACES.clear()
    return loaded_labels, loaded_encodes


def runRecognition(known_face_names, known_face_encodings):
    # Initialize some variables
    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = True
    while toRun:
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
                NEWFACES.append(saveUnknownImage(small_frame))



            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
            print ('Status::'+name)
        if len(NEWFACES) > 3:
            print('loading new ...' )
            reloadWithNewImages()

        # Display the resulting image
        cv2.imshow('Video', frame)
        # Hit 'q' on the keyboard to quit!
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break


def reloadWithNewImages():
        known_face_names, known_face_encodings =loadFacesImages(NEWFACES)

        runRecognition(known_face_names, known_face_encodings)



def saveUnknownImage(imageObject):
    millis = int(round(time.time() * 1000))
    millis = 'newfaces/' +'Hiil' + str(millis)  + '.png'
    cv2.imwrite( millis, imageObject)
    return millis


# Get a reference to webcam #0 (the default one)
video_capture = cv2.VideoCapture(0)

#load existing files

for r,d,f in os.walk('newfaces/'):
    for file in f:
        NEWFACES.append(os.path.join(r,file))

for r,d,f in os.walk('imgs/'):
    for file in f:
        NEWFACES.append(os.path.join(r,file))

print (NEWFACES)
known_face_names, known_face_encodings = loadFacesImages(NEWFACES)
runRecognition(known_face_names, known_face_encodings)
# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()
