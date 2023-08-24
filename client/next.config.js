module.exports = {
  webpackDevMiddleware: config =>{
    config.watchoptions.poll = 300;
    return config;
  }
}