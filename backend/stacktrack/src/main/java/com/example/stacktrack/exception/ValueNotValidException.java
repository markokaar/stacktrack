package com.example.stacktrack.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Not sure if this is the correct response type.
// Will trigger when attempting to create task without the name.
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ValueNotValidException extends RuntimeException{

    public ValueNotValidException (String message) {super(message);}
}
