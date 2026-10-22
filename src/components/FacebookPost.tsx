import { useEffect, useRef, useState } from "react";

// Normalise links so the embed plugin recognises them (mobile and tracking variants)
export const normaliseFacebookUrl = (url: string) => {
  try {
    const parsed = new URL(url.trim());
    parsed.hostname = parsed.hostname.replace(/^(m|mbasic|web)\./, "www.");
    ["mibextid", "rdid", "share_url", "__cft__[0]", "__tn__"].forEach((key) => parsed.searchParams.delete(key));
    return parsed.toString();
  } catch {
    return url.trim();
  }
};

export const isFacebookUrl = (url: string) => {
  try {
    const host = new URL(url.trim()).hostname;
    return /(^|\.)facebook\.com$/.test(host) || host === "fb.watch";
  } catch {
    return false;
  }
};

interface FacebookPostProps {
  url: string;
}

// Facebook's post plugin as an iframe: shows the post's photo, text and reactions
// without the Facebook SDK. The plugin renders at a fixed width, so it is sized
// to the card it sits in.
const FacebookPost = ({ url }: FacebookPostProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(500);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(320, Math.min(500, Math.floor(el.clientWidth))));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const href = normaliseFacebookUrl(url);
  const src = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(href)}&show_text=true&width=${width}`;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      <iframe
        key={width}
        src={src}
        title="Facebook post"
        width={width}
        height={Math.round(width * 1.5)}
        style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
        scrolling="no"
        frameBorder={0}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-sm font-medium text-charis-blue-dark hover:underline"
      >
        View on Facebook
      </a>
    </div>
  );
};

export default FacebookPost;
