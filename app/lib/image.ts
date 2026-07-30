export function isImagePath(image: string): boolean {
  return image.startsWith("/") || image.startsWith("http://") || image.startsWith("https://");
}
