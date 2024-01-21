import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';


export const signup = async(req, res) => {
    const {username, email, password } = req.body;
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // hashing password 
    const hashpassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashpassword,
    });
    
    try {
        await newUser.save();
        res.json("Signup is successfull");
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

