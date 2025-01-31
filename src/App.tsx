import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ReactNode, useState } from "react";
import { LiaBirthdayCakeSolid, LiaBanSolid } from "react-icons/lia";
import { MdOutlineCurrencyRupee, MdGroup, MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import ProfilePage from "./components/pages/ProfilePage";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import LoginPage from "@/components/pages/LoginPage";
import GroupsPage from "@/components/pages/GroupsPage";
import MembersPage from "@/components/pages/MembersPage";
import BirthdaysPage from "@/components/pages/BirthdaysPage";
import DonationsPage from "@/components/pages/DonationsPage";
import DashboardPage from "./components/pages/DashboardPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import BlacklistsPage from "./components/pages/BlacklistsPage";

export interface Routes {
  name: string;
  path: string;
  element: JSX.Element;
  icon?: ReactNode;
  showInSidebar?: boolean;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const routes: Routes[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      element: <DashboardPage />,
      icon: <MdDashboard size={"30px"} />,
      showInSidebar: true,
    },
    {
      name: "Members",
      path: "/dashboard/members",
      element: <MembersPage />,
      icon: <FaUser size={"22px"} />,
      showInSidebar: true,
    },
    {
      name: "Groups",
      path: "/dashboard/groups",
      element: <GroupsPage />,
      icon: <MdGroup size={"30px"} />,
      showInSidebar: true,
    },
    {
      name: "Birthdays",
      path: "/dashboard/birthdays",
      element: <BirthdaysPage />,
      icon: <LiaBirthdayCakeSolid size={"30px"} />,
      showInSidebar: true,
    },
    {
      name: "Blacklists",
      path: "/dashboard/blacklists",
      element: <BlacklistsPage />,
      icon: <LiaBanSolid size={"30px"} />,
      showInSidebar: true,
    },
    {
      name: "Donations",
      path: "/dashboard/donations",
      element: <DonationsPage />,
      icon: <MdOutlineCurrencyRupee size={"30px"} />,
      showInSidebar: true,
    },
    {
      name: "Not Found",
      path: "*",
      element: <NotFoundPage />,
      showInSidebar: false,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      element: <ProfilePage />,
      icon: <FaUser size={"22px"} />,
      showInSidebar: true,
    },
  ];

  function Layout() {
    return (
      <>
        <div className="flex min-h-screen bg-secondary overflow-hidden">
          <div
            className={`${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }  md:opacity-100 md:translate-x-0 bg-secondary/50 backdrop-blur-md transition-transform duration-500 ease-in-out fixed top-0 left-0 h-full z-10 md:relative`}
          >
            <Sidebar
              routes={routes.filter((route) => route.showInSidebar)}
              toggleMenu={toggleMenu}
            />
          </div>
          <div className="flex flex-col w-full">
            <Header toggleMenu={toggleMenu} />
            <div className="sm:p-8 p-4 bg-primary h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      element: <Layout />,
      children: routes.map((route) => {
        return { path: route.path, element: route.element };
      }),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
