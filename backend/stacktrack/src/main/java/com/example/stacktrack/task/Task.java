package com.example.stacktrack.task;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(
            name = "task_name",
            nullable = false,
            columnDefinition = "TEXT")
    private String name;

    @Column(
            name = "description",
            nullable = true,
            columnDefinition = "TEXT")
    private String description;

    @Column(
            name = "priority",
            nullable = false)
    private String priority;

    @Column(name = "status",
            nullable = false)
    private String status;

    public boolean hasValidPriority() {
        return "123".contains(priority);
    }

    public boolean hasValidStatus() {
        return "LIST DONE TRASH".contains(status);
    }

    public boolean hasValidName() {
        return name != null && !name.equals("");
    }
}
