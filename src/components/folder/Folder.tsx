import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ProjectType } from "@/@types/folder.type";

interface FolderProps {
  name: string;
  id: number;
  className?: string;
  projects?: ProjectType[];
  onRename?: (folderId: number, updateName: string) => void;
}

const Folder = React.forwardRef<HTMLDivElement, FolderProps>(
  ({ id, name, projects = [], onRename, className }, ref) => {
    const [isOpen, setIsOpen] = useState(true);
    const [folderName, setFolderName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const handleRename = (e: React.FormEvent) => {
      e.preventDefault();
      setIsEditing(false);
      onRename?.(id, folderName);
    };

    return (
      <div className="w-full">
        <div
          ref={ref}
          className={`w-full flex items-center justify-between py-2 px-3
             hover:bg-gray-50 rounded-md cursor-pointer transition-colors
             ${className}`}
          onClick={() => setIsOpen(!isOpen)}
          onDoubleClick={() => setIsEditing(true)}
        >
          <div className="w-full flex items-center gap-2">
            <span>📁</span>
            {isEditing ? (
              <form onSubmit={handleRename} className="flex-1">
                <input
                  type="text"
                  value={folderName}
                  autoFocus
                  onChange={(e) => setFolderName(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  className="text-sm font-medium bg-transparent
                     outline-none border-b border-gray-400 w-full"
                />
              </form>
            ) : (
              <span className="text-sm font-medium">{name}</span>
            )}
          </div>
          <ChevronRight
            className={`h-4 w-4 text-gray-500 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </div>

        <div
          className={`ml-6 overflow-hidden transition-opacity
            duration-300 ease-in-out ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {projects.map((project) => (
            <span
              key={project.id}
              className="block text-sm text-gray-700 py-1 pl-4 border-l
             border-gray-200"
            >
              📄 {project.name}
            </span>
          ))}
        </div>
      </div>
    );
  }
);

export default Folder;
