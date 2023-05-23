const path = require('path');
module.exports = {
        // The Webpack config to use when compiling your react app for development or production.
        webpack: function(config, env) {
                config.module.rules.push(
                {
                        test: /\.cjs$/,
                        include: /node_modules/,
                        type: "javascript/auto"
                }
                );
                
                config.resolve.alias["@codemirror/state"] =  path.resolve('./node_modules/@codemirror/state/dist/index.js')
        return config;
        }
}