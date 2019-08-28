import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '../task.model';
import { TasksService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

   tasks: Task[] = [];
  private tasksSub: Subscription;

  constructor(public tasksService: TasksService) {

  }

  ngOnInit() {
    this.tasksService.getTasks();
    this.tasksSub = this.tasksService.getTaskUpdateListen()
    .subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  OnDelete(taskId: string) {
    this.tasksService.deleteTask(taskId);
  }


  updateStatus(taskr) {
    taskr.status = !taskr.status;
    const task = {
      id: taskr.id,
      title: taskr.title,
      category: taskr.category,
      status: taskr.status
    };
    this.tasksService.updateTaskStatus(task);
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }

}
