const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('../../public/build/website/')
    .setPublicPath('/build/website')
    .addEntry('app', './js/app.js')
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableSassLoader(function (options) {}, {
        resolveUrlLoader: false
    })
    .enablePostCssLoader()
    .autoProvidejQuery()
    .addPlugin(new CopyWebpackPlugin([
        { from: './img', to: 'images' }
    ]))
    .addPlugin(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }))
    .addPlugin(new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: { level: 11 },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
    }))
    .configureUrlLoader({
        fonts: { limit: 8192 },
        images: { limit: 8192 }
    })
;

module.exports = Encore.getWebpackConfig();
