/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '', // Lascia vuoto se il sito non è ospitato in una sottocartella
  trailingSlash: true, // Per aggiungere uno slash alla fine di ogni URL, utile per alcuni server di hosting
}

module.exports = nextConfig
