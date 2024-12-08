export class ApiResponse {
  constructor(statusCode, data, message = "success", successType = false) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.successType = successType;
  }
}
