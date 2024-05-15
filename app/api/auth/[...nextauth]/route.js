import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import mongoose from 'mongoose';
import connectDB from './db/connectDB';
import User from '@/models/User';
import randomstring from 'randomstring';

export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
    GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider === 'github' || account.provider === 'google') {
        //connect to database
        await connectDB();
        //check if user is already existing in database
        // const currentUser = await client.db("user").collection("users").findOne({email});
        const currentUser = await User.findOne({email:user.email});
        console.log(currentUser);

        if(!currentUser){
          const checkUsername = await User.findOne({username: user.email.split('@')[0]});
          if(!checkUsername){
            const newUser = await User.create({
              email: user.email,
              username: user.email.split('@')[0],
              date:[new Date().getSeconds(),new Date().getMinutes(),new Date().getHours(),new Date().getDate(),new Date().getMonth()+1,new Date().getFullYear()]
            })
            console.log(newUser);

          }
          const newUser = await User.create({
            email: user.email,
            username: randomstring.generate(6),
            date:[new Date().getSeconds(),new Date().getMinutes(),new Date().getHours(),new Date().getDate(),new Date().getMonth()+1,new Date().getFullYear()]
          })
          console.log(newUser);
        }
        else{
          console.log('user already exists')
        }       
        return true;
      }
    },
    async session({ session, token, user }) {
      const dbUser = await User.findOne({email: session.user.email});
      session.user.name = dbUser.username;
      return session;
    }
  }
})

export {authoptions as GET, authoptions as POST}