import face_recognition
import os
# path = 'imgs/'
#
# files = []
# # r=root, d=directories, f = files
# for r, d, f in os.walk(path):
#     for file in f:
#         #if in file:
#         files.append(os.path.join(r, file))
#
# for f in files:
#     print(f)
#exit(0)

# Load the jpg files into numpy arrays
biden_image = face_recognition.load_image_file("imgs/biden.jpg")
obama_image = face_recognition.load_image_file("imgs/obama.jpg")
kinsley_image = face_recognition.load_image_file("imgs/Me.jpg")
unknown_image = face_recognition.load_image_file('imgs/me2.jpg')

# Get the face encodings for each face in each image file
# Since there could be more than one face in each image, it returns a list of encodings.
# But since I know each image only has one face, I only care about the first encoding in each image, so I grab index 0.
try:
    biden_face_encoding = face_recognition.face_encodings(biden_image)[0]
    obama_face_encoding = face_recognition.face_encodings(obama_image)[0]
    kinsley_face_encoding = face_recognition.face_encodings(kinsley_image)[0]
    unknown_face_encoding = face_recognition.face_encodings(unknown_image)[0]
except IndexError:
    print("I wasn't able to locate any faces in at least one of the images. Check the image files. Aborting...")
    quit()

known_faces = [
    biden_face_encoding,
    obama_face_encoding , kinsley_face_encoding
]

# results is an array of True/False telling if the unknown face matched anyone in the known_faces array
results = face_recognition.compare_faces(known_faces, unknown_face_encoding)

print("Is the unknown face a picture of Biden? {}".format(results[0]))
print("Is the unknown face a picture of Obama? {}".format(results[1]))
print("Is the unknown face a picture of Kinsley? {}".format(results[2]))
print("Is the unknown face a new person that we've never seen before? {}".format(not True in results))