const { vanillaExtractPlugin } = require("@vanilla-extract/vite-plugin")
const { resolve } = require("path")
const { mergeConfig } = require("vite")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  typescript: {
    reactDocgen: "react-docgen", // 👈 react-docgen configured here.
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        minify: "esbuild",
        sourcemap: true,
        lib: {
          entry: resolve(__dirname, "src/react.ts"),
          name: "ory/elements",
          fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
          treeshake: "recommended",
          external: ["react", "react-dom", "storybook"],
          output: {
            globals: {
              storybook: "storybook",
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
      },
      plugins: [vanillaExtractPlugin()],
    })
  },
  features: {
    storyStoreV7: true,
  },
}
