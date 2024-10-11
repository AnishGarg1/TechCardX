const CodeChef = require("../models/Coding Profile/CodeChef");
const CodeStudio = require("../models/Coding Profile/CodeStudio");
const GeeksForGeeks = require("../models/Coding Profile/GeeksForGeeks");
const InterviewBit = require("../models/Coding Profile/InterviewBit");
const LeetCode = require("../models/Coding Profile/LeetCode");
const CodingProfile = require("../models/CodingProfile");
const User = require("../models/User");


// Save Usernames
exports.saveUsernames = async (req, res) => {
    try {
        const {email, leetcodeUser, gfgUser, ibUser, csUser, codechefUser} = req.body;

        if(!email || (!leetcodeUser && !gfgUser && !ibUser && !csUser && !codechefUser)){
            return res.status(404).json({
                success: false,
                message: "Please fill all the details",
            });
        }

        // Need to modify and try to create coding profile while creating user
        const codingProfile = new CodingProfile({ email });
        await User.findOneAndUpdate({email}, {codingProfiles: codingProfile._id});

        if(leetcodeUser){
            const leetcode = await LeetCode.findOne({ username:leetcodeUser });
            if(!leetcode){
                const newLeetCode = await LeetCode.create({ username:leetcodeUser });
                codingProfile.leetcode = newLeetCode._id;
            }
        }

        if(gfgUser){
            const gfg = await GeeksForGeeks.findOne({ username:gfgUser });
            if(!gfg){
                const newGFG = await GeeksForGeeks.create({ username:gfgUser });
                codingProfile.geeksforgeeks = newGFG._id;
            }
        }

        if(ibUser){
            const interviewbit = await InterviewBit.findOne({ username:ibUser });
            if(!interviewbit){
                const newInterviewBit = await InterviewBit.create({ username:ibUser });
                codingProfile.interviewbit = newInterviewBit._id;
            }
        }

        if(csUser){
            const codestudio = await CodeStudio.findOne({ username:csUser });
            if(!codestudio){
                const newCodeStudio = await CodeStudio.create({ username:csUser });
                codingProfile.codestudio = newCodeStudio._id;
            }
        }

        if(codechefUser){
            const codechef = await CodeChef.findOne({ username:codechefUser });
            if(!codechef){
                const newCodeChef = await CodeChef.create({ username:codechefUser });
                codingProfile.codechef = newCodeChef._id;
            }
        }

        await codingProfile.save();

        return res.status(200).json({
            success: true,
            codingProfile,
            message: "Profiles saved successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again",
        });
    }
}