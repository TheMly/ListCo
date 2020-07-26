package com.server.listco.todolist;

import java.util.Optional;

public interface TodoListService {

    Optional<TodoItem> createTodoItem();

    Optional<TodoList> createTodoList();

    Optional<TodoList> getTodoList(Number listId);

}