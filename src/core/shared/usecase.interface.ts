export interface Usecase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(...args: any): Promise<any> | any;
}
