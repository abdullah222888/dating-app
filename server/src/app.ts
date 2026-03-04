import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
const { join } = require("node:path");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
import passport from "./controllers/googleAuth.controller";
import facebookAuth from "./controllers/facebookAuth.controller";
const AuthRouter = require("../src/routes/auth.routes");
const userRoutes = require("../src/routes/user.routes");
const userDetails = require("../src/routes/userDetails.routes");
const termsRoutes = require("../src/routes/terms.routes");
const policyRoutes = require("../src/routes/privacyPolicy.routes");
const guidelinesRoutes = require("../src/routes/guidelines.routes");
const matchRoutes = require("../src/routes/match.routes");
const likeRoutes = require("../src/routes/like.routes");
const chatRoutes = require("../src/routes/chat.routes");
const unlikeRoutes = require("../src/routes/unlikes.routes");
const BlocklistRoutes = require("../src/routes/blocklist.routes");
const forgotPasswordRoutes = require("../src/routes/forgotPassword.routes");

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: `RISHTA APP BACKEND is listening on ${PORT}` });
});

app.use("/api/auth", AuthRouter);
app.use("/api/auth", userRoutes);

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  }),
);
// facebook Auth Routes
app.get("/auth/facebook", facebookAuth.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  facebookAuth.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  },
);

//Get All Users
app.use("/api", userRoutes);

//userDetails Routes
app.use("/api/userDetails", userDetails);

//terms

app.use("/api", termsRoutes);

//Privacy Policies

app.use("/api", policyRoutes);

//Guidelines
app.use("/api", guidelinesRoutes);

//match routes
app.use("/api", matchRoutes);
app.use("/api", likeRoutes);
app.use("/api", chatRoutes);
app.use("/api", unlikeRoutes);
app.use("/api", BlocklistRoutes);
app.use("/api", forgotPasswordRoutes);

// socket io integrations

io.on("connection", (socket) => {
  // handle disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
