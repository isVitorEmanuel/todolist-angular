import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  taskName = new FormControl('');
  @Output() onSubmit = new EventEmitter();

    constructor(private http: HttpClient) {}

    submit() {
        const taskText = this.taskName.value;

        if (!taskText) {
            alert("Por favor, forneça o nome da tarefa.");
            return;
        }

        this.http.post('http://localhost:3000/api/task/', { text: taskText })
            .subscribe(
                (result) => this.onSubmit.emit(result)
            );
    }

}
