import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "./dbConnect";

const authOptions: NextAuthOptions = {
    providers: [
        // email and password authentication providers...
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;
                if(!email || !password){
                    throw new Error("email or password is not found")
                }

                await dbConnect();
                let user = await User.findOne({ email }).select("+password");
                if(!user){
                    throw new Error("User not found");
                }

                const isPasswordMatched = await bcrypt.compare(password, user.password);

                if(!isPasswordMatched){
                    throw new Error("incorrect Password");
                }

                return {
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    image:user.image,
                    role:user.role,
                }
            },
        }),

        // OAuth authentication providers...
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await dbConnect();
                try {
                    const existingUser = await User.findOne({ email: user.email });
                    if (!existingUser) {
                        await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Error saving Google user:", error);
                    return false;
                }
            }
            return true;
        },

        async jwt({token, user}){
            if(user){
                // For Google OAuth, user.id is a string, so we need to find the MongoDB user
                if (user.email) {
                    await dbConnect();
                    const dbUser = await User.findOne({ email: user.email });
                    if (dbUser) {
                        token.id = dbUser._id.toString();
                        token.name = dbUser.name;
                        token.email = dbUser.email;
                        token.image = dbUser.image;
                        token.role = dbUser.role;
                    } else {
                        // Fallback to user.id if database user not found
                        token.id = user.id;
                        token.name = user.name;
                        token.email = user.email;
                        token.image = user.image;
                        token.role = user.role;
                    }
                } else {
                    // For credentials provider, user.id is already the MongoDB _id
                    token.id = user.id;
                    token.name = user.name;
                    token.email = user.email;
                    token.image = user.image;
                    token.role = user.role;
                }
            }

            return token;
        },

        session({ session, token}){
            if(session.user){
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.image as string;
                session.user.role = token.role;
            }

            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;