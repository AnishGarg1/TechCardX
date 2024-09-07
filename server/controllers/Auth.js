const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const User = require("../models/User");

// Signup
exports.signup = async (req, res) => {
    try {
        const {username, firstName, lastName, email, password, confirmPassword} = req.body;

        if(!username || !firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(404).json({
                success: false,
                message: "Please fill all the details",
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exist",
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password do not match",
            });
        }

        const userProfile = await Profile.create({
            userImg: null,
            gender: null,
            about: null,
            contactNo: null,
        });

        const saltRound = 10;
        const hashedPass = await bcrypt.hash(password, saltRound);


        // Need to verify email either with otp or verification email
        
        const user = await User.create({
            username,
            firstName,
            lastName,
            email,
            password: hashedPass,
            profileId: userProfile._id,
        });

        return res.status(200).json({
            success: true,
            user,
            message: "Signup successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again",
        });
    }
}

// Login