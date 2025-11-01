import { useEffect, useState } from "react";
import useLoading from "./loading-hook";

export default function useSanitizeContent(content: string) {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    // Dynamically import DOMPurify for client-side only
    const sanitizeContent = async () => {
      if (typeof window !== "undefined") {
        const DOMPurify = (await import("dompurify")).default;
        setSanitizedContent(
          DOMPurify.sanitize(content || "Super Stars Daycare"),
        );
      } else {
        // Fallback for server-side rendering
        setSanitizedContent(content || "Super Stars Daycare");
      }
    };

    sanitizeContent();

    setLoading(false);
  }, [content]);

  return { sanitizedContent, sanitizedLoading: loading };
}
