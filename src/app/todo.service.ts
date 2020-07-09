import { Injectable } from '@angular/core';
import { TodoItem } from './model/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private list = [];
  lastItemId = 0;

  localStorageKey = 'listaDeTareas';

  constructor() { }

  add(item){
    this.list.push(item);
    this.lastItemId ++;
    item.id = this.lastItemId;
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.list));
    this.list = this.list.slice();
  }

  changed(item: TodoItem) {
    item.toggleCompleted();
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.list));
    this.list = this.list.slice();
  }

  removed($event){
    const elementSplice = this.list.indexOf($event);
    this.list.splice(elementSplice, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.list));
    this.list = this.list.slice();
  }

  getList() {
    return this.list;
  }

  loadList() {
    this.list = [];
    const lstFromLocalStorage = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (lstFromLocalStorage != null && lstFromLocalStorage.length > 0){
      lstFromLocalStorage.forEach((item) => {
        this.list.push(new TodoItem(item.id, item.description, item.isCompleted));
      });
    }
  }
}
