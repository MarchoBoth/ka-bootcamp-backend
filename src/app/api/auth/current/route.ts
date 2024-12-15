import prisma from "@/lib/prisma";
import { verifyUser } from "@/lib/verify";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await verifyUser(request);

    if (!user) {
      return NextResponse.json(
        { data: null, succes: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const { password, ...props } = user;
    return NextResponse.json({
      data: props,
      succes: true,
      message: "Get current user success",
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      {
        data: null,
        succes: false,
        message: err?.message || "Internal server error",
      },
      { status: 500 },
    );
  }
}
