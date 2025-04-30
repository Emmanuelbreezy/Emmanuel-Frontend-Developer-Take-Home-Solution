import Project from "@/components/project/Project";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

const DashboardDragOverlay = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const [overName, setOverName] = useState<string>("");

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragOver: (event) => {
      console.log("ITEM DRAG Over", event);
      setOverName(event.over?.data?.current?.name);
    },
    onDragCancel() {
      setDraggedItem(null);
    },
    onDragEnd() {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let fallbackNode = <div>No block drag</div>;
  const isProjectElement = draggedItem?.data?.current?.isProjectElement;

  if (isProjectElement) {
    const projectName = draggedItem?.data?.current?.name;
    const projectId = draggedItem?.id;
    fallbackNode = (
      <div className="relative w-full flex items-center justify-center">
        <Project
          className="!p-4 w-9/12 !h-32"
          id={projectId as number}
          name={projectName}
        />

        {overName && (
          <span
            className="absolute bottom-2 right-2 text-xs px-2 py-1 
          rounded bg-blue-100 text-gray-700 shadow-sm"
          >
            Move to {overName}
          </span>
        )}
      </div>
    );
  }

  return (
    <DragOverlay>
      <div className="opacity-90">{fallbackNode}</div>
    </DragOverlay>
  );
};

export default DashboardDragOverlay;
