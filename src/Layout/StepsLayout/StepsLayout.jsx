import React from "react";
import Header from "../../components/Header";

const StepsLayout = ({ children }) => (
  <>
    <Header />
    {/* <ProgressBar /> */}
    <main>{children}</main>
    {/* <Footer /> */}
  </>
);

export default StepsLayout;
