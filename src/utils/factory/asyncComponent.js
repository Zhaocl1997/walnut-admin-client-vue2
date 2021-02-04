'use strict'

import { defineAsyncComponent } from 'vue'

// TODO
export function createAsyncComponent(loader) {
  const delay = 100
  const timeout = 30000
  const retry = true

  return defineAsyncComponent({
    loader,
    loadingComponent: undefined,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    // TODO
    timeout,
    // errorComponent
    // Defining if component is suspensible. Default: true.
    // suspensible: false,
    delay,
    /**
     * @param {*} error Error message object
     * @param {*} retry A function that indicating whether the async component should retry when the loader promise rejects
     * @param {*} fail  End of failure
     * @param {*} attempts Maximum allowed retries number
     */
    onError: !retry
      ? () => {}
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            // retry on fetch errors, 3 max attempts
            retry()
          } else {
            // Note that retry/fail are like resolve/reject of a promise:
            // one of them must be called for the error handling to continue.
            fail()
          }
        },
  })
}
