// import { PrismaClient } from "@prisma/client";
var FacebookStrategy = require("passport-facebook").Strategy;
// const { PrismaClient } = require("@prisma/client");
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

const passport = require("passport");
const facebookAuth = passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:5001/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      const existingUser = await prisma.user.findUnique({
        where: { id: profile.id },
      });
      if (existingUser) {
        console.log("User already Exists");
      }
      if (!existingUser) {
        const facebookUser = await prisma.user.create({
          data: {
            id: profile.id,
            username: profile.displayName,
            password: "facebook123",
            email: "nothing@gmail.com",
            phone_no: "3",
          },
        });
        console.log(facebookUser);
      }
    },
  ),
);
export default facebookAuth;
