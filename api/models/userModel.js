import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/026/266/484/non_2x/default-avatar-profile-icon-social-media-user-photo-image-vector.jpg",
    },
    isAdmin: {
        type: Boolean,
        default:false,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User; 
