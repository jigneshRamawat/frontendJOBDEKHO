import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { loginValidator, registerValidator } from "../validations/userValidate.js";

export async function register(req, res) {
    try {

        const result = registerValidator().safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.flatten().fieldErrors,
            });
        }

        const { name, title, email, password, phone } = result.data;

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const candidate = await User.create({
            name,
            title,
            email,
            password,
            phone,
        });

        candidate.password = undefined;

        const token = await candidate.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "Candidate registered successfully!",
            data: candidate,
            token,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}

export async function login(req, res) {
    try {
        const result = loginValidator.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.flatten().fieldErrors,
            });
        };

        const { email, password } = result.data;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            });
        };

        let existUser = await User.findOne({ email }).select("+password");
        if (!existUser) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        };

        let pass = await bcrypt.compare(password, existUser.password);
        if (!pass) {
            return res.status(409).json({
                success: false,
                message: "Invalid credentials"
            });
        };

        let token = await existUser.generateToken();
        existUser.password = undefined;

        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000
        }).status(200).json({
            success: true,
            message: "User login Succussfully",
            user: existUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getAllUser(req, res) {
    try {
        const getuser = await User.find({ role: "user" });
        if (!getuser) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        };

        return res.status(200).json({
            success: true,
            message: "All User fetch Successfully",
            user: getuser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getIndividualUser(req, res) {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}