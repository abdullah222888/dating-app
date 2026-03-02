// const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
// import { PrismaClient } from "@prisma/client";
// const PrismaClient = require("@prisma/client");
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();
var GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5001/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        const user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });
        if (user) {
          console.log("user already exists");
        }
        if (!user) {
          console.log("Creating new user");

          const googleUser = await prisma.user.create({
            data: {
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails?.[0].value,
              password: "abdullahhere",
              phone_no: 2,
            },
          });
          console.log(googleUser);
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

export default passport;
