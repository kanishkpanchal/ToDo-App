import { Component } from '@angular/core';
import { Task } from './task/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo-app';

  storedTasks: Task[] = [];

  onTaskAdded(task) {
    this.storedTasks.push(task);
  }
}
