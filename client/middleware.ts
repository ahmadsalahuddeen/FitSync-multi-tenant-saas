import {withAuth}  from "next-auth/middleware"
import NextAuth from "next-auth/next"
import { NextResponse } from "next/server"




export const  config = {matcher: ["/dashboard/:path*"]}