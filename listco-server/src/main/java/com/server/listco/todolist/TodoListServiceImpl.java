package com.server.listco.todolist;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoListServiceImpl implements TodoListService {

    private final TodoListRepository todoListRepository;

    public Optional<TodoItem> createTodoItem() {
        return todoListRepository.createTodoItem();
    }

    public Optional<TodoList> createTodoList() {
        return todoListRepository.createTodoList();
    }

    public Optional<TodoList> getTodoList(Number listId) {
        return todoListRepository.getTodoList(listId);
    }

}