class Reporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(_contexts, results) {
    const { testResults } = results;

    if(testResults[0].numFailingTests === 0) {
      console.log("All tests passed successfully!")
    }
    
    if (testResults.length > 0) {
      const { failureMessage } = testResults[0];
      if (failureMessage != null) {
        const message = failureMessage
          .split(/\n\n/)[1] // split the message and get the message
          .split(/\n/)[1] // split the message and get only the custom message
          .trim() // remove leading and trailing spaces
          .match(/\S.{1,68}\S(?= |$)/g) // match and return an array of strings that fit the regex pattern
          .join("\n"); // join the array of strings with a newline character

        console.log(message); 
      } 
      
    }
  }
}

module.exports = Reporter
