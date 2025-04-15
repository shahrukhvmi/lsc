import React from "react";
import defaultLogo from "../../public/images/lsc-logo.png";

const ApplicationLogo = ({ logoUrl, ...props }) => {
  // If logoUrl is provided via props (e.g. from global context or props), use it
  const logoSrc = logoUrl || defaultLogo;

  return <img src={logoSrc} alt="Logo" {...props} />;
};

export default ApplicationLogo;
