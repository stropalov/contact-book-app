/*
* Use dev or prod webpack config depending on the --env param
*/
module.exports = env => require(`./config/webpack.${env}.js`);
