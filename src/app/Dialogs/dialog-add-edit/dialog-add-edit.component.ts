import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../Interfaces/user';
import { UserService } from '../../Services/user.service';
 

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.scss']
})
export class DialogAddEditComponent implements OnInit {

  formUser:FormGroup;
  tituloAccion:string = "Nuevo";
  botonAccion:string = "Guardar";
  userStorage;
  
  constructor(
    private dialogoReferencia:MatDialogRef<DialogAddEditComponent>,
    private fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private _userService:UserService,
    @Inject(MAT_DIALOG_DATA) public dataUser:User

  ) {

    this.formUser = this.fb.group({
      nombre:['', Validators.required],
      username:['', Validators.required],
      telefono:['', Validators.required]
    })
   }

   
  ngOnInit() {
    this.getLocalStorage();
    if(this.dataUser){
      this.formUser.patchValue({
        nombre: this.dataUser.name,
        username:this.dataUser.username,
        telefono:this.dataUser.phone
      })
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
 
  }

 /* Mostrar alerta */
   showAlert(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

   /* Agregar o editar usuario */
  addEditUser(){
    const modelo: User = {
      id:this.userStorage.length +1,
      name: this.formUser.value.nombre,
      username: this.formUser.value.username,
      phone: this.formUser.value.telefono
    }

    if(this.dataUser == null){

      this.userStorage.push(modelo);
      this.updateLocalStorage(this.userStorage);
      this.showAlert("Usuario creado", "Listo");
      this.dialogoReferencia.close("creado");
    }else{
      
      const newArrayEdit = this.userStorage.map( user =>{
        if(user.id === this.dataUser.id){
          user.name = this.formUser.value.nombre;
          user.username = this.formUser.value.username;
          user.phone = this.formUser.value.telefono
        }

        return user;
      })

      this.updateLocalStorage(newArrayEdit);
      this.showAlert("Usuario editado", "Listo");
      this.dialogoReferencia.close("editado");
    }

  
  }

    /* Se  obtiene la data del localStorage */
    getLocalStorage(){
      this.userStorage = JSON.parse(localStorage.getItem('usersData'));
     }

    /* Se actualiza data del localStorage */
    updateLocalStorage(userStorage){    
      localStorage.setItem('usersData', JSON.stringify(userStorage));
  }
  

}
