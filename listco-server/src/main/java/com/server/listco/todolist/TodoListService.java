package com.server.listco.todolist;

import java.sql.SQLException;
import java.util.Optional;

public interface TodoListService {

    Optional<TodoItem> createTodoItem(Number listId);

    void removeTodoItem(Number todoItemToRemoveId, Number todoListId);

    Optional<TodoList> createTodoList() throws SQLException;

    Optional<TodoList> getTodoList(Number listId);

    Optional<TodoItem> updateTodoItemText(TodoItem todoItem);

    Optional<TodoItem> updateTodoItemCompletedStatus(TodoItem todoItem);


}