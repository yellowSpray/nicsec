export default function OverlayLoader({
  loaderRef,
}: {
  loaderRef: React.RefObject<SVGSVGElement>;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <svg
        ref={loaderRef}
        width="200"
        height="200"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="50" fill="#0ea5e9" />
      </svg>
    </div>
  );
}   
