import NextAuth, { AuthOptions } from "next-auth";
import bcrypt from "bcrypt"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import  CredentialsProvider from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers/index";
import { Pclient } from "@/lib/prismadb";
import { Role } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter"
  

export const authOptions :AuthOptions = {
    adapter: PrismaAdapter(Pclient),
    providers:[
        GithubProvider({
          clientId: process.env.GITHUB_ID as string,
          clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),  CredentialsProvider({
            id: "admin",
            name: "admin Credentials",
            type: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials);
                if (!credentials) {
                    return null;
                }
                const username = credentials.username;
                const password = credentials.password;
                // Add logic here to look up the user from the credentials supplied
        
                const admin = await Pclient.user.findUnique({
                    where:{
                        email: username,
                        role: "ADMIN"
                    }
                })

                if (!admin) {
                    throw new Error('Admin doesnt exist');
                    
                } else {
                const isCorrectPassword = await bcrypt.compare(
                        credentials.password,
                        admin.hashedpassword
                      );
              
    
                if (!isCorrectPassword|| admin.email !== username) {
                        throw new Error('Invalid credentials');
                    }
                const role =  Role.ADMIN;
                const user = await Pclient.user.findUnique({
                where:{
                    email:username,
                    role
                }
                })
                console.log(user)
                    return user
                }
            }
        }),CredentialsProvider({ id: "user",
        name: "user Credentials",
        type: "credentials",
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        }, async authorize(credentials, req) {
            console.log(credentials)
            if (!credentials) {
                return null;
            }
            const username = credentials.username;
            const password = credentials.password;
            // Add logic here to look up the user from the credentials supplied
           

        
            const student =  await Pclient.user.findUnique({
              where:{  
                email:username,
                role:'USER'
            }
            })
            if (!student) {
                throw new Error('student doesnt exist');
                
            } else {
                //TODO:: Make this safer, encrypt passwords
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    student.hashedpassword
                  );
          
  

                if (!isCorrectPassword|| student.email !== username) {
                    throw new Error('Invalid credentials');
                }

                // User is authenticated
                const role =  Role.USER;
                const user = await Pclient.user.findUnique({
                where:{
                    email:username,
                    role
                }
                })
                    return user
            }
        }}),
    ] as Provider[],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };