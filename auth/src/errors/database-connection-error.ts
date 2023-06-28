export class DatabaseConnectionError extends Error{
  reason = 'datatabse connecting eror lajsdfkajsdlfk'
  constructor(){
    super()



    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }
}