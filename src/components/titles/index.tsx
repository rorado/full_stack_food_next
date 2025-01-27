import React from "react";

interface Iprop {
  styles?: string;
  title: string;
  size?: string;
}

const Title = ({ styles, size = "xl", title }: Iprop) => {
  return (
    <h3
      className={`text-secondary-foreground font-roboto text-${size} font-[800] ${styles}`}
    >
      {title}
    </h3>
  );
};

export default Title;
