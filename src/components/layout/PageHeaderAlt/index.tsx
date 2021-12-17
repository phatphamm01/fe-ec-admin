import React, { useRef, useEffect, useState, ReactChild } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

interface IPageHeaderAlt {
  children?: ReactChild;
  background?: string;
  className?: string;
  overlap?: boolean;
}

const PageHeaderAlt: React.FC<IPageHeaderAlt> = ({
  children,
  background,
  className,
  overlap,
  navType,
}: any) => {
  const [widthOffset, setWidthOffset] = useState(0);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (navType === "TOP") {
      const windowSize = window.innerWidth;
      const pageHeaderSize = ref?.current?.offsetWidth;
      setWidthOffset((windowSize - pageHeaderSize) / 2);
    }
  }, [navType]);

  const getStyle = () => {
    let style: any = {
      backgroundImage: background ? `url(${background})` : "none",
    };
    if (navType === "TOP") {
      style.marginRight = -widthOffset;
      style.marginLeft = -widthOffset;
      style.paddingLeft = 0;
      style.paddingRight = 0;
    }
    return style;
  };

  return (
    <div
      ref={ref}
      className={`page-header-alt ${className ? className : ""} ${
        overlap && "overlap"
      }`}
      style={getStyle()}
    >
      {navType === "TOP" ? (
        <div className="container">{children}</div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default PageHeaderAlt;
