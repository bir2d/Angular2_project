// Importar Component desde el núcleo de Angular
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {RestauranteService} from '../service/restaurante.service';
import {Restaurante} from '../model/Restaurante';
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({

    templateUrl: 'app/views/restaurante-add.html',
    providers: [RestauranteService]
})

// Clase del componente donde irán los datos y funcionalidades
export class RestauranteEditComponent implements OnInit {
    public titulo: String;
    public restaurante: Restaurante;
    public status: String;
    public errorMessage;
    ngOnInit() {
         this.getRestaurante();
        

    }
    getRestaurante() {
        var id: string;
        this.route.params.forEach((params: Params) => {
            id = +params['id'] + ""; // (+) converts string 'id' to a number

        });
        this.restauranteService.getRestaurante(id).subscribe(
            result => {
                
                this.restaurante = <Restaurante> result.json().data;
                this.status = result.json().status;
                if (this.status !== "success") {
                    this.router.navigate(["/Home"]);
                }

            }
            , error => {
                this.errorMessage = <any>error;
                if (this.errorMessage !== null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        )

    }
    onSubmit() {
        this.restaurante=<Restaurante>this.restaurante;
    
        this.restauranteService.editRestaurante(this.restaurante).subscribe(result => {

            this.status = result.json().status;
            
            if (this.status === "success") {
                this.router.navigate(["/Home"]);
            }

        }
            , error => {
                this.errorMessage = <any>error;
                if (this.errorMessage !== null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            })
    }
    constructor(private route: ActivatedRoute, private restauranteService: RestauranteService, private router: Router) {
        this.titulo = "Editar Restaurante";

        this.restaurante = new Restaurante();

    }



}