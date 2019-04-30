import express         from "express";
import wpDevMiddleware from "webpack-dev-middleware";
import wpHotMiddleware from "webpack-hot-middleware";

export default wpCompiler => {
  const server = express();

  server.use(wpDevMiddleware(wpCompiler, {
    publicPath: wpCompiler.options.publicPath,
    headers: {"X-Custom-Header": "yes"},
    logLevel: 'error',
  }));

  server.use(wpHotMiddleware(wpCompiler, {
    noInfo: true,
  }));

  server.listen('3000', err => {
    if (err) {
      console.log(err);
    }

    global.console.info("Listening on port 3000. Open up http://0.0.0.0:3000/ in your browser.");
  });
};
