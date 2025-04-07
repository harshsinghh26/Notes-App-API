class ApiError extends Error {
  constructor(statusCode, message = 'Somehting went wrong') {
    super(message),
      (this.statusCode = statusCode),
      (this.data = null),
      (this.errors = []),
      (this.success = false);
  }
}

export { ApiError };
