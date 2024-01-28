import Footer from "./Footer";
import Header from "./Header";
import Pagination from "./Pagination";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className="py-0 px-8">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;