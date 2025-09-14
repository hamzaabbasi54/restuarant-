import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userSignup = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Email and password are required" 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        const hashPwd = await bcrypt.hash(password, 10);
        const newUser = await User.create({ 
            email, 
            password: hashPwd 
        });

        const token = jwt.sign(
            { 
                email, 
                id: newUser._id 
            },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.status(201).json({ 
            success: true,
            message: "User created successfully",
            user: {
                id: newUser._id,
                email: newUser.email
            },
            token 
        });

    } catch (error) {
        console.error("❌ Signup Error:", error);
        return res.status(500).json({ 
            success: false,
            message: "Failed to create user",
            error: error.message 
        });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({email});
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {
                    email,
                    id: user._id
                },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                success: true,
                message: "Login successful",
                user:{
                    id: user._id,
                    email: user.email
                },
                token
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    } catch (error) {
        console.error("❌ Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        console.error("❌ Get User Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get user",
            error: error.message
        });
    }
}
