class ApiResponse {
  public success: boolean;
  constructor(
    public statusCode: number,
    public data: any,
    public message: string,
  ) {
    this.success = statusCode < 400;
  }

  toJSON() {
    return {
      success: this.success,
      statusCode: this.statusCode,
      data: this.data,
      message: this.message,
    };
  }
}
export {ApiResponse}
