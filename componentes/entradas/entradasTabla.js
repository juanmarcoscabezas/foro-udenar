var entradasTabla = Vue.component('entradas-tabla', {
    template: `
    <div class="col-sm-9 table-responsive">
        <!-- Modal crear entrada-->
        <div class="modal fade" id="entrada" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title col-sm-11">Crear entrada</h4>
                        <button v-on:click="cerrarRegistro" type="button" class="close col-sm-1" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" v-if="errores.length">
                            <div v-for="error in errores">
                                {{error}}
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Título:</label>
                            <input v-model="titulo" type="text" class="form-control" >
                        </div>
                        <div class="form-group">
                            <label>Descripción:</label>
                            <textarea v-model="descripcion" type="text" rows="5" class="form-control"></textarea> 
                        </div>
                        <div class="form-group">
                            <label>Imagen:</label>
                            <input v-model="imagen_url" type="text" class="form-control" >
                        </div>
                        <div class="form-group">
                            <label for="sel1">Categoría:</label>
                            <select class="form-control" v-model="categoria">
                                <option value="" selected disabled hidden>Elija una categoría</option>
                                <option v-for="cat in categorias" v-bind:value="cat.value">{{ cat.text }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-on:click="cerrarRegistro" type="button" class="btn btn-secondary">Cerrar</button>
                        <button v-on:click="agregar" type="button" class="btn btn-success">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal editar entrada-->
        <div class="modal fade" id="editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title col-sm-11">Editar entrada</h4>
                        <button v-on:click="cerrarEdicion" type="button" class="close col-sm-1" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" v-if="errores.length">
                            <div v-for="error in errores">
                                {{error}}
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Título:</label>
                            <input v-model="titulo" type="text" class="form-control" >
                        </div>
                        <div class="form-group">
                            <label>Descripción:</label>
                            <textarea v-model="descripcion" type="text" rows="5" class="form-control"></textarea> 
                        </div>
                        <div class="form-group">
                            <label>Imagen:</label>
                            <input v-model="imagen_url" type="text" class="form-control" >
                        </div>
                        <div class="form-group">
                            <label for="sel1">Categoría:</label>
                            <select class="form-control" v-model="categoria">
                                <option value="" selected disabled hidden>Elija una categoría</option>
                                <option v-for="cat in categorias" v-bind:value="cat.value">{{ cat.text }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-on:click="cerrarEdicion" type="button" class="btn btn-secondary">Cerrar</button>
                        <button v-on:click="editar" type="button" class="btn btn-success">Modificar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="jumbotron">
        <button class="btn btn-success" v-if="id_usuario" data-toggle="modal" data-target="#entrada">
            Crear entrada
        </button>
        <h3 class=" text-center" v-if="!id_usuario">Entradas del foro Udenar</h3>
        </br></br></br>
        <table class="table" id="tabla">
            <thead class="btn-success">
                <tr>
                    <th>Título</th>
                    <th>Fecha de publicación</th>
                    <th>Creador</th>
                    <th>Permisos</th>
                </tr>
            </thead>
            <tbody v-for="en in entradas">
                <tr>
                    <td> <router-link v-bind:to="{path: '/entradas/' + en.id}"> {{en.titulo}} </router-link></td>
                    <td> {{en.fecha_creacion}} </td>
                    <td>{{en.correo}} </td>
                    <td>
                        <div v-if="en.id_usuario == id_usuario">
                            <button v-on:click="eliminar(en.id)" type="button" class="close icono-eliminar" aria-label="Close">
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                            <button v-on:click="mostrarEditar(en)" type="button" class="close icono-editar" aria-label="Close">
                                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
        <br><br>
    </div>`,
    data: function() {
        return {
            entradas: [],
            titulo: "",
            descripcion: "",
            imagen_url: "",
            categoria: "",
            categorias: [{
                    text: 'Académico',
                    value: 1
                },
                {
                    text: 'Financiero',
                    value: 2
                },
                {
                    text: 'Matrículas',
                    value: 3
                },
                {
                    text: 'Tutorías',
                    value: 4
                }
            ],
            id_usuario: localStorage.getItem("id_usuario"),
            errores: [],
            id: ""
        }
    },
    created: function() {
        this.consultar();
        setInterval(this.ready, 1000);
    },
    methods: {
        consultar: function() {
            const vue = this;
            axios.get('./servidor/entradas.php?action=get')
                .then(function(response) {
                    vue.entradas = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        agregar: function() {
            var d = new Date();
            var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
            var data = {
                titulo: this.titulo,
                descripcion: this.descripcion,
                imagen_url: this.imagen_url,
                categoria: this.categoria,
                fecha_creacion: datestring,
                id_usuario: this.id_usuario
            };
            const vue = this;
            this.validarIngreso();
            if (this.errores.length == 0) {
                axios.post('./servidor/entradas.php?action=postEntradas', JSON.stringify(data))
                    .then(function(response) {
                        vue.titulo = "";
                        vue.descripcion = "";
                        vue.imagen_url = "";
                        vue.categoria = "";
                        vue.entradas = response.data;
                        $('#entrada').modal('toggle');
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        eliminar: function(id) {
            this.id_usuario = localStorage.getItem("id_usuario");
            if (!this.id_usuario) {
                $('#fracasoEliminar').modal('show');
                setTimeout(function() {
                    $('#fracasoEliminar').modal('hide');
                }, 2000);
            } else {
                var data = {
                    id: id
                };
                const vue = this;
                axios.post('./servidor/entradas.php?action=delete', JSON.stringify(data))
                    .then(function(response) {
                        vue.entradas = response.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        mostrarEditar: function(entrada) {
            this.id = entrada.id
            this.titulo = entrada.titulo;
            this.descripcion = entrada.descripcion;
            this.imagen_url = entrada.imagen_url;
            this.categoria = entrada.categoria;
            $('#editar').modal('show');
        },
        editar: function() {
            var data = {
                titulo: this.titulo,
                descripcion: this.descripcion,
                imagen_url: this.imagen_url,
                categoria: this.categoria,
                id_usuario: this.id_usuario
            };
            const vue = this;
            this.validarIngreso();
            if (this.errores.length == 0) {
                axios.post('./servidor/entradas.php?action=updateEntradas&id=' + this.id, JSON.stringify(data))
                    .then(function(response) {
                        console.log(response.data);
                        vue.titulo = "";
                        vue.descripcion = "";
                        vue.imagen_url = "";
                        vue.categoria = "";
                        vue.entradas = response.data;
                        $('#editar').modal('hide');
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        ready: function() {
            var self = this;
            setInterval(function() {
                self.id_usuario = localStorage.getItem("id_usuario");
            }, 1000)
        },
        validarIngreso: function() {
            this.errores = [];
            if (this.validCampo(this.titulo) == false) this.errores.push("El campo título es requerido");
            if (this.validCampo(this.descripcion) == false) this.errores.push("El campo descripción es requerido");
            if (this.validCampo(this.imagen_url) == false) this.errores.push("El campo imagen es requerido");
            if (this.validCampo(this.categoria) == false) this.errores.push("El campo categoría es requerido");
        },
        validCampo: function(campo) {
            if (campo == null || campo == 0 || /^\s+$/.test(campo)) {
                return false
            }
        },
        cerrarRegistro: function() {
            this.titulo = "";
            this.descripcion = "";
            this.imagen_url = "";
            this.categoria = "";
            $('#entrada').modal('hide');
        },
        cerrarEdicion: function() {
            this.titulo = "";
            this.descripcion = "";
            this.imagen_url = "";
            this.categoria = "";
            $('#editar').modal('hide');
        }
    }
})

export { entradasTabla };