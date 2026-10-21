import { useEffect, useRef } from "react";

declare global {
  interface Window {
    FB?: { XFBML: { parse: (element?: HTMLElement) => void } };
    fbAsyncInit?: () => void;
  }
}

let sdkPromise: Promise<void> | null = null;

// Load Facebook's SDK once; it turns .fb-post elements into embedded posts
const loadFacebookSdk = () => {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise<void>((resolve) => {
    if (window.FB) return resolve();
    window.fbAsyncInit = () => resolve();
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=0&version=v21.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  });
  return sdkPromise;
};

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

const FacebookPost = ({ url }: FacebookPostProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadFacebookSdk().then(() => {
      if (!cancelled && containerRef.current) window.FB?.XFBML.parse(containerRef.current);
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  const href = normaliseFacebookUrl(url);

  return (
    <div ref={containerRef} className="w-full overflow-hidden flex justify-center">
      <div className="fb-post" data-href={href} data-width="auto" data-show-text="true">
        <blockquote cite={href} className="p-6 text-center">
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-charis-blue-dark font-medium hover:underline">
            View this post on Facebook
          </a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookPost;
