import chalk from 'chalk';

export const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const method = chalk.cyan.bold(req.method);
    const url = chalk.green(req.originalUrl);
    const statusColor =
      res.statusCode < 300
        ? chalk.green
        : res.statusCode < 400
          ? chalk.yellow
          : chalk.red;

    const status = statusColor(res.statusCode);
    const time = chalk.gray(`${duration}ms`);
    const timeStamp = chalk.dim(new Date().toISOString());

    console.log(`${timeStamp} ${method} ${url} → ${status} (${time})`);
  });

  next();
};

export default loggerMiddleware;