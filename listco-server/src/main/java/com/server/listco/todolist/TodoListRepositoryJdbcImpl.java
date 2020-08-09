package com.server.listco.todolist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.*;

@Repository
public class TodoListRepositoryJdbcImpl implements TodoListRepository {

    @Autowired
    private DataSource dataSource;

    // Procedures
    private static final String CREATE_TODO_LIST_PROC = "spListCo_createTodoList";

    private static final String CREATE_TODO_ITEM_PROC = "spListCo_createTodoItem";

    private static final String REMOVE_TODO_ITEM_PROC = "spListCo_removeTodoItem";


    // Constants
    private static final String CREATED_TODO_LIST = "CREATED_TODO_LIST";

    private static final String CREATED_TODO_ITEM = "CREATED_TODO_LIST";

    public static final String TODO_LIST_ID = "listIdIn";

    public static final String TODO_ITEM_ID = "todoItemIdIn";


    public Optional<TodoItem> createTodoItem(Number listId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName(CREATE_TODO_ITEM_PROC)
                .declareParameters(new SqlParameter(TODO_LIST_ID, Types.INTEGER))
                .returningResultSet(CREATED_TODO_ITEM, this::mapTodoItem);

        Map<String, Object> params=new HashMap<>();
        params.put(TODO_LIST_ID, listId);
        Map<String, Object> out = jdbcCall.execute(params);
        List<TodoItem> todoItemArr = (List<TodoItem>) out.get(CREATED_TODO_ITEM);
        if(!CollectionUtils.isEmpty(todoItemArr)) {
            TodoItem todoItem = todoItemArr.get(0);
            System.out.println(todoItem.toString());
            return Optional.of(todoItem);
        }
        return Optional.empty();
    }

    public void removeTodoItem(Number todoItemToRemoveId, Number todoListId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName(REMOVE_TODO_ITEM_PROC)
                .declareParameters(new SqlParameter(TODO_ITEM_ID, Types.INTEGER))
                .declareParameters(new SqlParameter(TODO_LIST_ID, Types.INTEGER));

        Map<String, Object> params=new HashMap<>();
        params.put(TODO_ITEM_ID, todoItemToRemoveId);
        params.put(TODO_LIST_ID, todoListId);
        jdbcCall.execute(params);
    }

    public Optional<TodoList> createTodoList() {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName(CREATE_TODO_LIST_PROC)
                .returningResultSet(CREATED_TODO_LIST, this::mapTodoList);
        Map<String, Object> out = jdbcCall.execute();
        List<TodoList> todoListArr = (List<TodoList>) out.get(CREATED_TODO_LIST);
        if(!CollectionUtils.isEmpty(todoListArr)) {
            TodoList todoList = todoListArr.get(0);
            System.out.println(todoList.toString());
            return Optional.of(todoList);
        }
        return Optional.empty();
    }

    public Optional<TodoList> getTodoList(Number listId) {
        return Optional.of(new TodoList());
    }

    public TodoList mapTodoList(ResultSet rs, int row) throws SQLException {
        return TodoList.builder()
                .id( rs.getInt("ID"))
                .title( rs.getString("TITLE"))
                .creationDate(rs.getDate("CREATION_DATE"))
                .updateDate( rs.getDate("UPDATE_DATE"))
                .todoItemsList(new ArrayList<>())
                .build();
    }

    public TodoItem mapTodoItem(ResultSet rs, int row) throws SQLException {
        return TodoItem.builder()
                .id(rs.getInt("ID"))
                .listId(rs.getInt("LIST_ID"))
                .content(rs.getString("CONTENT"))
                .completed(convertIntToBoolean(rs.getInt("COMPLETED")))
                .position(rs.getInt("POSITION"))
                .build();
    }

    private boolean convertIntToBoolean(int value) {
       return value == 1 ? true : false;
    }
}
