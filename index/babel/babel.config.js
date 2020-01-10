module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/preset-env", {
            useBuiltIns: "usage",
            corejs: 2
        }]
    ];

    const plugins = [
        ["@babel/plugin-proposal-class-properties", {
            "loose": true
        }],
        "@babel/plugin-transform-runtime",
        ["./myPlugin", {
            "bad": "good",
            "dead": "alive"
        }]
    ];

    return {
        presets,
        plugins
    };
}