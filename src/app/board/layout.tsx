import CustomLayout from "@/components/Layout/CustomLayout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <CustomLayout>
      <main className="h-full w-full">{children}</main>
    </CustomLayout>
  );
};

export default Layout;
