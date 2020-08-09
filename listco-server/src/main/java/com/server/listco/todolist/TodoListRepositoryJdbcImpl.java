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
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private DataSource dataSource;

    private static final String CREATE_TODO_SQL = "INSERT INTO LISTCO.TODO_ITEM(id, list_id, content, completed, position) VALUES (?,?,?,?,?)";

    private static final String GET_TODO_SQL = "SELECT * FROM LISTCO.TODO_ITEM WHERE TODO_ITEM.ID = 2";

    private static final String CREATE_TODO_LIST_PROC = "spListCo_createTodoList";

    private static final String CREATE_TODO_ITEM_PROC = "spListCo_createTodoItem";

    // Constants
    private static final String CREATED_TODO_LIST = "CREATED_TODO_LIST";

    private static final String CREATED_TODO_ITEM = "CREATED_TODO_LIST";

    public static final String LIST_ID = "listIdIn";

    public void createTodoItem(Number listId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName(CREATE_TODO_ITEM_PROC)
                .declareParameters(new SqlParameter(LIST_ID, Types.INTEGER));

        Map<String, Object> params=new HashMap<>();
        params.put(LIST_ID, listId);
        jdbcCall.execute(params);
    }

    public Optional<TodoList> createTodoList() {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName(CREATE_TODO_LIST_PROC)
                .returningResultSet(CREATED_TODO_LIST, this::mapNewTodoList);
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

    public TodoItem mapTodoItem(ResultSet rs) throws SQLException {
        return TodoItem.builder()
                        .id(rs.getInt("id"))
                        .listId(rs.getInt("list_id"))
                        .completed(rs.getBoolean("completed"))
                        .position(rs.getInt("position"))
                        .content(rs.getString("content"))
                        .build();
    }

    public TodoList mapNewTodoList(ResultSet rs, int row) throws SQLException {
        return TodoList.builder()
                .id( rs.getInt("ID"))
                .title( rs.getString("TITLE"))
                .creationDate(rs.getDate("CREATION_DATE"))
                .updateDate( rs.getDate("UPDATE_DATE"))
                .todoItemsList(new ArrayList<>())
                .build();
    }

//    public TodoItem mapTodoItem(ResultSet rs, int row) throws SQLException {
//        return TodoItem.builder()
//                .listId(rs.getInt("LIST_ID"))
//                .content(rs.getString("CONTENT"))
//                .completed(convertIntToBoolean(rs.getInt("COMPLETED")))
//                .position(rs.getInt("POSITION"))
//                .build();
//    }

    private boolean convertIntToBoolean(int value) {
       return value == 1 ? true : false;
    }
}
