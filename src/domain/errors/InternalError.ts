export default class InternalError extends Error {
  private readonly code: number;

  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}
