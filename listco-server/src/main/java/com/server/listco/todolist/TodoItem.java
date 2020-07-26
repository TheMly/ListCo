package com.server.listco.todolist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodoItem {

    private int id;
    private int listId;
    private String content;
    private boolean completed;
    private int position;
}
