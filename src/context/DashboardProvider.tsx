import {
  DashboardAction,
  DashboardContextType,
  DashboardState,
} from "@/@types/dashboard.type";
import { folderData, projectData } from "@/data/data";
import { createContext, useReducer, ReactNode } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const DashboardContext = createContext<DashboardContextType | null>(
  null
);

const initialState: DashboardState = {
  folders: [],
  projects: [],
  isLoading: false,
  isSideBarOpen: true,
};

function reducer(
  state: DashboardState,
  action: DashboardAction
): DashboardState {
  switch (action.type) {
    case "MOVE_PROJECT":
      return {
        ...state,
        folders: action.payload.updatedFolders,
        projects: action.payload.updatedProjects,
      };
    case "UPDATE_FOLDER":
      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder.id === action.payload.id ? action.payload : folder
        ),
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_SIDEBAR":
      return { ...state, isSideBarOpen: action.payload };
    default:
      return state;
  }
}

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    folders: folderData,
    projects: projectData,
  });

  const handleMoveProject = async (folderId: number, projectId: number) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const projectToMove = state.projects.find((p) => p.id === projectId);
      if (!projectToMove) return;

      const updatedFolders = state.folders.map((folder) =>
        folder.id === folderId
          ? { ...folder, projects: [...folder.projects, projectToMove] }
          : folder
      );
      const updatedProjects = state.projects.filter((p) => p.id !== projectId);

      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: `Project Id ${projectId} moved to folderId ${folderId}`,
            updatedAt: new Date().toISOString(),
          });
        }, 400);
      });
      console.log("Mock APi Response:", response);
      // console.log(updatedFolders, "updatedFolders");
      // console.log(updatedProjects, "updatedProjects");

      dispatch({
        type: "MOVE_PROJECT",
        payload: { updatedFolders, updatedProjects },
      });
    } catch (error) {
      console.log("Failed to move project:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const renameFolder = (folderId: number, updateName: string) => {
    const folder = state.folders.find((folder) => folder.id === folderId);
    if (!folder) {
      alert("Folder not found");
      return;
    }
    const updatedFolder = { ...folder, name: updateName };
    dispatch({
      type: "UPDATE_FOLDER",
      payload: updatedFolder,
    });
  };

  const onToggleSidebar = () => {
    dispatch({ type: "SET_SIDEBAR", payload: !state.isSideBarOpen });
  };

  return (
    <DashboardContext.Provider
      value={{
        state,
        dispatch,
        renameFolder,
        handleMoveProject,
        onToggleSidebar,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
