package com.server.listco.todolist;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
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

    public Optional<TodoItem> updateTodoItemText(TodoItem todoItem) {
        return todoListRepository.updateTodoItemText(todoItem);
    }

    public Optional<TodoItem> updateTodoItemCompletedStatus(TodoItem todoItem) {
        return todoListRepository.updateTodoItemCompletedStatus(todoItem);
    }

    public Optional<TodoList> createTodoList(String userFp) throws SQLException {
        return todoListRepository.createTodoList(userFp);
    }

    public Optional<TodoList> getTodoListById(Number listId) {
        return todoListRepository.getTodoListById(listId);
    }

    public Optional<List<TodoList>> loadRecentLists(String userFp) {
        return todoListRepository.loadRecentLists(userFp);
    }

    public void removeRecentList(Number recentListId, String userFp) {
        todoListRepository.removeRecentList(recentListId, userFp);
    }

    public void updateTodoListTitle(Number todoListId, String newListTitle) {
        todoListRepository.updateTodoListTitle(todoListId, newListTitle);
    }
}