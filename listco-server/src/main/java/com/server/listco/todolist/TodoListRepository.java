package com.server.listco.todolist;

import java.util.Optional;

public interface TodoListRepository {

    Optional<TodoItem> createTodoItem();

    Optional<TodoList> createTodoList();

    Optional<TodoList> getTodoList(Number listId);

}