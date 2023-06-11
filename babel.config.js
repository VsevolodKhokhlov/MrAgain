const { NODE_ENV } = process.env;

const inProduction = NODE_ENV === "production";
const inDevevelopment = NODE_ENV === "development";

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: ["next/babel"],
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          style: true,
        },
      ],
      [
        "babel-plugin-styled-components",
        {
          ssr: true,
          displayName: inDevevelopment,
          minify: inProduction,
        },
      ],
    ],
  };
};
