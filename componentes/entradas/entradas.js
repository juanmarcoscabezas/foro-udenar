var entradas = Vue.component('entradas', {
    template: `
    <div class="col-sm-9">
    <!-- Modal fracaso-->
        <div class="modal fade" id="fracaso" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog btn-danger" role="document">
                <div class="modal-content btn-danger">
                    <div class="modal-header btn-danger">
                        <h4 class="modal-title col-sm-11 btn-danger">Debe iniciar sesión para comentar</h4>
                        <button type="button" class="close col-sm-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    <!-- Modal fracaso-->
        <div class="modal fade" id="fracasoEliminar" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog btn-danger" role="document">
                <div class="modal-content btn-danger">
                    <div class="modal-header btn-danger">
                        <h4 class="modal-title col-sm-11 btn-danger">Debe iniciar sesión para elimiar comentarios</h4>
                        <button type="button" class="close col-sm-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row publicaciones jumbotron" v-for="en in entradas">
            <div class="col-sm-6">
                <img class="img-responsive" v-bind:src="en.imagen_url">
            </div>
            <div class="col-sm-6">
                <h4> <b>{{en.titulo}}</b> </h4>
                <p class="text-justify"> {{en.descripcion}} </p>
            </div>
        </div>
        <div class="row">
            <h2 class="col-sm-12">Comentarios</h2>
            <div class="form-group">
                <div class="alert alert-danger" v-if="errores.length">
                    <div v-for="error in errores">
                        {{error}}
                    </div>
                </div>
                <div class="col-sm-11">
                    <input v-model="comentarioDescripcion" type="text" class="form-control" placeholder="Escribe un comentario...">
                </div>
                <div class="col-sm-1">
                    <button v-on:click="agregarComentario" type="button" class="btn btn-success" data-dismiss="modal">Enviar</button>
                </div>
            </div>
        </div>
        </br>
        <div>
            <div class="jumbotron row" v-for="co in comentarios">
                <div class="col-sm-11">
                    <img v-bind:src="co.img" alt="Avatar" class="avatar img-responsive pull-left comentario-img">
                    <h5><b> {{co.correo}} </b> <small> {{co.fecha_creacion}} </small> </h5>
                    <p> {{co.descripcion}} </p>
                </div>
                <div class="col-sm-1" v-if="co.id_usuario == id_usuario">
                    <button v-on:click="eliminarComentario(co.id)" type="button" class="close pull-rigth icono-eli" aria-label="Close">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            entradas: [],
            nuevaEntrada: {
                titulo: "",
                descripcion: "",
                imagen_url: ""
            },
            comentarios: [],
            comentarioDescripcion: "",
            id_usuario: localStorage.getItem("id_usuario"),
            errores: []
        }
    },
    props: ['id'],
    created: function() {
        this.consultarEntradas();
        this.consultarComentarios();
    },
    methods: {
        consultarEntradas: function() {
            const vue = this;
            axios.get('./servidor/entradas.php?action=getById&id=' + vue.id)
                .then(function(response) {
                    vue.entradas = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        consultarComentarios: function(juego) {
            const vue = this;
            axios.get('./servidor/entradas.php?action=getComentarios&id=' + vue.id)
                .then(function(response) {
                    vue.comentarios = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        agregarComentario: function() {
            this.id_usuario = localStorage.getItem("id_usuario");
            if (!this.id_usuario) {
                $('#fracaso').modal('show');
                setTimeout(function() {
                    $('#fracaso').modal('hide');
                }, 2000);
            } else {
                this.validarIngreso();
                if (this.errores.length == 0) {
                    const vue = this;
                    var d = new Date();
                    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
                    var nuevoComentario = {
                        id_entrada: this.id,
                        id_usuario: this.id_usuario,
                        descripcion: this.comentarioDescripcion,
                        fecha_creacion: datestring,
                        activo: 1
                    };
                    console.log(nuevoComentario);

                    axios.post('./servidor/entradas.php?action=postComentarios&id=' + vue.id, JSON.stringify(nuevoComentario))
                        .then(function(response) {
                            vue.comentarios = response.data;
                            vue.comentarioDescripcion = "";
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            }
        },
        eliminarComentario: function(id) {
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
                axios.post('./servidor/entradas.php?action=deleteComentarios&id=' + vue.id, JSON.stringify(data))
                    .then(function(response) {
                        vue.comentarios = response.data;
                        vue.comentarioDescripcion = "";
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        validarIngreso: function() {
            this.errores = [];
            if (this.validCampo(this.comentarioDescripcion) == false) this.errores.push("El campo comentario es requerido");
        },
        validCampo: function(campo) {
            if (campo == null || campo == 0 || /^\s+$/.test(campo)) {
                return false
            }
        }
    }
})

export { entradas }