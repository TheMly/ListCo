package com.server.listco.todolist;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class TodoListController {

    private final TodoListService todoListService;

    @GetMapping("/createTodoItem")
    public ResponseEntity<TodoItem> createTodoItem() {

        Optional<TodoItem> todoItem = todoListService.createTodoItem();
        System.out.println(todoItem);
        if(todoItem.isPresent()) {
            return new ResponseEntity<>(todoItem.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/createTodoList")
    public ResponseEntity<TodoList> createTodoList() {
        Optional<TodoList> todoList = todoListService.createTodoList();
        System.out.println("Created todo list: " + todoList);
        if (todoList.isPresent()) {
            return new ResponseEntity<>(todoList.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getTodoList")
    public ResponseEntity<TodoList> getTodoList(@PathVariable(value = "listId") Number listId) {
        Optional<TodoList> todoList = todoListService.getTodoList(listId);
        System.out.println("Retrieved todo list: " + todoList);
        if(todoList.isPresent()) {
            return new ResponseEntity<>(todoList.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}