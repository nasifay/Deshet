import React from "react";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
};

export default function Container({ as: Tag = "div", className = "", ...props }: ContainerProps) {
  const Component = Tag as React.ElementType;
  return <Component className={`container-default ${className}`} {...props} />;
}