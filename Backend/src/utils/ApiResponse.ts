class ApiResponse {

    statusCode: number;
    message: string;
    data: string;
    success: boolean;


    constructor(statusCode: number, data: string, message = "Success") {
        this.statusCode = statusCode,
            this.data = data,
            this.message = message,
            this.success = statusCode < 400
    }
}

export { ApiResponse };