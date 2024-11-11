"use server";

import { string, ZodError } from "zod";
import prisma from "./lib/prisma";
import { userSignInSchema } from "./schema/user";
import { compareSync } from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { categorySchema } from "./schema/category";

//sign in
export async function signIn(formData: FormData) {
  //   try {
  //     const name = formData.get("name");
  //     await prisma.category.create({
  //       data: {
  //         name: name,
  //       },
  //     });
  //   } catch (err: any) {
  //     console.log();
  //   }
  try {
    //get data from request
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    //validasi data dari request
    userSignInSchema.parse(body);

    //get user by email
    const user = await prisma.user.findUnique({
      where: {
        email: body.email as string,
      },
    });

    //cek if user exsting or not
    if (!user) {
      throw new Error("email or pasword is wrong");
    }
    //cek if user role is ADMIN
    if (user.roles !== "ADMIN") {
      throw new Error("email or pasword is wrong");
    }

    //destructur the data
    const { password, ...props } = user;

    //chek if the pasword from request, same like the user.pasword
    if (!compareSync(body.password as string, password)) {
      throw new Error("email or pasword is wrong");
    }
    // create secret
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({
      userId: user?.id,
      email: user?.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret);

    //set cookie
    cookies().set("token", token);
    //return the token
    return { token };
    //end of try
  } catch (err: any) {
    console.log(err);
    //cek if the error is instance of ZodError
    if (err instanceof ZodError) {
      return { error: "please insert a corect data" };
      //end of if
    } else {
      return { error: err?.message || "internal server eror" };
    }
  }
}
//
export async function signOut() {
  try {
    // Clear the token cookie to log out the user
    cookies().delete("token");

    // Optionally return a message indicating success
    return { message: "Successfully signed out" };
  } catch (err: any) {
    console.log(err);
    return { error: err?.message || "Internal server error during sign out" };
  }
}

//create category
export async function createCategory(formData: FormData) {
  try {
    const body = {
      name: formData.get("name"),
      isActive: formData.get("isActive"),
      description: formData.get("description"),
    };

    categorySchema.parse(body);

    const category = await prisma.category.create({
      data: {
        name: body.name as string,
        description: body.description as string,
        isActive: body.isActive === "1" ? true : false,
      },
    });

    return {
      success: true,
      data: category,
    };
  } catch (err: any) {
    console.log(err);
    return { success: false, error: err?.message || "Internal server error" };
  }
}
