import { FolderType, ProjectType } from "./folder.type";

export type DashboardState = {
  folders: FolderType[];
  projects: ProjectType[];
  isLoading: boolean;
  isSideBarOpen: boolean;
};

export type DashboardAction =
  | {
      type: "MOVE_PROJECT";
      payload: {
        updatedFolders: FolderType[];
        updatedProjects: ProjectType[];
      };
    }
  | { type: "UPDATE_FOLDER"; payload: FolderType }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SIDEBAR"; payload: boolean };

export type DashboardContextType = {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
  handleMoveProject: (folderId: number, projectId: number) => void;
  renameFolder: (folderId: number, name: string) => void;
  onToggleSidebar: () => void;
};
