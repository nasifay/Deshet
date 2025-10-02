import Link from "next/link";
import React from "react";

type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type AnchorBaseProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export type ButtonProps = (ButtonBaseProps | AnchorBaseProps) & {
  intent?: "primary" | "accent" | "neutral";
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  rounded?: "md" | "full";
};

const base = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus-visible:ring-2 ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";
const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

function getColors(intent: NonNullable<ButtonProps["intent"]>, variant: NonNullable<ButtonProps["variant"]>) {
  const colors = {
    primary: {
      solid: "bg-primary text-white hover:bg-primary-600 ring-primary",
      outline:
        "border border-primary text-primary hover:bg-primary-50 ring-primary",
      ghost: "text-primary hover:bg-primary-50 ring-primary",
    },
    accent: {
      solid: "bg-accent text-white hover:brightness-95 ring-accent",
      outline: "border border-accent text-accent hover:bg-amber-50 ring-accent",
      ghost: "text-accent hover:bg-amber-50 ring-accent",
    },
    neutral: {
      solid:
        "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black ring-gray-900",
      outline:
        "border border-gray-300 text-gray-900 hover:bg-gray-100 ring-gray-400",
      ghost: "text-gray-700 hover:bg-gray-100 ring-gray-400",
    },
  } as const;
  return colors[intent][variant];
}

export default function Button({
  intent = "primary",
  variant = "solid",
  size = "md",
  rounded = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classNames = `${base} ${sizes[size]} ${getColors(intent, variant)} ${rounded === "full" ? "rounded-full" : "rounded-md"} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as AnchorBaseProps;
    return (
      <Link href={href} className={classNames} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classNames} {...(props as ButtonBaseProps)}>
      {children}
    </button>
  );
}