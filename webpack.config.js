module.exports = {
    mode: 'development',
    entry: {
      'web-explorer': './src/index.ts',
      'style': './scss/we.scss'
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
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