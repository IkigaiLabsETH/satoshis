/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
    // Increase API route timeout to 30 seconds
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opepenai.nyc3.digitaloceanspaces.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hashmasksstore.blob.core.windows.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.seadn.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.openseauserdata.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.opensea.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.mux.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'arweave.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.arweave.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media-proxy.artblocks.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.qql.art',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.kaizen.finance',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.niftygateway.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.pixura.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.larvalabs.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.thirdwebcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gmstudio.mypinata.cloud',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'asynchronous-art-inc-res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.opepen.art',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 3600,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'highlight-creator-assets.highlight.xyz',
      'assets.coingecko.com',
      'dd.dexscreener.com',
      'coin-images.coingecko.com',
      // add other domains as needed
    ],
  },
  typescript: {
    // Enable type checking during build
    ignoreBuildErrors: false,
  },
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['lucide-react', 'framer-motion', 'thirdweb'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { _dev, _isServer }) => {
    // Optimize webpack configuration
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    // Add memory optimization
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    };

    config.ignoreWarnings = [
      (warning) =>
        typeof warning.message === 'string' &&
        warning.message.includes('require function is used in a way in which dependencies cannot be statically extracted'),
    ];
    return config;
  },
  // Production optimizations
  optimizeFonts: true,
  compress: true,
  productionBrowserSourceMaps: false,
  // CSS optimization with critters
  // optimizeCss: true,
  // Add headers for static files
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'image/x-icon',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig 