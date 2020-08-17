package com.server.listco.todolist;

import java.sql.SQLException;
import java.util.Optional;

public interface TodoListRepository {

    Optional<TodoItem> createTodoItem(Number listId);

    void removeTodoItem(Number todoItemToRemoveId, Number todoListId);

    Optional<TodoItem> updateTodoItemText(TodoItem todoItem);

    Optional<TodoItem> updateTodoItemCompletedStatus(TodoItem todoItem);

    Optional<TodoList> createTodoList() throws SQLException;

    Optional<TodoList> getTodoListById(Number listId);

}