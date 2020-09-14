module.exports = {
    mode: 'development',
    entry: {
      'web-explorer': './src/we.js',
      'style': './scss/we.scss'
    },
    module: {
    rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        },
        {
          test: /.scss$/,
          use: [
            {
							loader: 'file-loader',
							options: {
								name: '[name].css',
							}
            },
						{
							loader: 'sass-loader'
						}
          ],
        },
      ]
    }
};