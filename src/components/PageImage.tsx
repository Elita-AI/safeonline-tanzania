export function PageImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={1280}
      height={720}
      className={`w-full max-h-72 object-cover rounded-2xl shadow-sm ${className}`}
    />
  );
}
