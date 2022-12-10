import colors from "colors/safe";

class ColorConsole {
  success(message: string) {
    console.log(`${colors.green("SUCCESS")} ${colors.white(message)}`);
  }

  error(message: string) {
    console.log(`${colors.red("ERROR")} ${colors.white(message)}`);
  }

  warn(message: string) {
    console.log(`${colors.yellow("WARNING")} ${colors.white(message)}`);
  }

  info(message: string) {
    console.log(`${colors.blue("INFO")} ${colors.white(message)}`);
  }

  bold(message: any) {
    return colors.bold(message);
  }
}

export default new ColorConsole();
