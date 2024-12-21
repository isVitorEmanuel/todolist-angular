import {Component, EventEmitter, Output} from '@angular/core';
import {FormComponent} from '../../components/form/form.component';
import {TasklistComponent} from '../../components/tasklist/tasklist.component';
import {Task} from '../../components/task/task.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [
    FormComponent,
    TasklistComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    tasks: Task[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks() {
        this.http.get<Task[]>('http://localhost:3000/api/task/').subscribe(tasks => {
            this.tasks = tasks;
        });
    }
}
