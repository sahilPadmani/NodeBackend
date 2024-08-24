class ApiError extends Error{
    constructor(
        statuscode ,
        massage = 'something went wrong',
        errors = []
    ){
        super(massage);
        this.statusCode = statuscode;
        this.data = null;
        this.message = massage;
        this.success = false;
        this.errors = errors;
    }
};

export {ApiError}