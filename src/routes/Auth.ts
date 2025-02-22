import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { id: string };
}

// Register Route
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ success: true, msg: "User created" });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});

// Login Route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});

// Middleware to Verify Token
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ success: false, msg: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET as string) as { id: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, msg: "Invalid token" });
  }
};

// Get Profile Route
router.get("/profile", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, msg: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in /profile:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});

export default router;