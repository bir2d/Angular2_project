"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Importar Component desde el núcleo de Angular
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var restaurante_service_1 = require('../service/restaurante.service');
var Restaurante_1 = require('../model/Restaurante');
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var RestauranteDetailComponent = (function () {
    function RestauranteDetailComponent(route, restauranteService, router) {
        this.route = route;
        this.restauranteService = restauranteService;
        this.router = router;
        this.titulo = "Detalle Restaurante";
        this.restaurante = new Restaurante_1.Restaurante();
    }
    RestauranteDetailComponent.prototype.ngOnInit = function () {
        this.getRestaurante();
    };
    RestauranteDetailComponent.prototype.getRestaurante = function () {
        var _this = this;
        var id;
        this.route.params.forEach(function (params) {
            id = +params['id'] + ""; // (+) converts string 'id' to a number
        });
        this.restauranteService.getRestaurante(id).subscribe(function (result) {
            _this.restaurante = result.data;
            _this.status = result.status + "";
            if (_this.status !== "success") {
                _this.router.navigate(["/Home"]);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage !== null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    RestauranteDetailComponent = __decorate([
        core_1.Component({
            selector: 'restaurante-list',
            templateUrl: 'app/views/restaurante-detail.html',
            providers: [restaurante_service_1.RestauranteService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, restaurante_service_1.RestauranteService, router_1.Router])
    ], RestauranteDetailComponent);
    return RestauranteDetailComponent;
}());
exports.RestauranteDetailComponent = RestauranteDetailComponent;
//# sourceMappingURL=restaurante-detail.js.map