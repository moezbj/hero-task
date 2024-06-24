"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface NavigationProps {
  data: any;
}

const Navigate = ({ data }: NavigationProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!data) {
      router.push("/home");
    }
  }, [data, router]);
};
export default Navigate;
