# Example of Derived Async Task State with Tracked

Example of a simple `@tracked` async task util for derived async state.

The task util handles starting/reusing/cancelling the task when task state for
input is requested, intended to be used on a getter that is rendered so the task
state is tracked and the source of the derived input is tracked by autotracking
when the getter is rendered.

Autotracking is only on during getting the state. The async task function itself
should not access tracked state, but state that was derived from tracked state and
passed in as input in the getter. The util can be provided an equals function for
validating if the input is still good for the task and defaults to `===` to compare
the new derived input to the existing task's input.

The util uses an AbortController signal for a cancellation token since it is
useable with `fetch` but still general enough to be used as a cancellation token
without fetch.

## Start Example

Run

- `git clone https://github.com/krisselden/derived-task-state-example.git` this repository
- `cd derived-task-state-example`
- `yarn`
- `yarn start`

Open [http://localhost:4200](http://localhost:4200) and follow instructions on page.

## Code of Interest

- Example glimmer component using the task util – [app/components/fetch-json.js](app/components/fetch-json.js)
- Template using the example component – [app/templates/application.hbs](app/templates/application.hbs)
- Tracked task util – [app/utils/task.js](app/utils/task.js)
