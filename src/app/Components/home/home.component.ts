import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { User } from '../../Interfaces/user';
import { UserService } from '../../Services/user.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogAddEditComponent } from '../../Dialogs/dialog-add-edit/dialog-add-edit.component';
import { MatSnackBar } from '@angular/material';
import { DialogDeleteComponent } from '../../Dialogs/dialog-delete/dialog-delete.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Id', 'Nombre', 'Username', 'Telefono', 'Acciones'];
  dataSource = new MatTableDataSource<User>();
  userStorage;

  constructor(
    private _userService:UserService,
    public dialog: MatDialog,
    private _snackBar:MatSnackBar
    ){}

  ngOnInit(): void {
    this.showUsers();
  }

  @ViewChild(MatPaginator, {static: true})paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
 /* Mostrar los usuarios en la tabla */
  showUsers(){
    this._userService.getListUser().subscribe({
      next:(dataResponse)=>{
        localStorage.setItem('usersData', JSON.stringify(dataResponse));
        this.getLocalStorage();
        
      },error:(e)=>{}
    })
  }

  /* Se  obtiene la data del localStorage*/
  getLocalStorage(){
    this.userStorage = JSON.parse(localStorage.getItem('usersData'));
    this.dataSource.data = this.userStorage;
   }
  
/* Abrir modal de crear usuario */
  newUser() {
    this.dialog.open(DialogAddEditComponent, {
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "creado"){
        this.getLocalStorage();
      }
    });
  }

  /* Abrir modal de editar usuario */
  editUser(dataUser: User){
    this.dialog.open(DialogAddEditComponent, {
      disableClose:true,
      width:"350px",
      data:dataUser
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "editado"){
        this.getLocalStorage();
      }
    });
  }

  /* Mostrar alertas */
  showAlert(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:4000
    });
  }

  /* Abrir modal de eliminar usuario */
  deleteUser(dataUser:User){
    this.dialog.open(DialogDeleteComponent, {
      disableClose:true,
      data:dataUser
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "eliminar"){
        const userStorage = this.userStorage.filter(user => user !== dataUser);
        this.updateLocalStorage(userStorage);
        this.getLocalStorage();
      }
    });
  }

  /* Se actualiza data del localStorage */
  updateLocalStorage(userStorage){    
    localStorage.setItem('usersData', JSON.stringify(userStorage));
  }

}
