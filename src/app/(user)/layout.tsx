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
      <div className="flex w-full" style={{ height: "calc(100vh - 4.8rem)" }}>
        <LeftNav />
        <main className="h-full w-full">{children}</main>
      </div>
      <footer className="flex w-full justify-center text-xl text-gray-400">
        Contact us - syncd.official@gmail.com
      </footer>
    </div>
  );
};

export default Layout;
