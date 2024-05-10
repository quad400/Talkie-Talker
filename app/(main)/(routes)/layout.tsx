import NavSidebar from "./_components/nav-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <div className="hidden md:flex h-full md:w-[72px] w-[30px]  z-30 flex-col fixed inset-y-0">
        <NavSidebar 
        />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
