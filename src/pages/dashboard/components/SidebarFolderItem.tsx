import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { SidebarMenuItem } from "../../../components/ui/Sidebar";
import useDashboardContext from "@/hook/use-dashoard-context";
import { ProjectType } from "@/@types/folder.type";
import Folder from "../../../components/folder/Folder";

const SidebarFolderItem = ({
  id,
  name,
  projects,
}: {
  id: number;
  name: string;
  projects: ProjectType[];
}) => {
  const { handleMoveProject, renameFolder } = useDashboardContext();
  const droppable = useDroppable({
    id,
    data: {
      isFolder: true,
      folderId: id,
      name: name,
    },
  });
  useDndMonitor({
    onDragEnd: async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || !active) return;

      const isProjectElement = active?.data?.current?.isProjectElement;
      const isDraggingOverFolder = over.data?.current?.isFolder;
      console.log(isProjectElement, "isDraggingOverFolder");

      if (isProjectElement && isDraggingOverFolder) {
        const overBlockId = over?.id;
        const projectId = active.id;
        //console.log(over, active, "over, active");
        handleMoveProject(+overBlockId, +projectId);
      }
    },
  });
  return (
    <SidebarMenuItem>
      <Folder
        ref={droppable.setNodeRef}
        id={id}
        name={name}
        projects={projects}
        onRename={renameFolder}
        className={`rounded-md transition-colors
        ${droppable.isOver && "bg-blue-100 drop-shadow-md scale-[1.01]"}`}
      />
    </SidebarMenuItem>
  );
};

export default SidebarFolderItem;
