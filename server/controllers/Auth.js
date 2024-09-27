const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Token = require("../models/Token");

// Signup
exports.signup = async (req, res) => {
    try {
        const {username, firstName, lastName, email, password, confirmPassword, token} = req.body;

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

        const user = await User.create({
            username,
            firstName,
            lastName,
            email,
            password: hashedPass,
            profileId: userProfile._id,
        });

        await user.save();

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
const login = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if((!username && !email) || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the details",
            });
        }

        let user;
        if(username){
            user = await User.findOne({username}).populate("profileId");
        } else{
            user = await User.findOne({email}).populate("profileId"); 
        }

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User is not registered, Please SignUp First",
            });
        }

        const verify = await bcrypt.compare(password, user.passWord);
        if(!verify){
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

        if(!user.verified){
            return res.status(401).json({
                success: false,
                message: "Please first verify your email",
            });
        }

        const token = jwt.token(
            {userId: user._id, username: user.username, email: user.email},
            process.env.JWT_SECRET,
            {
                expiresIn: '24h',
            }
        )

        user.token = token;
        await user.save();
        
        user.passWord = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        req.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Login successfully",
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again",
        });
    }
}

// SendToken
const sendToken = async (req, res) => {
    try {
        const {username} = req.body;

        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User is already registered",
            });
        }

        const token = jwt.sign({username: username}, process.env.TOKEN_SECRET, {expiresIn: '10m'});

        const tokenDocument = await Token.create({
            username,
            token,
        });

        return res.status(200).json({
            success: true,
            message: "Token sent successfully",
            token,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again",
        });
    }
}

// VerifyToken
const verifyToken = async (req, res) => {
    try {
        const {token} = req.params;

        let username;
        try {
            const decode = await jwt.verify(token, process.env.TOKEN_SECRET);
            username = decode.username;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid link",
            });
        }
        
        const tokenDoc = await Token.findOne({
            username,
            token
        });

        if(!tokenDoc){
            return res.status(401).json({
                success: false,
                message: "Invalid link",
            });
        }

        await User.findByIdAndUpdate(user._id, {verified: true});
        await Token.deleteOne({username, token});

        return res.status(200).json({
            success: false,
            message: "Email verified successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again",
        });
    }
}