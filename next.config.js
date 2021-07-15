const path = require('path')
const withTM = require('next-transpile-modules')(['lodash-es']); // pass the modules you would like to see transpiled

module.exports = withTM({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    NOTION_KEY: 'secret_eDkBiNSSFvL5DGpsap0PTuFsFHbIuTVVUvW6ZNefBbc',
  },
});