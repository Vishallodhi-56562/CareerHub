import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type:String, unique:true, required:true},
  email: { type: String, unique: true },
  password:{type: String, required:true},

  role:{
    type:String,
    enum:['user', 'admin'],
    default:'user'
  },


 profile: {
    bio: String,
    location: String,
    skills: [String],
  },

  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job"
    }
  ],
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job"
    }
  ]

 

});

export default mongoose.model("User", userSchema);
