import { Loader as Spinner } from "lucide-react";

const LoaderOverlay = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-white/50
    flex items-center justify-center pointer-events-none"
    >
      <Spinner className="w-8 h-8 animate-spin text-gray-700" />
    </div>
  );
};

export default LoaderOverlay;
