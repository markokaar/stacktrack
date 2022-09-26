package com.example.stacktrack.task;

import com.example.stacktrack.exception.ResourceNotFoundException;
import com.example.stacktrack.exception.ValueNotValidException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    public ResponseEntity<Task> updateTask(Long id, Task taskDetails) {
        Task updateTask = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No task with id: " + id));

        if (!taskDetails.hasValidName())
            throw new ValueNotValidException("Name cannot be empty!");

        updateTask.setName(taskDetails.getName());
        updateTask.setDescription(taskDetails.getDescription());

        if (taskDetails.hasValidStatus())
            updateTask.setStatus(taskDetails.getStatus());
        else
            updateTask.setStatus("LIST");

        if (taskDetails.hasValidPriority())
            updateTask.setPriority(taskDetails.getPriority());
        else
            updateTask.setPriority("2");

        taskRepository.save(updateTask);
        return ResponseEntity.ok(updateTask);
    }

    public Task createTask(Task task) {
        if (!task.hasValidName())
            throw new ValueNotValidException("Name cannot be empty!");

        if (task.getPriority() == null || !task.hasValidPriority())
            task.setPriority("2");

        task.setStatus("LIST");
        return taskRepository.save(task);
    }

    public ResponseEntity<HttpStatus> emptyTrash() {
        taskRepository.findAll().forEach((task) -> {
            if (task.getStatus().equals("TRASH"))
                taskRepository.deleteById(task.getId());
        });
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<HttpStatus> deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No task with id: " + id));

        taskRepository.delete(task);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }
}
