import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DashboardProvider } from "@/context/DashboardProvider";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardMain from "./components/DashboardMain";
import DashboardDragOverlay from "./components/DashboardDragOverlay";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DndContext
        sensors={useSensors(
          useSensor(MouseSensor, {
            activationConstraint: {
              distance: 8,
            },
          }),
          useSensor(TouchSensor, {
            activationConstraint: {
              distance: 8,
            },
          })
        )}
      >
        <DashboardDragOverlay />
        <div className="flex items-start gap-2 h-screen overflow-hidden">
          <DashboardSidebar />
          <DashboardMain />
        </div>
      </DndContext>
    </DashboardProvider>
  );
};

export default Dashboard;
