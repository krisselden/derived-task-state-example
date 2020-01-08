import { tracked } from "@glimmer/tracking";

export default function createTask(start, equals = (a, b) => a === b) {
  let task;
  return {
    state(input) {
      if (task !== undefined && !equals(task.input, input)) {
        task.abort();
        task = undefined;
      }
      if (task === undefined) {
        task = new Task(input, start);
      }
      return task.state;
    },

    dispose() {
      if (task !== undefined) {
        task.abort();
        task = undefined;
      }
    }
  };
}

class Task {
  @tracked state = {
    settled: false,
    rejected: false,
    result: undefined
  };

  constructor(input, start) {
    const controller = new AbortController();
    this.input = input;
    this.controller = controller;
    start(input, controller.signal).then(
      result => {
        this.state = {
          settled: true,
          rejected: false,
          result
        };
      },
      result => {
        this.state = {
          settled: true,
          rejected: true,
          result
        };
      }
    );
  }

  abort() {
    this.controller.abort();
  }
}
