import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import SendVerifyEmail from "../utils/MailingService.js";

// for signing up a user 
export const signup = async(req, res, next) => {
    const {username, email, password } = req.body;
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400, "All fields are required!"));
    }

    // hashing password 
    const hashpassword = bcryptjs.hashSync(password, 10);
    const token = Math.floor(100000 + Math.random() * 900000);
    const newUser = new User({
        username,
        email,
        password: hashpassword,
        token,
    });
    
    try {
        await newUser.save();
        SendVerifyEmail(newUser.username, newUser.email, token);
        res.json({
            success: true,
            message: "Registration Successfull! An Email Verification Link has been sent to your registered mail. Verify by clicking on it."
        });
    } catch (error) {
        next(error);
    }
};

//verify user email:
export const verifyEmail = async(req, res, next)=>{
    try {
      const {token, email} = req.query;
      const user = await User.findOne({ email: email });
      if(!user){
        return next(errorHandler(405, "Yoy are not registered on our Site! Please Register First."))
      }
    const validUser = await User.findOne({token});
    if(!validUser){
      const user = await User.updateOne(
        {email},
        {$set: {token:""}},
        {new:true}
      );
      return next(errorHandler(403, 'Invalid OTP Entered. You have to verify again'));
    }else{
      const user = await User.findByIdAndUpdate(
        {
          _id: validUser._id
        },
        {
          $set: {
            token:"",
            isverified: true,
          }
        },
        {new:true}
      );
      return res.status(200).json({
        success: true,
        message: "Your Account has been verified Successfully! Please Login",
      });
    }
    } catch (error) {
      next(error);
    }
    
  }

// for sigining in a user: 
export const signin = async(req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, "All fields are required!"));
    }

    try {
        const validUser = await User.findOne({ email });
        if(!validUser){
           return  next(errorHandler(404, "User not Found!"));
        }
        if(!validUser.isverified){
            return  next(errorHandler(403, "Please Verify your Email!"));
         }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400, "Invalid password"));
        }

        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin},
            process.env.JWT_SECRET_KEY );      //without expiresIn property the token is valid only till the browser is open. Once browser is closed, token will be deleted from browser.

        const {password: pass, ...rest} = validUser._doc;
        res.status(200)
            .cookie('access_token', token, { httpOnly: true})
            .json(rest);
    } catch (error) {
        next(error);
    }

};

// for sigining/signingup in a user through google popup:
export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);
            
            const { password, ...rest } = user._doc;
            res
            .status(200)
            .cookie('access_token', token, { httpOnly: true })
            .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET_KEY);
            const { password, ...rest } = newUser._doc;
            res
            .status(200)
            .cookie('access_token', token, { httpOnly: true })
            .json(rest);
        }
    } catch (error) {
        next(error);
    }
};


