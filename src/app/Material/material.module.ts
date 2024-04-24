import { NgModule } from '@angular/core';

import {
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatToolbarModule
} from '@angular/material'

@NgModule({
    imports:[
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatIconModule,
        MatDialogModule,
        MatGridListModule,
        MatToolbarModule
    ],
    exports:[
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatIconModule,
        MatDialogModule,
        MatGridListModule,
        MatToolbarModule
    ]
})

export class MaterialModule {}