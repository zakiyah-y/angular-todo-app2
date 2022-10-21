import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = []
  showValidationErrors: boolean = false

  constructor(private dataService: DataService, private dialog: MatDialog) { }


  ngOnInit(): void {

    this.todos = this.dataService.getAllTodos()

  }

  onFormSubmit(form: NgForm) {   
    
    console.log("Form Submitted")
    console.log(form)
    
   // this.showValidationErrors = false
    
    if (form.invalid) { 
      return this.showValidationErrors = true 
    } else {
      this.dataService.addTodo(new Todo(form.value.text))
      form.reset()
      return this.showValidationErrors = false
    }
    
    
  }
  
  toggleCompleted(todo: Todo){
   todo.completed = !todo.completed;

  }

  editTodo(todo: Todo){

    const index = this.todos.indexOf(todo)

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px', 
      data: todo
    });


    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.dataService.updateTodo(index, result)
      }
    })
    //this.dataService.updateTodo()
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)
    this.dataService.deleteTodo(index)
  }
}
