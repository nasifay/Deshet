import React from "react";

type ContainerProps<T extends React.ElementType = "div"> = React.ComponentPropsWithRef<T> & {
  as?: T;
};

export default function Container<T extends React.ElementType = "div">({ as: Tag = "div" as T, className = "", ...props }: ContainerProps<T>) {
  return <Tag className={`container-default ${className}`} {...props} />;
}

