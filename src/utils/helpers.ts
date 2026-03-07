// type ImageType = "user" | "property" | "product" | "blog";
type ImageType = "user" | "property";

/*==================================================
  Get Safe Image
==================================================*/
export const getSafeImageSrc = (
  src?: string | null | undefined,
  type: ImageType = "user" // default keeps backward compatibility
) => {
  const fallbacks = {
    user: "/images/placeholders/avatar.webp",
    property: "/images/placeholders/no-image.webp",
  };

  if (!src) return fallbacks[type];

  // absolute URL
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // already root-relative
  if (src.startsWith("/")) {
    return src;
  }

  // invalid string like "9.jpg"
  return fallbacks[type];
};