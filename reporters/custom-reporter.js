import WDIOReporter from "@wdio/reporter";

export default class CustomReporter extends WDIOReporter {
  constructor(options) {
    super(options);
  }

  onTestEnd(test) {
    console.log(`Test: ${test.title}`);
    console.log(`Duration: ${test.duration} ms`);
  }
}
