package com.server.listco.todolist;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Repository
public class TodoListRepositoryJdbcImpl implements TodoListRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String CREATE_TODO_SQL = "INSERT INTO LISTCO.TODO_ITEM(id, list_id, content, completed, position) VALUES (?,?,?,?,?)";

    private static final String GET_TODO_SQL = "SELECT * FROM LISTCO.TODO_ITEM WHERE TODO_ITEM.ID = 2";

    public Optional<TodoItem> createTodoItem() {
        jdbcTemplate.update(CREATE_TODO_SQL, 2, 2, "Buy vegetables", false, 1);
        TodoItem todoItem = jdbcTemplate.queryForObject(GET_TODO_SQL, new TodoItem[]{}, (rs, rowNum) ->
                 mapTodoItem(rs));
        return Optional.of(todoItem);
    }

    public Optional<TodoList> createTodoList() {
        return Optional.of(new TodoList());
    }


    public Optional<TodoList> getTodoList(Number listId) {
        return Optional.of(new TodoList());
    }

    public TodoItem mapTodoItem(ResultSet rs) throws SQLException {
        return TodoItem.builder()
                        .id(rs.getInt("id"))
                        .listId(rs.getInt("list_id"))
                        .completed(rs.getBoolean("completed"))
                        .position(rs.getInt("position"))
                        .content(rs.getString("content"))
                        .build();
    }
}
