import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";

interface SiteButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  href?: string;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "ds-button-primary",
  secondary: "ds-button-secondary",
  tertiary: "ds-button-tertiary",
  ghost: "ds-button-ghost",
};

export function SiteButton({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: SiteButtonProps) {
  const classes = `${variantClass[variant]} ${className}`.trim();

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
