import LeftNav from "@/components/Layout/LeftNav";
import TopNavBar from "@/components/Layout/TopNavBar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen w-screen flex-col items-start justify-start">
      <TopNavBar />
      <div className="flex h-full w-full justify-start">
        <LeftNav />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
