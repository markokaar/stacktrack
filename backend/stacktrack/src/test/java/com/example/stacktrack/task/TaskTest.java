package com.example.stacktrack.task;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;

class TaskTest {

    Task underTest = new Task(
            1,
            "TestName",
            "Description",
            "2",
            "LIST");

    @ParameterizedTest
    @ValueSource(strings = {"1", "2", "3"})
    void validPriorityAccepted(String priorityValue) {
        underTest.setPriority(priorityValue);
        assertTrue(underTest.hasValidPriority());
    }

    @ParameterizedTest
    @ValueSource(strings = {"0", "4", "12", "23"})
    void invalidPriorityNotAllowed(String priorityValue) {
        underTest.setPriority(priorityValue);
        assertFalse(underTest.hasValidPriority());
    }

    @Test
    void emptyPriorityNotAllowed() {
        underTest.setPriority("");
        assertFalse(underTest.hasValidPriority());
    }

    @ParameterizedTest
    @ValueSource(strings = {"LIST", "DONE", "TRASH"})
    void validStatusAccepted(String statusValue) {
        underTest.setStatus(statusValue);
        assertTrue(underTest.hasValidStatus());
    }

    @ParameterizedTest
    @ValueSource(strings = {"NOTVALID", "STDO"})
    void invalidStatusNotAllowed(String statusValue) {
        underTest.setStatus(statusValue);
        assertFalse(underTest.hasValidStatus());
    }

    @Test
    void emptyStatusNotAllowed() {
        underTest.setStatus("");
        assertFalse(underTest.hasValidStatus());
    }

    @ParameterizedTest
    @ValueSource(strings = {"Marko", "1", "true", "徳仁"})
    void nameValidAllowed(String name) {
        underTest.setName(name);
        assertTrue(underTest.hasValidName());
    }

    @Test
    void nameEmptyNotAllowed() {
        underTest.setName("");
        assertFalse(underTest.hasValidName());
    }

    @Test
    void nameNullNotAllowed() {
        underTest.setName(null);
        assertFalse(underTest.hasValidName());
    }

}