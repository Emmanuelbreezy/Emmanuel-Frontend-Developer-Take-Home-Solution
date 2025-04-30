import { PanelLeft } from "lucide-react";
import LoaderOverlay from "@/components/loader-overlay";
import Project from "@/components/project/Project";
import useDashboardContext from "@/hook/use-dashoard-context";

const DashboardMain = () => {
  const { state, onToggleSidebar } = useDashboardContext();
  return (
    <div
      className={`
    w-full h-auto flex-1 py-5 pl-2 pr-7 !overflow-y-auto
    transition-all duration-300 ease-in-out
     ${state.isSideBarOpen ? "ml-0" : "-ml-36 lg:-ml-64"}
  `}
    >
      <div className="mb-10 relative">
        <button
          onClick={onToggleSidebar}
          className="absolute z-50 top-0 -left-2 text-black"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {state?.projects?.map((item) => (
          <Project key={item.id} id={item.id} name={item.name} />
        ))}
      </div>
      <LoaderOverlay isLoading={state.isLoading} />
    </div>
  );
};

export default DashboardMain;
