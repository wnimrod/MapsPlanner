import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react";

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
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        src: "/src",
        mapsplanner: "/src"
      }
    }
  });
};
