import { PluginItem } from '@babel/core';

export const rollupBabelPlugins = (): PluginItem[] => {
  return <PluginItem[]>[
    /*		// {
		//   name: '@babel/plugin-transform-react-jsx',
		//   pragma: customOptions.jsx || 'h',
		//   pragmaFrag: customOptions.jsxFragment || 'Fragment',
		// },
		{ name: "babel-plugin-macros" },
		{ name: "babel-plugin-annotate-pure-calls" },
		{ name: "babel-plugin-dev-expression" },
		/!*	customOptions.format !== "cjs" && {
  name: "babel-plugin-transform-rename-import",
  replacements:  [
	{original: "lodash(?!/fp)", replacement: "lodash-es"}
  ],
},*!/
		{
			name: "babel-plugin-polyfill-regenerator",
			// don't pollute global env as this is being used in a library
			method: "usage-pure",
		},
		{
			name: "@babel/plugin-proposal-class-properties",
			loose: true,
		},
		/!*	isTruthy(customOptions.extractErrors) && {
	  name: "./errors/transformErrorMessages",
	},*!/*/
  ].filter(Boolean);
};
