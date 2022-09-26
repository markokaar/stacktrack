package com.example.stacktrack.task;

import com.example.stacktrack.exception.ResourceNotFoundException;
import com.example.stacktrack.exception.ValueNotValidException;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;
    @Mock
    private Task task;
    private TaskService underTest;

    @BeforeEach
    void setUp() {
        underTest = new TaskService(taskRepository);
    }

    @Test
    void canGetAllTasks() {
        underTest.getAll();
        verify(taskRepository).findAll();
    }

    @Test
    void updateTaskWillThrowWhenDoesNotExist() {
        Long id = 1L;
        given(taskRepository.findById(id)).willReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> underTest.updateTask(id, task))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("No task with id: " + id);

        verify(taskRepository, never()).save(any());
    }

    @Test
    void updateTaskInvalidNameThrows() {
        Long id = 434L;
        given(taskRepository.findById(id)).willReturn(Optional.ofNullable(task));
        given(task.hasValidName()).willReturn(false);

        // Then
        assertThatThrownBy(() -> underTest.updateTask(id, task))
                .isInstanceOf(ValueNotValidException.class)
                .hasMessageContaining("Name cannot be empty!");

        verify(taskRepository, never()).save(any());
    }

    @Test
    void updateTaskWithInvalidStatus() {
        // Given
        Long id = 9L;
        String status = "Some Invalid Status";
        Task oldTask = new Task(id, "name", "desc", "2", "TRASH");
        task = new Task(id, "name", "desc", "2", status);

        given(taskRepository.findById(id)).willReturn(Optional.of(oldTask));
        //given(task.hasValidName()).willReturn(true);
        //given(task.hasValidStatus()).willReturn(false);

        // When
        underTest.updateTask(id, task);

        // Then
        ArgumentCaptor<Task> taskArgumentCaptor =
                ArgumentCaptor.forClass(Task.class);
        verify(taskRepository).save(taskArgumentCaptor.capture());

        Task capturedTask = taskArgumentCaptor.getValue();
        assertThat(capturedTask.getStatus()).isEqualTo("LIST");
    }

    @Test
    void updateTaskWithValidStatus() {
        // Given
        Long id = 9L;
        String updateStatusTo = "DONE";
        Task oldTask = new Task(id, "name", "desc", "2", "TRASH");
        task = new Task(id, "name", "desc", "2", updateStatusTo);

        given(taskRepository.findById(id)).willReturn(Optional.of(oldTask));
        //given(task.hasValidName()).willReturn(true);
        //given(task.hasValidStatus()).willReturn(false);

        // When
        underTest.updateTask(id, task);

        // Then
        ArgumentCaptor<Task> taskArgumentCaptor =
                ArgumentCaptor.forClass(Task.class);
        verify(taskRepository).save(taskArgumentCaptor.capture());

        Task capturedTask = taskArgumentCaptor.getValue();
        assertThat(capturedTask.getStatus()).isEqualTo(updateStatusTo);
    }

    @Test
    void updateTaskWithValidPriority() {
        // Given
        Long id = 9L;
        String priorityTo = "3";
        Task oldTask = new Task(id, "name", "desc", "2", "LIST");
        task = new Task(id, "name", "desc", priorityTo, "LIST");

        given(taskRepository.findById(id)).willReturn(Optional.of(oldTask));
        //given(task.hasValidName()).willReturn(true);
        //given(task.hasValidStatus()).willReturn(false);

        // When
        underTest.updateTask(id, task);

        // Then
        ArgumentCaptor<Task> taskArgumentCaptor =
                ArgumentCaptor.forClass(Task.class);
        verify(taskRepository).save(taskArgumentCaptor.capture());

        Task capturedTask = taskArgumentCaptor.getValue();
        assertThat(capturedTask.getPriority()).isEqualTo(priorityTo);
    }

    @Test
    void updateTaskWithInvalidPriority() {
        // Given
        Long id = 9L;
        String priorityTo = "4";
        Task oldTask = new Task(id, "name", "desc", "2", "LIST");
        task = new Task(id, "name", "desc", priorityTo, "LIST");

        given(taskRepository.findById(id)).willReturn(Optional.of(oldTask));
        //given(task.hasValidName()).willReturn(true);
        //given(task.hasValidStatus()).willReturn(false);

        // When
        underTest.updateTask(id, task);

        // Then
        ArgumentCaptor<Task> taskArgumentCaptor =
                ArgumentCaptor.forClass(Task.class);
        verify(taskRepository).save(taskArgumentCaptor.capture());

        Task capturedTask = taskArgumentCaptor.getValue();
        assertThat(capturedTask.getPriority()).isEqualTo("2");
    }

    @Test
    void createTaskWithInvalidNameThrows() {
        given(task.hasValidName()).willReturn(false);

        // Then
        assertThatThrownBy(() -> underTest.createTask(task))
                .isInstanceOf(ValueNotValidException.class)
                .hasMessageContaining("Name cannot be empty!");

        verify(taskRepository, never()).save(any());
    }

    @Test
    void createTaskWithNullPriorityShouldChangeToDefault() {
        // Given
        task = new Task(1, "name", "desc", null, "LIST");

        // When
        underTest.createTask(task);

        // Then
        ArgumentCaptor<Task> taskArgumentCaptor =
                ArgumentCaptor.forClass(Task.class);
        verify(taskRepository).save(taskArgumentCaptor.capture());

        Task capturedTask = taskArgumentCaptor.getValue();
        assertThat(capturedTask.getPriority()).isEqualTo("2");
    }

    @ParameterizedTest
    @ValueSource(strings = {"LIST", "TRASH", "DONE", "", "somethingRandom"})
    void createTaskAlwaysWithDefaultStatus(String statusValue) {
        // Given
        task = new Task(1, "name", "desc", "2", statusValue);

        // When
        underTest.createTask(task);

        // Then
        ArgumentCaptor<Task> taskArgumentCaptor =
                ArgumentCaptor.forClass(Task.class);
        verify(taskRepository).save(taskArgumentCaptor.capture());

        Task capturedTask = taskArgumentCaptor.getValue();
        assertThat(capturedTask.getStatus()).isEqualTo("LIST");
    }

    @Test
    void deleteTaskSuccessfully() {
        // Given
        Long id = 999L;
        given(taskRepository.findById(id)).willReturn(Optional.of(task));

        // When
        underTest.deleteTask(id);

        // Then
        ArgumentCaptor<Task> taskArgumentCaptor =
                ArgumentCaptor.forClass(Task.class);
        verify(taskRepository).delete(taskArgumentCaptor.capture());

        Task capturedTask = taskArgumentCaptor.getValue();
        assertThat(capturedTask).isEqualTo(task);
    }

    @Test
    void deleteTaskWillThrowWhenDoesNotExist() {
        Long id = 1L;
        given(taskRepository.findById(id)).willReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> underTest.deleteTask(id))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("No task with id: " + id);

        verify(taskRepository, never()).delete(any());
    }

}