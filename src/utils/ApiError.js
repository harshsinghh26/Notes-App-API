class ApiError extends Error {
  constructor(statusCode, errors = [], message = 'Somehting went wrong') {
    super(message),
      (this.statusCode = statusCode),
      (this.data = null),
      (this.errors = errors),
      (this.success = false);
  }
}

export { ApiError };
