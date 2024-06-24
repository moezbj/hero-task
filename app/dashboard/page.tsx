"use client";
import React from "react";
import { deleteUser } from "@/lib/cookie";

const destroyCookies = async () => {
  await deleteUser();
};

const Page = () => {
  const deleteUse = destroyCookies;
  return <div onClick={() => deleteUse()}>Deconnecte</div>;
};

export default Page;
