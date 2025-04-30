import { useContext } from "react";
import { DashboardContext } from "@/context/DashboardProvider";

const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export default useDashboardContext;
