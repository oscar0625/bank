module.exports = function (babel) {
    let { types: t } = babel;
    return {
        visitor: {
            Identifier(path, state) {
                let name = path.node.name;
                if (state.opts[name]) {
                    path.node.name = state.opts[name];
                }
            }
        }
    };
};