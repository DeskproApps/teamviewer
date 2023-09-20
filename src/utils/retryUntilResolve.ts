import { sleep } from "./sleep";
import { TeamViewerError } from "../services/teamviewer";

type PromiseCallback<T> = (...args: any[]) => Promise<T>

const retryUntilResolve = <T>(
  fn: PromiseCallback<T>,
  retryCount = 0,
  pause = 1000,
): PromiseCallback<T> => {
  return (...args) => {
    let retry = 0;
    const run: () => Promise<any> = () => {
        return fn(...args).catch((error: typeof TeamViewerError) => {
            if (retryCount > 0 && retry >= retryCount) {
                retry = 0;

                throw error;
            }

            retry++;
            return sleep(pause).then(run);
        });
    };

    return run();
  }
}

export { retryUntilResolve };
