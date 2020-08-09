package com.server.listco.todolist;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoListServiceImpl implements TodoListService {

    private final TodoListRepository todoListRepository;

    public void createTodoItem(Number listId) {
        todoListRepository.createTodoItem(listId);
    }

    public Optional<TodoList> createTodoList() throws SQLException {
        return todoListRepository.createTodoList();
    }

    public Optional<TodoList> getTodoList(Number listId) {
        return todoListRepository.getTodoList(listId);
    }

}