export interface ProjectType {
  id: number;
  name: string;
}

export type FolderType = {
  id: number;
  name: string;
  projects: ProjectType[];
};
