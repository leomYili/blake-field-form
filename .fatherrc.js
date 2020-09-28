export default {
  cjs: 'babel',
  esm: { type: 'babel', importLibToEs: true },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  runtimeHelpers: true,
  preCommit: {
    eslint: true,
    prettier: true,
  }
};
