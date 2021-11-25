
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";


interface ActiveLinksProps extends LinkProps {
  children: ReactElement;
  shouldMathExactHref?: boolean;
}

export function ActiveLink({ children, shouldMathExactHref = false, ...rest }: ActiveLinksProps) {
  const { asPath } = useRouter()
  let isActive = false;


  if (shouldMathExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (!shouldMathExactHref &&
    (asPath.startsWith(String(rest.href)) ||
      asPath.startsWith(String(rest.as))
    )) {
    isActive = true;
  }

  return (

    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'

      })}
    </Link>
  )
}