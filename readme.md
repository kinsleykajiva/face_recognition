


RethinkDB details:
  Database : testplatform_face_recog
  reference_example:testplatform_face_recog.users

  //r.db('testplatform_face_recog').table("users")


  r.db('testplatform_face_recog').table("users").insert({
   "id": "f62255a8259f",
  "name":"Kinsley",
   "username": "me"
})


r.db('testplatform_face_recog').table('faces_images').forEach((entry)=>{
    return r.db('testplatform_face_recog').table('faces_images').get(entry('id')).delete();
});
