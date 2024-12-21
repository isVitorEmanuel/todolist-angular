import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

export interface Task {
    id: number;
    task_text: string;
    complete: boolean;
}

@Component({
  selector: 'app-task',
    imports: [
        FormsModule
    ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
    @Input() task: Task = { id: 0, task_text: '', complete: false };
    @Output() onChange = new EventEmitter();
    @Output() taskDeleted = new EventEmitter<number>();

    constructor(private http: HttpClient) {}

    public toggleCompleted(): void {
        this.http.patch('http://localhost:3000/api/task/' + this.task.id, { complete : this.task.complete }).subscribe();
        this.onChange.emit(this.task);
    }

    deleteTask() {
        this.http.delete('http://localhost:3000/api/task/' + this.task.id).subscribe();
        this.taskDeleted.emit(this.task.id);
    }
}
