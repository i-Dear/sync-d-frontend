import TopNavBar from "@/components/Layout/TopNavBar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen w-screen flex-col items-start justify-start">
      <TopNavBar />
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Layout;
