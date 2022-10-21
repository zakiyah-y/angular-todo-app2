import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent implements OnInit {

  @Input() todo: Todo = new Todo('')
  
  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>, 
  //  @Inject(MAT_DIALOG_DATA) public todo: Todo
    ) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm){

    if(form.invalid) return

    const updatedTodo = {

      ...this.todo, 
      ...form.value

    }

    this.dialogRef.close(updatedTodo)
  }

  close() {
    this.dialogRef.close()
  }
}
