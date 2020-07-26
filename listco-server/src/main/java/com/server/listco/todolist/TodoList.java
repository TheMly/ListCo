package com.server.listco.todolist;

import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoList {
    private int id;
    private String title;
}
