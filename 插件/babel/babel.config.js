module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/preset-env", {
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
            },
            useBuiltIns: "usage"
        }]
    ];

    const plugins = [
        ["@babel/plugin-proposal-class-properties", {
            "loose": true
        }]
    ];

    return {
        presets,
        plugins
    };
}