package com.example.stacktrack.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAll() {
        return taskService.getAll();
    }

    @PutMapping("{id}")
    public ResponseEntity<Task> updateTask(@PathVariable("id") Long id, @RequestBody Task taskDetails) {
        return taskService.updateTask(id, taskDetails);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PostMapping("/empty-trash")
    public ResponseEntity<HttpStatus> emptyTrash() {
        return taskService.emptyTrash();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable("id") Long id) {
        return taskService.deleteTask(id);
    }
}
