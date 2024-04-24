import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../Interfaces/user';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    private dialogoReferencia:MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser:User

  ) { }


  ngOnInit() {
  }

  /* Se confirma eliminar usuario */
  confirmDelete(){
    if(this.dataUser){
      this.dialogoReferencia.close("eliminar");
    }
  }

}
