import { Component, OnInit } from '@angular/core';
import {TodoItem} from '../model/todo-item';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {

  constructor(
    private todoService: TodoService,
  ) { }

  ngOnInit() {
    this.todoService.loadList();
  }

  getList() {
    return this.todoService.getList();
  }

  onItemStateChanged(item: TodoItem) {
    this.todoService.changed(item);
  }

  onTodoItemCreated(item){
    this.todoService.add(item);
  }

  onTodoItemRemoved($event){
    this.todoService.removed($event);
  }
}
