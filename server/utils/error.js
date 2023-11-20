//for custom errors


export default function errorHandeler(statusCode,message){
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}