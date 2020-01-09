export const MODE_DEVELOPMENT = 'development';

export const MODE_PRODUCTION = 'production';

export const BROWSERS = [ 'last 3 versions', 'ie >= 9', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 6', 'opera >= 12.1', 'ios >= 6', 'android >= 4.4', 'bb >= 10', 'and_uc 9.9' ];

export const DEFAULT_ENV = process.env.XROSY_ENV || process.env.NODE_ENV || 'xxxxx';

export const DEFAULT_SERVICE_PORT = process.env.SERVICE_PORT;

export const DEFAULT_DIST_PATH = 'dist';

export const CONST_ENTRY_MAIN = [ 'app.jsx', 'app.js', 'main.jsx', 'main.js', 'index.jsx', 'index.js' ];

export const CONST_SS = {};

export const SERVER_PORT = 3000;
