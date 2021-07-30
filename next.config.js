const { withKeystone } = require('@keystone-next/keystone/next');

module.exports = withKeystone({
    images: {
        domains: ['storage.googleapis.com'],
    },
});
