const securityHeaders = [
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
	{
		key: "X-XSS-Protection",
		value: "1; mode=block",
	},
	{
		key: "X-Frame-Options",
		value: "SAMEORIGIN",
	},
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
];

module.exports = {
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		];
	},
	webpack: (config) => {
		// load worker files as a urls by using Asset Modules
		// https://webpack.js.org/guides/asset-modules/
		config.module.rules.unshift({
			test: /pdf\.worker\.(min\.)?js/,
			type: "asset/resource",
			generator: {
				filename: "static/worker/[hash][ext][query]",
			},
		});

		return config;
	},
};
