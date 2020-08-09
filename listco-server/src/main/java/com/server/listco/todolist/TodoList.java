package com.server.listco.todolist;

import lombok.*;

import java.util.Date;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoList {
    private int id;
    private String title;
    private Date creationDate;
    private Date updateDate;
    private List<TodoItem> todoItemsList;

}
