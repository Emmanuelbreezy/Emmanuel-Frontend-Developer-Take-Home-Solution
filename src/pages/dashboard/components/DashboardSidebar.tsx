import { Sidebar, SidebarMenu } from "@/components/ui/Sidebar";
import useDashboardContext from "@/hook/use-dashoard-context";
import SidebarFolderItem from "./SidebarFolderItem";

const DashboardSidebar = () => {
  const { state } = useDashboardContext();
  return (
    <Sidebar
      isOpen={state.isSideBarOpen}
      className={`relative transition-transform transform
      h-screen border-r border-gray-200`}
    >
      <div className="p-4 py-4 border-b border-gray-100">
        <h2 className="text-sm md:text-base font-medium">File Explorer</h2>
      </div>

      <SidebarMenu className="w-full flex-1 overflow-y-auto pl-0 py-2 lg:p-2">
        {state.folders?.map((item) => (
          <SidebarFolderItem
            key={item.id}
            id={item.id}
            name={item.name}
            projects={item.projects}
          />
        ))}
      </SidebarMenu>
    </Sidebar>
  );
};

export default DashboardSidebar;
