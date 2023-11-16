import { CustomError } from './custom-error';


export class DatabaseOperationError  extends CustomError {
  statusCode = 500
  constructor(public message: string) {
    super(message)
    Object.setPrototypeOf(this, DatabaseOperationError.prototype)
  }

  serializeErrors() {
    return [
      { message: this.message || 'Database operation Error' }
    ]
  }
}