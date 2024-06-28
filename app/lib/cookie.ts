"use server";
import { cookies } from "next/headers";
import graphQLResult from "./graphQLResult";

export interface UserData {
  token: {
    tokenType: String;
    accessToken: String;
    refreshToken: String;
    expiresIn: String;
  };
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export async function setUser(data: UserData) {
  const cookieStore = cookies();
  const apiResult = graphQLResult(data as any);

  await cookieStore.set({
    name: "user",
    value: JSON.stringify(apiResult),
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365 * 1000,
    expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
  });
}

export async function getUser() {
  const cookieStore = cookies();
  const user = await cookieStore.get("user");
  if (user) {
    const res = JSON.parse(JSON.stringify(user.value));
    if (res) {
      return JSON.parse(res);
    }
  }
}
export async function deleteUser() {
  const cookieStore = cookies();
  await cookieStore.delete("user");
}
