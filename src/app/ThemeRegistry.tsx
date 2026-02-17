"use client";

import * as React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache] = React.useState(() => {
    const cache = createCache({ key: "mui" });
    cache.compat = true;
    return cache;
  });

  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    require("@emotion/server");

  useServerInsertedHTML(() => {
    const chunks = extractCriticalToChunks("");
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: constructStyleTagsFromChunks(chunks),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
