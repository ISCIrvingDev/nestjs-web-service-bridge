// export class AppResponse<T> {
//   public msn: string;
//   public data: T;

//   constructor(msn = 'Successful operation', data?) {
//     this.msn = msn;
//     this.data = data;
//   }
// }

export class AppResponse<T> {
  public msn = 'Successful operation';
  public data: T;

  constructor(init?: Partial<AppResponse<T>>) {
    Object.assign(this, init);
  }
}
