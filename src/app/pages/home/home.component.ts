import { Component } from '@angular/core';
import {FormComponent} from '../../components/form/form.component';
import {TasklistComponent} from '../../components/tasklist/tasklist.component';

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

}
