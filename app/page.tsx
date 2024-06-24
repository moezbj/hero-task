"use client";
import React from "react";
import Dashboard from "./dashboard/page";
export default function Page({...props}) {
  console.log('page', props);
  return <Dashboard />;
}
