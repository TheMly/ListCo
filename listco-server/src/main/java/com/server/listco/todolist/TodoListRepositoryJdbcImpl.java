package com.server.listco.todolist;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequiredArgsConstructor
public class TodoListRepositoryJdbcImpl implements TodoListRepository {

    private final DataSource dataSource;

    // Procedures
    private static final String CREATE_TODO_LIST_PROC = "spListCo_createTodoList";

    private static final String GET_TODO_LIST_BY_ID_PROC = "spListCo_getTodoListById";

    private static final String CREATE_TODO_ITEM_PROC = "spListCo_createTodoItem";

    private static final String REMOVE_TODO_ITEM_PROC = "spListCo_removeTodoItem";

    private static final String UPDATE_TODO_ITEM_TEXT_PROC = "spListCo_updateTodoItemText";

    private static final String UPDATE_TODO_ITEM_COMPLETED_STATUS_PROC = "spListCo_updateTodoItemCompletedStatus";

    private static final String GET_RECENT_LISTS = "spListCo_getRecentLists";

    // Constants
    private static final String CREATED_TODO_LIST = "CREATED_TODO_LIST";

    private static final String CREATED_TODO_ITEM = "CREATED_TODO_ITEM";

    private static final String TODO_LIST = "TODO_LIST";

    private static final String TODO_ITEMS_LIST = "TODO_ITEMS_LIST";

    private static final String UPDATED_TODO_ITEM = "UPDATED_TODO_LIST";

    public static final String TODO_LIST_ID = "listIdIn";

    public static final String TODO_ITEM_ID = "todoItemIdIn";

    private static final String TODO_ITEM_TEXT = "todoItemTextIn";

    private static final String TODO_ITEM_COMPLETED_STATUS = "todoItemCompletedStatusIn";

    public static final String USER_FP = "userFpIn";


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

    public Optional<TodoItem> updateTodoItemText(TodoItem todoItemToUpdate) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName(UPDATE_TODO_ITEM_TEXT_PROC)
                .declareParameters(new SqlParameter(TODO_LIST_ID, Types.INTEGER))
                .declareParameters(new SqlParameter(TODO_ITEM_ID, Types.INTEGER))
                .declareParameters(new SqlParameter(TODO_ITEM_TEXT, Types.VARCHAR))
                .returningResultSet(UPDATED_TODO_ITEM, this::mapTodoItem);

        Map<String, Object> params=new HashMap<>();
        params.put(TODO_LIST_ID, todoItemToUpdate.getListId());
        params.put(TODO_ITEM_ID, todoItemToUpdate.getId());
        params.put(TODO_ITEM_TEXT, todoItemToUpdate.getContent());
        Map<String, Object> out = jdbcCall.execute(params);
        List<TodoItem> todoItemArr = (List<TodoItem>) out.get(UPDATED_TODO_ITEM);
        if(!CollectionUtils.isEmpty(todoItemArr)) {
            TodoItem todoItemUpdated = todoItemArr.get(0);
            System.out.println(todoItemUpdated.toString());
            return Optional.of(todoItemUpdated);
        }
        return Optional.empty();
    }

    public Optional<TodoItem> updateTodoItemCompletedStatus(TodoItem todoItemToUpdate) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName(UPDATE_TODO_ITEM_COMPLETED_STATUS_PROC)
                .declareParameters(new SqlParameter(TODO_LIST_ID, Types.INTEGER))
                .declareParameters(new SqlParameter(TODO_ITEM_ID, Types.INTEGER))
                .declareParameters(new SqlParameter(TODO_ITEM_COMPLETED_STATUS, Types.BOOLEAN))
                .returningResultSet(UPDATED_TODO_ITEM, this::mapTodoItem);

        Map<String, Object> params=new HashMap<>();
        params.put(TODO_LIST_ID, todoItemToUpdate.getListId());
        params.put(TODO_ITEM_ID, todoItemToUpdate.getId());
        params.put(TODO_ITEM_COMPLETED_STATUS, todoItemToUpdate.isCompleted());
        Map<String, Object> out = jdbcCall.execute(params);
        List<TodoItem> todoItemArr = (List<TodoItem>) out.get(UPDATED_TODO_ITEM);
        if(!CollectionUtils.isEmpty(todoItemArr)) {
            TodoItem todoItemUpdated = todoItemArr.get(0);
            System.out.println(todoItemUpdated.toString());
            return Optional.of(todoItemUpdated);
        }
        return Optional.empty();
    }

    public Optional<TodoList> createTodoList(String userFp) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName(CREATE_TODO_LIST_PROC)
                .declareParameters(new SqlParameter(USER_FP, Types.VARCHAR))
                .returningResultSet(CREATED_TODO_LIST, this::mapTodoList);

        Map<String, Object> params=new HashMap<>();
        params.put(USER_FP, userFp);
        Map<String, Object> out = jdbcCall.execute(params);
        List<TodoList> todoListArr = (List<TodoList>) out.get(CREATED_TODO_LIST);
        if(!CollectionUtils.isEmpty(todoListArr)) {
            TodoList todoList = todoListArr.get(0);
            System.out.println(todoList.toString());
            return Optional.of(todoList);
        }
        return Optional.empty();
    }

    public Optional<TodoList> getTodoListById(Number listId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName(GET_TODO_LIST_BY_ID_PROC)
                .declareParameters(new SqlParameter(TODO_LIST_ID, Types.INTEGER))
                .returningResultSet(TODO_LIST, this::mapTodoList)
                .returningResultSet(TODO_ITEMS_LIST, this::mapTodoItem);

        Map<String, Object> params=new HashMap<>();
        params.put(TODO_LIST_ID, listId);
        Map<String, Object> out = jdbcCall.execute(params);
        List<TodoList> todoListArr = (List<TodoList>) out.get(TODO_LIST);
        List<TodoItem> todoItemsArr = (List<TodoItem>) out.get(TODO_ITEMS_LIST);
        if(!CollectionUtils.isEmpty(todoListArr)) {
            TodoList todoList = todoListArr.get(0);
            todoList.setTodoItemsList(todoItemsArr);
            System.out.println(todoList.toString());
            return Optional.of(todoList);
        }
        return Optional.empty();
    }

    public Optional<List<TodoList>> loadRecentLists(String userFp) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource)
                .withProcedureName(GET_RECENT_LISTS)
                .declareParameters(new SqlParameter(USER_FP, Types.VARCHAR))
                .returningResultSet(TODO_LIST, this::mapTodoList);

        Map<String, Object> params=new HashMap<>();
        params.put(USER_FP, userFp);
        Map<String, Object> out = jdbcCall.execute(params);
        List<TodoList> todoListArr = (List<TodoList>) out.get(TODO_LIST);
        if(!CollectionUtils.isEmpty(todoListArr)) {
            return Optional.of(todoListArr);
        }
        return Optional.empty();

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
