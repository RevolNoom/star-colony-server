import { ErrorMessages } from "../constants/Constants";

function FormatErrorMessage(errorMsg: ErrorMessages, msg?: string) {
    return `${errorMsg}: ${msg}`;
}
export class CommonError extends Error{ 
    public static UnpermittedOperation(msg?: string): CommonError{
        throw new CommonError(FormatErrorMessage(ErrorMessages.UNPERMITTED_OPERATION, msg));
    }
    public static NotImplementedException(msg?: string) {
        throw new CommonError(FormatErrorMessage(ErrorMessages.NULL_PRIMARY_KEY, msg));
    }
    public static InvalidArgument(msg?: string): SqlError{
        throw new SqlError(FormatErrorMessage(ErrorMessages.INVALID_ARGUMENT, msg));
    }
}

export class SqlError extends Error{
    public static NullPrimaryKey(msg?: string): SqlError{
        throw new SqlError(FormatErrorMessage(ErrorMessages.NULL_PRIMARY_KEY, msg));
    }
    public static InvalidInsertion(msg?: string): SqlError{
        throw new SqlError(FormatErrorMessage(ErrorMessages.UNKNOWN_ERROR, msg));
    }
    public static InvalidUpdation(msg?: string): SqlError{
        throw new SqlError(FormatErrorMessage(ErrorMessages.UNKNOWN_ERROR, msg));
    }
}