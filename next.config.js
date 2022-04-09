/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/all-banks',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
