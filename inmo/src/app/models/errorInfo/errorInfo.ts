import { ErrorInfoInterface } from "src/app/interfaces/errorInfo/errorInterface";


export class ErrorInfo implements ErrorInfoInterface {
    error_code: string = "";
    message: string = "";

    constructor(
        error_code: string,
        message: string) {
        this.error_code = error_code;
        this.message = message;
    }
}