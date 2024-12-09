import Navbar from "./navbar";

const Layout = ({ children }: any) => {
  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <div className=" shadow-lg h-full sm:w-[392px] w-full relative px-2 py-1">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
