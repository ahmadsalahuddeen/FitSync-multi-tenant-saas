/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: config =>{
    config.watchoptions.poll = 300;
    return config;
  }
}

module.exports = nextConfig
