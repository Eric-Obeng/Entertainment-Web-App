const path = require("path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const glob = require("glob");

module.exports = {
  module: {
    rules: [
      // Image handling and optimization
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      // Other loaders (CSS, JS, etc.) can be added here as needed
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console logs in production
          },
        },
      }),
      new CssMinimizerPlugin(), // Minify CSS
    ],
    splitChunks: {
      chunks: "all",
    },
  },
  output: {
    filename: "[name].[contenthash].js", // Enable content hash for caching
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clean old assets from the /dist folder
  },
  plugins: [
    // Image optimization
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["mozjpeg", { progressive: true, quality: 75 }],
            ["pngquant", { quality: [0.65, 0.9], speed: 4 }],
            ["svgo", { plugins: [{ removeViewBox: false }] }],
          ],
        },
      },
    }),

    // Gzip compression
    new CompressionPlugin({
      test: /\.(js|css|html|svg|png|jpe?g|gif|woff|woff2|ttf|otf)$/i,
      algorithm: "gzip",
      threshold: 8192,
      minRatio: 0.8,
      deleteOriginalAssets: false, // Set to true if you want to remove original files
    }),

    // Brotli compression for modern browsers
    new BrotliPlugin({
      test: /\.(js|css|html|svg|png|jpe?g|gif|woff|woff2|ttf|otf)$/i,
      threshold: 10240,
      minRatio: 0.8,
    }),

    // Analyze the bundle size
    new BundleAnalyzerPlugin(),
  ],
  devtool: "source-map", // Optional: for debugging source maps in development
};
