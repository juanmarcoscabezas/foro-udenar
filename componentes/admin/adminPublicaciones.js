var adminPublicaciones = Vue.component('admin-publicaciones', {
    template: `
    <div>
    </br>
        <div class="col-sm-12 table-responsive" v-if="admin">
            <!-- Modal panel admin-->
                
                <div class="jumbotron">
                    <h2 class="text-center">Panel adminsitrativo - foro Udenar</h2>
                </div>
                <div class="row">
                <div class="col-sm-6">
                    <h4>Administrador: {{adminCorreo}} </h4>
                </div>
                <div class="col-sm-6">
                        <button v-on:click="cerrar" type="button" class="btn btn-danger pull-right">Cerrar sesión</button>
                </div>
                </div>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title col-sm-11">Crear publicación</h4>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-danger" v-if="errores2.length">
                                <div v-for="error in errores2">
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
                                    <option v-for="cat in categorias" v-bind:value="cat.value">{{ cat.text }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            
                            <button v-on:click="agregar" type="button" class="btn btn-success">Crear</button>
                        </div>
                    </div>
                </div>
    <!--                                   -->
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title col-sm-11">Crear encuesta</h4>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-danger" v-if="errores.length">
                                <div v-for="error in errores">
                                    {{error}}
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Título:</label>
                                <input v-model="ti" type="text" class="form-control" >
                            </div>
                            <div class="form-group">
                                <label>Pregunta:</label>
                                <textarea v-model="pregunta" type="text" rows="5" class="form-control"></textarea> 
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button v-on:click="agregarEncuesta" type="button" class="btn btn-success">Crear</button>
                        </div>
                    </div>
                </div>
            </hr>
            <table class="table" id="tabla">
                <thead class="btn-success">
                    <tr>
                        <th>Publicaciones</th>
                        <th>Fecha de publicación</th>
                        <th>Creador</th>
                        <th>permisos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pu in publicaciones">
                        <td> <router-link v-bind:to="{path: '/'}"> {{pu.titulo}} </router-link></td>
                        <td> {{pu.fecha_creacion}} </td>
                        <td> {{pu.correo}} </td>
                        <td>
                        <button v-on:click="eliminar(pu.id)" type="button" class="close icono-eliminar" aria-label="Close">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table class="table" id="tabla">
                <thead class="btn-success">
                    <tr>
                        <th>Encuestas</th>
                        <th>Creador</th>
                        <th>Permisos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="en in encuestas">
                        <td> {{en.titulo}} </td>
                        <td> {{en.correo}} </td>
                        <td>
                        <button v-on:click="eliminarEncuesta(en.id)" type="button" class="close icono-eliminar" aria-label="Close">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-12 table-responsive" v-if="!admin">
            <h1 class="text-center">No tienes permisos para acceder a este lugar</h1>
            </br></br>
            <h4>Iniciar sesión como <router-link v-bind:to="{path: '/admin'}">administrador</router-link></h4>
            </br>
            <h4><router-link v-bind:to="{path: '/'}">Volver</router-link> al inicio</h4>
            <div class="row ">
                <img class="img-responsive bloqueo center-block" src="./assets/bloqueo.jpg">
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            publicaciones: [],
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
            admin: localStorage.getItem("admin"),
            adminCorreo: localStorage.getItem("adminCorreo"),
            id_usuario: localStorage.getItem("adminId"),
            ti: "",
            pregunta: "",
            encuestas: [],
            errores: [],
            errores2: []
        }
    },
    created: function() {
        this.consultar();
        this.consultarEncuestas();
        setInterval(this.ready, 1000);
    },
    methods: {
        consultar: function(juego) {
            const vue = this;
            axios.get('./servidor/publicaciones.php?action=get')
                .then(function(response) {
                    vue.publicaciones = response.data;
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
            this.validarPublicacion();
            if (this.errores2.length == 0) {
                axios.post('./servidor/publicaciones.php?action=post', JSON.stringify(data))
                    .then(function(response) {
                        vue.titulo = "";
                        vue.descripcion = "";
                        vue.imagen_url = "";
                        vue.publicaciones = response.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        cerrar: function() {
            localStorage.removeItem("admin");
            localStorage.removeItem("adminCorreo");
            localStorage.removeItem("adminId");
            this.admin = localStorage.getItem("admin");
            this.adminCorreo = localStorage.getItem("adminCorreo");
            this.id_usuario = localStorage.getItem("adminId");
            this.$router.push('/');
        },
        eliminar: function(id) {
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
                axios.post('./servidor/publicaciones.php?action=delete', JSON.stringify(data))
                    .then(function(response) {
                        vue.publicaciones = response.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        agregarEncuesta: function() {
            var data = {
                titulo: this.ti,
                pregunta: this.pregunta,
                id_usuario: this.id_usuario
            };
            const vue = this;
            this.validarEncuesta();
            if (this.errores.length == 0) {
                axios.post('./servidor/encuestas.php?action=post', JSON.stringify(data))
                    .then(function(response) {
                        vue.ti = "";
                        vue.pregunta = "";
                        vue.encuestas = response.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        consultarEncuestas: function() {
            const vue = this;
            axios.get('./servidor/encuestas.php?action=get')
                .then(function(response) {
                    vue.encuestas = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        eliminarEncuesta: function(id) {
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
                axios.post('./servidor/encuestas.php?action=deleteencuesta', JSON.stringify(data))
                    .then(function(response) {
                        vue.encuestas = response.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        validarPublicacion: function() {
            this.errores2 = [];
            if (this.validCampo(this.titulo) == false) this.errores2.push("El campo título es requerido");
            if (this.validCampo(this.descripcion) == false) this.errores2.push("El campo descripción es requerido");
            if (this.validCampo(this.imagen_url) == false) this.errores2.push("El campo imagen es requerido");
            if (this.validCampo(this.categoria) == false) this.errores2.push("El campo categoría es requerido");
        },
        validarEncuesta: function() {
            this.errores = [];
            if (this.validCampo(this.ti) == false) this.errores.push("El campo título es requerido");
            if (this.validCampo(this.pregunta) == false) this.errores.push("El campo pregunta es requerido");
        },
        validCampo: function(campo) {
            if (campo == null || campo == 0 || /^\s+$/.test(campo)) {
                return false
            }
        },
    }
})

export { adminPublicaciones };