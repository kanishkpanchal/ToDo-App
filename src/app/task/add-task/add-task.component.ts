import { Component, OnInit, Output } from '@angular/core';
import { Task } from '../task.model';
import { NgForm } from '@angular/forms';
import { TasksService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  OnAddTask( form: NgForm ) {
    if (form.invalid) {
      return;
    }
    this.tasksService.addTask(form.value.tasktitle, form.value.taskcategory);
  }

  constructor(public tasksService: TasksService) { }

  ngOnInit() {
  }

}
