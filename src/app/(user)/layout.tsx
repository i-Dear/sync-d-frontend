import CustomLayout from "@/components/Layout/CustomLayout";
import LeftNav from "@/components/Layout/LeftNav";
import TopNavBar from "@/components/Layout/TopNavBar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <CustomLayout>
      <div className="flex h-full w-screen">
        <LeftNav />
        <main className="h-full w-full">{children}</main>
      </div>
      <footer className="flex w-full justify-center text-xl text-gray-400">
        Contact us - syncd.official@gmail.com
      </footer>
    </CustomLayout>
  );
};

export default Layout;
