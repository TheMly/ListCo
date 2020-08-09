package com.server.listco.todolist;

import java.sql.SQLException;
import java.util.Optional;

public interface TodoListService {

    void createTodoItem(Number listId);

    Optional<TodoList> createTodoList() throws SQLException;

    Optional<TodoList> getTodoList(Number listId);

}