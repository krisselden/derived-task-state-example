import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class ApplicationController extends Controller {
  @tracked paras = 3;
  @tracked show = true;

  get url() {
    return `https://baconipsum.com/api/?type=all-meat&paras=${this.paras}`;
  }

  @action
  updateParas(evt) {
    this.paras = evt.target.valueAsNumber;
  }

  @action
  toggleShow(evt) {
    this.show = evt.target.checked;
  }
}
