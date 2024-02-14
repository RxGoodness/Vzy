export class CustomError extends Error {
  name;
  httpCode;
  message;

  constructor(name: any, httpCode: any, message: any) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
    this.message = message;
  }
} 
