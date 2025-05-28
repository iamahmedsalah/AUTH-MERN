const User = require("../models/userModel");

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const { generateTokenSetCookie } = require("../utils/generateTokenSetCookie");

const { 
    sendVerficationEmail, 
    sendWelcomeEmail, 
    sendPasswordResetEmail,
    sendResetSuccessEmail 
    } = require("../emails/emails");

// Signup controller
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please fill in all fields" });
        }
        if (name.match(/^[a-zA-Z ]+$/) && name.length < 3) {
            return res.status(400).json({ msg: "Name field must contain only letters" });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verficationToken = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verficationToken,
            verficationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        console.log(newUser);
        await newUser.save();

        // jwt
        generateTokenSetCookie(res, newUser._id);

        await sendVerficationEmail(newUser.email, verficationToken, newUser.name);

        res.status(201).json({
            success: true,
            msg: "User created successfully",
            newUser: {
                ...newUser._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verify email controller
const verifyEmail = async (req, res) => {
    // Verify code
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verficationToken: code,
            verficationTokenExpireAt: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ msg: "Invalid verification code" });
        }

        user.isVerified = true;
        user.verficationToken = undefined;
        user.verficationTokenExpireAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({ msg: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("Please fill in all fields");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        if (user.isVerified === false) {
            return res.status(400).json({ msg: "Email not verified" });
        }

        generateTokenSetCookie(res, user._id);

        user.lastLogin = Date.now();
        await user.save();

        res.status(200).json({
            msg: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Logout controller
const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ msg: "Logged out successfully" });
};

// Forget password controller
const forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Please enter your email address" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1 Hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpireAt = resetTokenExpireAt;
        
        await user.save();

        // Send email
        await sendPasswordResetEmail(user.email, `${process.env.PRODUCTION_URL}/reset-password/${resetToken}` , user.name);
        res.status(200).json({ msg: "Password reset email sent successfully" });


    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Reset password controller
const resetPassword = async (req, res) => {

    try{
        const {token} = req.params;  
        const {password} = req.body;
        if (!password) {
            throw new Error( "Please enter your new passord" );
        }
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpireAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ msg: "Invalid or expired reset passord link" });
        }

        // Update password and hash it
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpireAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email, user.name);

        res.status(200).json({ msg: "Password reset successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Check auth controller
const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
        // console.log(req.userId);
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}
		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


module.exports = { 
    signup, 
    login,
    logout, 
    verifyEmail, 
    forgetPassword, 
    resetPassword,
    checkAuth,};
