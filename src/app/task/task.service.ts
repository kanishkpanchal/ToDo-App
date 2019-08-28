import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TasksService {
  private tasks: Task[] = [];
  private tasksUpdate = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  getTasks() {
    this.http.get<{message: string, tasks: any}>(
      'http://localhost:3000/api/tasks'
    )
    .pipe(map((taskData) => {
      return taskData.tasks.map(task => {
        return {
          title: task.title,
          category: task.category,
          id: task._id,
          status: task.status
        };
      });
    }))
    .subscribe((trasnformedTasks) => {
      this.tasks = trasnformedTasks;
      this.tasksUpdate.next([...this.tasks]);
    });
  }

  getTaskUpdateListen() {
    return this.tasksUpdate.asObservable();
  }

  addTask(title: string, category: string) {
    const task: Task = {id: null, title: title, category: category, status: false};
    this.http.post<{message: string, taskId: string}>('http://localhost:3000/api/tasks', task)
    .subscribe((responseData) => {
      console.log(responseData.message);
      const tid = responseData.taskId;
      task.id = tid;
      this.tasks.push(task);
      this.tasksUpdate.next([...this.tasks]);
    });
  }

  deleteTask(taskId: string) {
    this.http.delete('http://localhost:3000/api/tasks/' + taskId)
      .subscribe(() => {
        const updatedTasks = this.tasks.filter(task => task.id !== taskId);
        this.tasks = updatedTasks;
        this.tasksUpdate.next([...this.tasks]);
      });
  }
  updateTaskStatus(taskr) {
    const task: Task = {
      id: taskr.id,
      title: taskr.title,
      category: taskr.category,
      status: taskr.status
    };
    this.http.put('http://localhost:3000/api/tasks/' + task.id, task)
    .subscribe((responseData) => {
      console.log(responseData);
      /*
        const updatedTasks = responseData.status;
        this.tasks = updatedTasks;
        this.tasksUpdate.next([...this.tasks]);
      */
    });
  }
}
