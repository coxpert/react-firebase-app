
  
const path = require('path');
const fs = require('fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const publicPath = '/';
// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

console.log(`${process.env.NODE_ENV}`)
module.exports = {
    entry: ["babel-polyfill", "react-hot-loader/patch", "./src/index.js"],
	output: {
		// The build folder.
		path: resolveApp('dist'),
		// Generated JS file names (with nested folders).
		// There will be one main bundle, and one file per asynchronous chunk.
		// We don't currently advertise code splitting but Webpack supports it.
		filename: 'static/js/[name].[hash:8].js',
		chunkFilename: 'static/js/[name].[hash:8].chunk.js',
		// We inferred the "public path" (such as / or /my-project) from homepage.
		publicPath: publicPath,
		hotUpdateChunkFilename: 'hot/hot-update.js',
		hotUpdateMainFilename: 'hot/hot-update.json',
	},
    devServer: {
        contentBase: './public/',
        host: 'localhost',
        compress: true,
        port: 3000, 
        historyApiFallback: true,
        quiet: true
    },
    resolve: {
		alias: {
			Actions: path.resolve(__dirname, 'src/actions/'),
			Components: path.resolve(__dirname, 'src/components/'),
			Assets: path.resolve(__dirname, 'src/assets/'),
			Views: path.resolve(__dirname, 'src/views/'),
            Helpers: path.resolve(__dirname, 'src/helpers/'),
            moment$: path.resolve(__dirname, "node_modules/moment/moment.js")
		}
	},
    module: {
        rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: { minimize: true }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
                },
                {
                    test: /\.(png|jpg|gif|svg|pdf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                limit: 200000,
                                name: 'static/media/[name].[hash:8].[ext]',
                                esModule: false,
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf)$/,
                    loader: 'url-loader?limit=100000'
                },
                // Scss compiler
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
    performance: {
        // hints: process.env.NODE_ENV === 'production' ? "warning" : false
        hints: false,
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    plugins:[
        new FriendlyErrorsWebpackPlugin(),
        new CleanWebpackPlugin({
            dry: false,
            verbose: false,
        }),
        new HtmlWebPackPlugin({
            template:"./public/index.html",
            filename:"./index.html",
            favicon: './public/favicon.ico',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "static/css/[name].[hash:8].css"
        }),
    ]
};