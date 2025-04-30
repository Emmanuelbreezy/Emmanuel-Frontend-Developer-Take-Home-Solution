import { FC } from "react";
import { useDraggable } from "@dnd-kit/core";
import Card from "../ui/Card";

interface ProjectProps {
  id: number;
  name: string;
  className?: string;
}

const Project: FC<ProjectProps> = ({ id, name, className }) => {
  const draggable = useDraggable({
    id: id,
    data: {
      name: name,
      isProjectElement: true,
    },
  });
  return (
    <Card
      ref={draggable.setNodeRef}
      className={`
        shadow-sm shrink-0 h-40 flex justify-center items-center
        hover:shadow-md
        ${className}
        ${
          draggable.isDragging &&
          "ring-1 ring-blue-400/80 drop-shadow-md !cursor-move"
        }
    `}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      {name}
    </Card>
  );
};

export default Project;
