module.exports = {
    entry: {
        browser: './src/browser/browser.tsx',
    },
    output: {
        filename: './js/[name].js',
    },
    target: 'atom',
    module: {
        loaders: [
            {test: /\.tsx?/, loader: 'ts-loader'},
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', ''],
    },
}