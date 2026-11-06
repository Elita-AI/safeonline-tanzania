export function PageImage({
  src,
  alt,
  className = "",
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "full";
}) {
  const sizing =
    fit === "full"
      ? "w-full h-auto object-contain"
      : "w-full max-h-72 object-cover";
  return (
    <img
      src={src}
      alt={alt}
      width={1242}
      height={1037}
      className={`rounded-2xl shadow-sm ${sizing} ${className}`}
    />
  );
}
