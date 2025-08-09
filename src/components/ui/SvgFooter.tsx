import { useMediaQuery } from "../../hooks/use-media-query";

export default function BgFooter() {
  const isDesktopLarge = useMediaQuery("(min-width: 1100px)");
  const isDesktop = useMediaQuery("(min-width: 816px)");

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={
        isDesktopLarge
          ? "0 0 1120 600"
          : isDesktop
          ? "0 0 895 800"
          : "0 0 680 1115"
      }
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isDesktopLarge ? (
        <path
          d="M1100 0C1111.05 0 1120 8.95431 1120 20V580C1120 591.046 1111.05 600 1100 600H84C72.9543 600 64 591.046 64 580V429C64 417.954 55.0457 409 44 409H20C8.95431 409 0 400.046 0 389V20C9.2773e-06 8.95431 8.95431 0 20 0H1100Z"
          fill="#394149"
        />
      ) : isDesktop ? (
        <path
          d="M875 0C886.046 4.18767e-06 895 8.95431 895 20V780C895 791.046 886.046 800 875 800H84C72.9543 800 64 791.046 64 780V429C64 417.954 55.0457 409 44 409H20C8.95431 409 0 400.046 0 389V20C0 8.95431 8.95431 0 20 0H875Z"
          fill="#394149"
        />
      ) : (
        <path
          d="M660 0C671.046 1.03081e-05 680 8.95431 680 20V1095C680 1106.05 671.046 1115 660 1115H84C72.9543 1115 64 1106.05 64 1095V429C64 417.954 55.0457 409 44 409H20C8.95431 409 0 400.046 0 389V20C1.40135e-05 8.95432 8.95431 4.02662e-08 20 0H660Z"
          fill="#394149"
        />
      )}
    </svg>
  );
}
