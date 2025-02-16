import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="hidden lg:block bg-gradient-to-br from-primary via-black to-primary/50" />
      <Outlet />
    </div>
  );
}
