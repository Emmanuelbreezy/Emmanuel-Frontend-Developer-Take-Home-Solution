import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-screen pb-14  overflow-hidden">
      <main className="w-full max-w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
