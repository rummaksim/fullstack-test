package ru.application.controllers.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import ru.application.controllers.exception.entity.ErrorResponseEntity;
import ru.application.exceptions.CustomSQLException;

@ControllerAdvice
public class UniversalExceptionController {

    private static ErrorResponseEntity createErrorResponseEntity(String message){
        return new ErrorResponseEntity(message);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorResponseEntity handleEntityIllegalArgumentException(Exception e){
        return createErrorResponseEntity("Something went wrong");
    }

    @ExceptionHandler(CustomSQLException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorResponseEntity handleCustomSqlException(CustomSQLException e){
        return createErrorResponseEntity(e.getMessage());
    }



}
