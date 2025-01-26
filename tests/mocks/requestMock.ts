export const mockRequest = (response: object | Error, delay = 1500) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      if (response instanceof Error) {
        reject(response);
      }

      resolve(response);
    }, delay);
  });
};
