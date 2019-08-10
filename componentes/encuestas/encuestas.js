var encuestas = Vue.component('encuestas', {
    template: `
    <div class="col-sm-9">
    <!-- Modal fracaso-->
    <div class="modal fade" id="fracasoVota" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog btn-danger" role="document">
            <div class="modal-content btn-danger">
                <div class="modal-header btn-danger">
                    <h4 class="modal-title col-sm-11 btn-danger">Debe iniciar sesión para votar</h4>
                    <button type="button" class="close col-sm-1" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
        <div class="row publicaciones jumbotron">
            <h3><b>{{pregunta.titulo}}</b></h3>
            <div class="row">
            <div class="container col-sm-4 col-sm-offset-1">
                <h2>Si</h2>
                <div class="progress">
                    <div class="progress-bar" v-bind:style="{width:porPositivos}"> {{promPositivos}}%</div>
                </div>
            </div>
            <div class="container col-sm-4 col-sm-offset-1">
                <h2>No</h2>
                <div class="progress">
                    <div class="progress-bar" v-bind:style="{width:porNegativos}">{{promNegativos}}%</div>
                </div>
            </div>
            </div>
            <div class="alert alert-danger" v-if="errores.length">
                <div v-for="error in errores">
                    {{error}}
                </div>
            </div>
            </br>
            <p> {{pregunta.pregunta}} </p>
            <input type="radio" id="one" value="1" v-model="respuesta">
            <label for="one">Si</label>
            <input type="radio" id="two" value="0" v-model="respuesta">
            <label for="two">No</label>
            </br></br>
            <button v-on:click="cerrar" type="button" class="btn btn-secondary">Cerrar</button>
            <button v-on:click="enviar" type="button" class="btn btn-success">Enviar</button>
        </div>
        </br>
    </div>`,
    data: function() {
        return {
            pregunta: {},
            respuesta: "",
            id_usuario: localStorage.getItem("id_usuario"),
            errores: [],
            promPositivos: 0,
            promNegativos: 0,
            promedio: 0,
            porPositivos: "",
            porNegativos: "",
        }
    },
    props: ['id'],
    created: function() {
        this.consultarPreguntas();
    },
    methods: {
        consultarPreguntas: function() {
            const vue = this;
            axios.get('./servidor/encuestas.php?action=getById&id=' + vue.id)
                .then(function(response) {
                    vue.pregunta = response.data.encuesta;
                    var negativos = 0;
                    var positivos = 0;
                    if (response.data.negativos) {
                        negativos = response.data.negativos.negativos;
                    }
                    if (response.data.positivos) {
                        positivos = response.data.positivos.positivos;
                    }
                    vue.promPositivos = Math.floor(positivos / (positivos + negativos) * 100);
                    vue.promNegativos = Math.floor(negativos / (positivos + negativos) * 100);
                    vue.porPositivos = vue.promPositivos + "%";
                    vue.porNegativos = vue.promNegativos + "%";
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        validarIngreso: function() {
            this.errores = [];
            if (this.validCampo(this.respuesta) == false) this.errores.push("Debe seleccionar una respuesta");
        },
        validCampo: function(campo) {
            if (campo == null || campo.length == 0 || /^\s+$/.test(campo)) {
                return false
            }
        },
        enviar: function() {
            this.id_usuario = localStorage.getItem("id_usuario");
            var d = new Date();
            var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
            var data = {
                respuesta: this.respuesta,
                id_usuario: this.id_usuario,
                fecha_creacion: datestring,
            };
            const vue = this;
            if (!this.id_usuario) {
                $('#fracasoVota').modal('show');
                setTimeout(function() {
                    $('#fracasoVota').modal('hide');
                }, 2000);
            } else {
                this.validarIngreso();
                if (this.errores.length == 0) {
                    axios.post('./servidor/encuestas.php?action=postRespuestas&id=' + vue.id, JSON.stringify(data))
                        .then(function(response) {
                            vue.errores = response.data;
                            if (!response.data) {
                                $('#exitoencuesta').modal('show');
                                setTimeout(function() {
                                    $('#exitoencuesta').modal('hide');
                                }, 2000);
                                vue.$router.go(-1);
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            }
        },
        cerrar: function() {
            this.$router.go(-1);
        }
    }
})

export { encuestas };