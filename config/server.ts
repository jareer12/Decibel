import "dotenv/config";

const ServerConfig = {
  logger: process.env.LOGGER == "true" ? true : false,
};

export default ServerConfig;
