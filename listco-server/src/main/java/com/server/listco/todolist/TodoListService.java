package com.server.listco.todolist;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface TodoListService {

    Optional<TodoItem> createTodoItem(Number listId);

    void removeTodoItem(Number todoItemToRemoveId, Number todoListId);

    Optional<TodoList> createTodoList(String userFp) throws SQLException;

    Optional<TodoList> getTodoListById(Number listId);

    Optional<TodoItem> updateTodoItemText(TodoItem todoItem);

    Optional<TodoItem> updateTodoItemCompletedStatus(TodoItem todoItem);

    Optional<List<TodoList>> loadRecentLists(String userFp);

    void removeRecentList(Number recentListId, String userFp);

    void updateTodoListTitle(Number todoListId, String newListTitle);


}