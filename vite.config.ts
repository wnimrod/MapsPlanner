import react from "@vitejs/plugin-react";

import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const buildEnvObj = (acc, [key, value]) => ({
    ...acc,
    [`import.meta.env.${key}`]: JSON.stringify(value)
  });

  return defineConfig({
    define: Object.entries(env).reduce(buildEnvObj, {}),
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName: "[name]__[local]__[hash:base64:2]"
      }
    },
    plugins: [svgr(), react(), tsconfigPaths()],
    resolve: {
      alias: {
        src: "/src",
        mapsplanner: "/src",
        public: "/public"
      }
    }
  });
};
