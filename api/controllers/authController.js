import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";


export const signup = async(req, res, next) => {
    const {username, email, password } = req.body;
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400, "All fields are required!"));
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
        next(error);
    }
};

