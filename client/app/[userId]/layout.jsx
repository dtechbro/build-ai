import SideBar from "@/components/Sidebar";
import { UserContextProvider } from "@/context/UserContext";

function Layout({ children }) {
  return (
    <>
      <UserContextProvider>
        <section className="flex ">
          <SideBar />
          {children}
        </section>
      </UserContextProvider>
    </>
  );
}

export default Layout;
