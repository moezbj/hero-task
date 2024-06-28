"use client";
import React, { useEffect, useState } from "react";
import Drawer from "@/components/layout/drawer";
import Header from "@/components/layout/header";
import { useRouter } from "next/navigation";

interface WrapperProps {
  children: React.ReactNode;
  data?: any;
}

const Wrapper = ({ children, data }: WrapperProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!data) {
      router.push("/home");
    }
  }, [data, router]);

  return (
    <div>
      <Header data={data} />
      <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen}>
        {children}
      </Drawer>
    </div>
  );
};

export default Wrapper;
