var barraNavegacion = Vue.component('barra-navegacion', {
    template: `
    <div class="espacio-barra2">
    <!-- Modal imagen-->
        <div class="modal fade" id="imagen" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content ">
                    <div class="modal-header ">
                        <h4 class="modal-title col-sm-11">Seleccione una imagen</h4>
                        <button type="button" class="close col-sm-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body row">
                        <div class="col-sm-2" v-for="img in imagenes">
                            <a><img v-bind:src="img" class="img-responsive avatar" v-on:click="selImg(img)"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- Modal exito-->
        <div class="modal fade" id="exito" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog btn-success" role="document">
                <div class="modal-content btn-success">
                    <div class="modal-header btn-success">
                        <h4 class="modal-title col-sm-11 btn-success">Inicio exitoso</h4>
                        <button type="button" class="close col-sm-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    <!-- Modal exito mensaje-->
        <div class="modal fade" id="exitomensaje" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog btn-info" role="document">
                <div class="modal-content btn-info">
                    <div class="modal-header btn-info">
                        <h4 class="modal-title col-sm-11 btn-info">Muchas gracias por ayudarnos</h4>
                        <button type="button" class="close col-sm-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    <!-- Modal exito encuesta-->
        <div class="modal fade" id="exitoencuesta" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog btn-info" role="document">
                <div class="modal-content btn-info">
                    <div class="modal-header btn-info">
                        <h4 class="modal-title col-sm-11 btn-info">Muchas gracias responder la encuesta</h4>
                        <button type="button" class="close col-sm-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    <!-- Modal exito registro-->
        <div class="modal fade" id="exitoRe" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog btn-success" role="document">
                <div class="modal-content btn-success">
                    <div class="modal-header btn-success">
                        <h4 class="modal-title col-sm-11 btn-success">Registro exitoso</h4>
                        <button type="button" class="close col-sm-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    <!-- Modal inicio de sesión-->
        <div class="modal fade" id="ingreso" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title col-sm-11">Iniciar sesión</h4>
                        <button v-on:click="cerrarIngreso" type="button" class="close col-sm-1" aria-label="Close">
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
                            <label for="usr">Código:</label>
                            <input v-model="ingreso.codigo" type="text" class="form-control" >
                        </div>
                        <div class="form-group">
                            <label for="pwd">Contraseña:</label>
                            <input v-model="ingreso.password" type="password" class="form-control" >
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-on:click="cerrarIngreso" type="button" class="btn btn-secondary">Cerrar</button>
                        <button v-on:click="ingresar" type="button" class="btn btn-success">Entrar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal registro-->
        <div class="modal fade" id="registro" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title col-sm-11">Registrarse</h4>
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
                        <label for="usr">Código:</label>
                        <input v-model="registro.codigo" type="text" class="form-control" >
                    </div>
                    <div class="form-group">
                        <label for="pwd">Contraseña:</label>
                        <input v-model="registro.password" type="password" class="form-control" >
                    </div>
                    <div class="form-group">
                        <label for="usr">Nombre:</label>
                        <input v-model="registro.nombre" type="text" class="form-control" >
                    </div>
                    <div class="form-group">
                        <label for="usr">Apellido:</label>
                        <input v-model="registro.apellido" type="text" class="form-control" >
                    </div>
                    <div class="form-group">
                        <label for="usr">Correo:</label>
                        <input v-model="registro.correo" type="email" class="form-control" >
                    </div>
                    <div class="form-group">
                        <label for="usr">Programa:</label>
                        <input v-model="registro.programa" type="text" class="form-control" >
                    </div>
                </div>
                <div class="modal-footer">
                    <button v-on:click="cerrarRegistro" type="button" class="btn btn-secondary">Cerrar</button>
                    <button v-on:click="registrar" type="button" class="btn btn-success">Registrarse</button>
                </div>
                </div>
            </div>
        </div>
    <!-- Barra de Navegacion -->
        <nav class="navbar cabecera navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>                        
                                </button>
                    <router-link class="logo" to="/"><img src="./assets/logo.png"></router-link>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav">
                        <li><router-link to="/inicio" class="btn">Inicio</router-link></li>
                        <li><router-link to="/entradas" class="btn">Entradas</router-link></li>
                        <li><router-link to="/encuestas" class="btn">Encuestas</router-link></li>
                        <li><router-link to="/ayuda" class="btn">Feedback</router-link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right" v-if="!activo">
                        <li data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="btn" href="#"><span class="glyphicon glyphicon-log-in"></span> Iniciar sesión</a></li>
                        <ul class="dropdown-menu">
                            <li data-toggle="modal" data-target="#ingreso"><a>Iniciar sesión</a></li>
                            <li data-toggle="modal" data-target="#registro"><a>Registrarse</a></li>
                            <li role="separator" class="divider"></li>
                            <li><router-link to="/ayuda">Feedback</router-link></li>
                        </ul>
                    </ul>
                    <ul class="nav navbar-nav navbar-right" v-if="activo">
                        <li data-toggle="modal" data-target="#imagen" class="img-correo"><img v-bind:src="img_url" alt="Avatar" class="avatar img-responsive"></li>
                        <li data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="correo btn"> {{correo}} <span class="caret"></span></li>
                        <ul class="dropdown-menu">
                            <li><a>Configuración</a></li>
                            <li v-on:click="salir"><a>Salir</a></li>
                            <li role="separator" class="divider"></li>
                            <li><router-link to="/ayuda" >Feedback</router-link></li>
                        </ul>
                    </ul>
                </div>
            </div>
        </nav>
    </div>`,
    data: function() {
        return {
            ingreso: {
                codigo: "",
                password: "",
            },
            registro: {
                codigo: "",
                password: "",
                nombre: "",
                apellido: "",
                correo: "",
                programa: ""
            },
            activo: localStorage.getItem("activo"),
            correo: localStorage.getItem("correo"),
            img_url: localStorage.getItem("img_url"),
            id_usuario: localStorage.getItem("id_usuario"),
            errores: [],
            imagenes: ["./assets/user/1.png", "./assets/user/2.png", "./assets/user/3.png", "./assets/user/4.png", "./assets/user/5.png", "./assets/user/6.png"]
        }
    },
    created: function() {

    },
    methods: {
        registrar: function() {
            const vue = this;
            this.validarRegistro();
            if (this.errores.length == 0) {
                axios.post('./servidor/usuarios.php?login=registro', JSON.stringify(this.registro))
                    .then(function(response) {
                        if (response.data.length == 0) {
                            vue.registro.codigo = "";
                            vue.registro.password = "";
                            vue.registro.nombre = "";
                            vue.registro.apellido = "";
                            vue.registro.correo = "";
                            vue.registro.programa = "";
                            $('#registro').modal('toggle');
                            $('#exitoRe').modal('show');
                            setTimeout(function() {
                                $('#exitoRe').modal('hide');
                            }, 2000);
                        } else {
                            vue.errores = response.data;
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        ingresar: function() {
            const vue = this;
            this.validarIngreso();
            if (this.errores.length == 0) {
                axios.post('./servidor/usuarios.php?login=ingreso', JSON.stringify(this.ingreso))
                    .then(function(response) {
                        if (response.data.activo === true) {
                            vue.ingreso.codigo = "";
                            vue.ingreso.password = "";
                            var activo = true;
                            var correo = response.data.correo;
                            var img_url = response.data.img_url;
                            var id_usuario = response.data.id_usuario;
                            localStorage.setItem("activo", activo);
                            localStorage.setItem("correo", correo);
                            localStorage.setItem("img_url", img_url);
                            localStorage.setItem("id_usuario", id_usuario);
                            vue.activo = localStorage.getItem("activo");
                            vue.correo = localStorage.getItem("correo");
                            vue.img_url = localStorage.getItem("img_url");
                            vue.id_usuario = localStorage.getItem("id_usuario")
                            $('#ingreso').modal('toggle');
                            $('#exito').modal('show');
                            setTimeout(function() {
                                $('#exito').modal('hide');
                            }, 2000);
                        } else {
                            vue.errores = response.data;
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        salir: function() {
            localStorage.removeItem("activo");
            localStorage.removeItem("correo");
            localStorage.removeItem("img_url");
            localStorage.removeItem("id_usuario");
            this.activo = localStorage.getItem("activo");
            this.correo = localStorage.getItem("correo");
            this.img_url = localStorage.getItem("img_url");
            this.id_usuario = localStorage.getItem("id_usuario");
        },
        validarRegistro: function() {
            this.errores = [];
            if (this.validCampo(this.registro.codigo) == false) this.errores.push("El campo código es requerido");
            if (this.validCampo(this.registro.password) == false) this.errores.push("El campo contraseña es requerido");
            if (this.registro.password.length < 6) this.errores.push("La contraseña debe tener al menos 6 caracteres");
            if (this.validCampo(this.registro.nombre) == false) this.errores.push("El campo nombre es requerido");
            if (this.validCampo(this.registro.apellido) == false) this.errores.push("El campo apellido es requerido");
            if (this.validCampo(this.registro.correo) == false) this.errores.push("El campo correo es requerido");
            if (this.validEmail(this.registro.correo) == false) this.errores.push("El campo correo requiere un email válido");
        },
        validarIngreso: function() {
            this.errores = [];
            if (this.validCampo(this.ingreso.codigo) == false) this.errores.push("El campo código es requerido");
            if (this.validCampo(this.ingreso.password) == false) this.errores.push("El campo contraseña es requerido");
        },
        validEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validCampo: function(campo) {
            if (campo == null || campo == 0 || /^\s+$/.test(campo)) {
                return false
            }
        },
        cerrarRegistro: function() {
            this.registro.codigo = "";
            this.registro.password = "";
            this.registro.nombre = "";
            this.registro.apellido = "";
            this.registro.correo = "";
            $('#registro').modal('hide');
        },
        cerrarIngreso: function() {
            this.ingreso.codigo = "";
            this.ingreso.password = "";
            $('#ingreso').modal('hide');
        },
        selImg: function(img) {
            $('#imagen').modal('hide');
            var imagen = {
                id_usuario: localStorage.getItem("id_usuario"),
                img_url: img
            };
            const vue = this;
            axios.post('./servidor/usuarios.php?login=imagen', JSON.stringify(imagen))
                .then(function(response) {
                    localStorage.setItem("img_url", response.data.img_url);
                    vue.img_url = localStorage.getItem("img_url");
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
})

export { barraNavegacion };