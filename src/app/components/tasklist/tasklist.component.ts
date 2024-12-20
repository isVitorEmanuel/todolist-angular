import {Component, Input} from '@angular/core';
import {Task, TaskComponent} from '../task/task.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tasklist',
    imports: [
        TaskComponent
    ],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent {
    tasks: Task[] = [];
    @Input() filter: 'completed' | 'pending' = 'pending';

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks() {
        this.http.get<Task[]>('http://localhost:3000/api/task/' + this.filter).subscribe(tasks => {this.tasks = tasks})
    }
}
