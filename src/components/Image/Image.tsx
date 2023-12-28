import { ImgHTMLAttributes, SyntheticEvent, useEffect, useState } from "react";

type TProps = { fallback: ImgHTMLAttributes<any>["src"] } & ImgHTMLAttributes<any>;

export default function Image({ fallback, src: defaultSrc, onError, ...imgAttrs }: TProps) {
  const [src, setSrc] = useState(defaultSrc);

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setSrc(fallback);
    if (onError && src) onError(event);
  };

  useEffect(() => {
    setSrc(defaultSrc);
  }, [defaultSrc]);

  return <img {...imgAttrs} src={src} onError={handleError} />;
}
