const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' ); // Импортируем плагин
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );// Импортируем плагин

let mode = 'development'; // По умолчанию режим development
let target = 'web'; // в режиме разработки browserslist не используется
if ( process.env.NODE_ENV === 'production' ) { // Режим production, если 
	// при запуске webpack было указано --mode=production
	mode = 'production';
	target = 'browserslist'; // в production режиме используем browserslist
}

module.exports = {

	mode, // Сокращенная запись mode: mode в ES6+
	target,// Сокращенная запись target: target в ES6+
	entry: './src/script.js', // Указываем точку входа - главный модуль приложения,
	// в который импортируются все остальные
	devtool: 'source-map',
	plugins: [new HtmlWebpackPlugin( {
		template: './src/index.html', // Данный html будет использован как шаблон
	} ),
	new MiniCssExtractPlugin( {
		filename: '[name].[contenthash].css', // Формат имени файла
	} ),
	],
	output: {
		path: path.resolve( __dirname, 'dist' ), // Директория, в которой будет
		// размещаться итоговый build, папка dist в корне приложения
		assetModuleFilename: 'assets/[hash][ext][query]', // Все assets будут
		// складываться в dist/assets
		clean: true, // Очищает директорию dist перед обновлением build
		// Свойство стало доступно с версии 5.20.0, до этого использовался
		// CleanWebpackPlugin
	},


	devServer: {
		compress: true,// сжимает файлы
		port: 9000,// порт
		hot: true, // Включает автоматическую перезагрузку страницы при изменениях
		open: true,// Открывает автоматически браузер
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve( __dirname, 'src' ),
				exclude: /node_modules/, // не обрабатываем файлы из node_modules
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true, // Использование кэша для избежания перекомпиляции
						// при каждом запуске
					},
				},
			},
			{
				test: /\.(html)$/,
				include: path.resolve( __dirname, 'src' ),
				use: ['html-loader']// Добавляем загрузчик для html
			},
			{
				test: /\.css$/i,
				include: path.resolve( __dirname, 'src' ),
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},

			{
				test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
				include: path.resolve( __dirname, 'src' ),
				type: mode === 'production' ? 'asset' : 'asset/resource', // В production режиме
				// изображения размером до 8кб будут встраиваться в код
				// В режиме разработки все изображения будут помещаться в dist/assets
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/i,
				include: path.resolve( __dirname, 'src' ),
				type: 'asset/resource',
			},
		],
	}

}