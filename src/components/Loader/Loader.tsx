import React, { CSSProperties } from "react";

import './Loader.css';

const Loader: React.FC<{ style?: CSSProperties; className?: string }> = ({
  className,
}) => {
  return <div className={`loader ${className}`}></div>;
};

export default Loader;
