import React from "react";
import "../../index.css";

interface PageProps {
  children: React.ReactNode | React.ReactNode[];
}

const LayoutPage = ({ children }: PageProps) => {
  return <>{children}</>;
};

export default LayoutPage;
