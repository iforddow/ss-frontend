// Custom loader for Directus images
export const directusImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // Extract the asset ID from the full URL
  let assetId = src.split("/assets/")[1];

  // If no asset ID found, try to get it from the end of the URL
  if (!assetId) {
    const urlParts = src.split("/");
    assetId = urlParts[urlParts.length - 1];
  }

  if (!assetId) return src;

  // Remove any existing query parameters from the asset ID
  assetId = assetId.split("?")[0];

  // Use Directus transform API for optimization
  const params = new URLSearchParams({
    width: width.toString(),
    quality: (quality || 75).toString(),
    format: "webp",
  });

  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${assetId}?${params}`;
};
