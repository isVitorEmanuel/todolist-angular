import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
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
    @Input() tasks: Task[] = [];
    @Input() filter: 'completed' | 'pending' = 'pending';
    @Output() notifyUpdate = new EventEmitter();

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.updateList();
    }

    updateList() {
        for (let task of this.tasks) {
            if ((task.complete && this.filter !== 'completed')
                || (!task.complete && this.filter !== 'pending')) {
                this.tasks = this.tasks.filter(_task => {return _task !== task})
            }
        }
    }
    updateHome() {
        this.notifyUpdate.emit();
    }
}
