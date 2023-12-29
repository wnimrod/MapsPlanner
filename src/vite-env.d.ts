/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
