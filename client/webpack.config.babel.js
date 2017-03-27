import { resolve } from 'path';
// import webpackValidator from 'webpack-validator';
import { getIfUtils } from 'webpack-config-utils';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const { extract } = ExtractTextPlugin;

export default env => {
	const { ifProd, ifNotProd } = getIfUtils(env);
	const settings = {
		context: resolve('src'),
		entry: './app.js',
		output: {
			filename: 'bundle.js',
			path: resolve('public'),
			publicPath: '/public/',
			pathinfo: ifNotProd()
		},
		devtool: ifProd('source-map', 'eval'),
		module: {
			rules: [
				{test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
				{test: /\.css$/, use: ifProd(extract({ fallback: 'style-loader', use: 'css-loader' }), ['style-loader', 'css-loader'])}
			]
		},
		devServer: {
			historyApiFallback: true
		},
		plugins: [
			new ExtractTextPlugin('style.css')
		]
	}
	const config = settings;

	if (env.debug) {
		console.log(config);
		debugger;
	}

	return config;
}



