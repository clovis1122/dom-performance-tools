const { mix } = require('laravel-mix');

mix.babel('src/index.js', 'dist/index.js');
mix.babel('src/scroll.js', 'dist/scroll.js');
