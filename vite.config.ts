import path from "path";
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
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        src: "/src",
        mapsplanner: "/src"
      }
    }
  });
};
