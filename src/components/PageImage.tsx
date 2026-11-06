export function PageImage({
  src,
  alt,
  className = "",
  fit = "cover",
  width = 1280,
  height = 720,
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "full";
  width?: number;
  height?: number;
}) {
  const sizing =
    fit === "full"
      ? "w-full h-auto object-contain"
      : "w-full max-h-72 object-cover";
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-2xl shadow-sm ${sizing} ${className}`}
    />
  );
}
