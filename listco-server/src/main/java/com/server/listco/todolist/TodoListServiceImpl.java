package com.server.listco.todolist;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoListServiceImpl implements TodoListService {

    private final TodoListRepository todoListRepository;

    public Optional<TodoItem> createTodoItem(Number listId) {
        return todoListRepository.createTodoItem(listId);
    }

    public void removeTodoItem(Number todoItemToRemoveId, Number todoListId) {
        todoListRepository.removeTodoItem(todoItemToRemoveId, todoListId);
    }

    public Optional<TodoList> createTodoList() throws SQLException {
        return todoListRepository.createTodoList();
    }

    public Optional<TodoList> getTodoList(Number listId) {
        return todoListRepository.getTodoList(listId);
    }

}