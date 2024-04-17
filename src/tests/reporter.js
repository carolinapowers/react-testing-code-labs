class Reporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

splitString(str = '', size) {
   
   const chunks = str.match(regex);
   return chunks;
}

  onRunComplete(_contexts, results) {
    const { testResults } = results;

    if (testResults.length > 0) {

      const { failureMessage } = testResults[0];
      if (failureMessage != null) {
        const message =
          failureMessage
          .split(/\n\n/)[1]
          .trim()
          .match(/\S.{1,68}\S(?= |$)/g).join("\n");
        console.log(message, "\n<failed>");
      }
    }
  }
}

module.exports = Reporter
