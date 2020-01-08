import Component from "@glimmer/component";
import createTask from "../utils/task";

export default class FetchJson extends Component {
  fetchTask = createTask(async (url, signal) => {
    const res = await fetch(url, { signal });
    if (res.status !== 200) {
      throw new Error(`response failed with ${res.status}`);
    }
    return await res.json();
  });

  get state() {
    return this.fetchTask.state(this.args.url);
  }

  willDestroy() {
    return this.fetchTask.dispose();
  }
}
