import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";

type LinkProps<T> = Omit<RouterLinkProps, "state"> & {
  state?: T;
};

export const Link = <T,>({ to, target, children, ...props }: LinkProps<T>) => {
  if (typeof to === "string" && (target || to.startsWith("mailto:") || to.startsWith("tel:"))) {
    return (
      <a href={to} target={target} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={to} {...props}>
      {children}
    </RouterLink>
  );
};
