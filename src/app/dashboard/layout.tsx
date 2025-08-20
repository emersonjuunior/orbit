import DashboardHeader from "./components/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
};

export default DashboardLayout;
