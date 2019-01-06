// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import filesize from "rollup-plugin-filesize";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";

const pkg = require("./package.json");
const env = process.env.NODE_ENV;

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
];

export default args => {
  var cf = [
    {
      input: "./lib/index.ts",
      output: {
        file: {
          cjs: pkg.main,
          es: pkg.module
          //   umd: "dist/umd/bundle.js"
        }[env],
        format: [env]
      },
      external,
      plugins: [
        typescript({ clean: true }),
        json(),
        resolve(),
        commonjs(),
        filesize()
      ]
    }
  ];

  return cf;
};
