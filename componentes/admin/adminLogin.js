var adminLogin = Vue.component('admin-login', {
    template: `
    <div>
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
    <!-- Modal inicio de sesión-->
            <div class="modal-dialog" role="document" v-if="!admin">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title col-sm-11">Administración del Foro</h4>
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
                        <button v-on:click="cerrarIngreso" type="button" class="btn btn-secondary">Salir</button>
                        <button v-on:click="ingresar" type="button" class="btn btn-success">Entrar</button>
                    </div>
                </div>
            </div>
    </div>`,
    data: function() {
        return {
            ingreso: {
                codigo: "",
                password: "",
            },
            errores: [],
            admin: localStorage.getItem("admin", true)
        }
    },
    created: function() {
        if (this.admin) {
            this.$router.push('/admin-publicaciones');
        }
    },
    methods: {
        ingresar: function() {
            const vue = this;
            this.validarIngreso();
            if (this.errores.length == 0) {
                axios.post('./servidor/usuarios.php?login=ingresoAdmin', JSON.stringify(this.ingreso))
                    .then(function(response) {
                        console.log(response.data);
                        if (response.data.activo === true) {
                            vue.ingreso.codigo = "";
                            vue.ingreso.password = "";
                            localStorage.setItem("admin", true);
                            localStorage.setItem("adminCorreo", response.data.correo);
                            localStorage.setItem("adminId", response.data.id_usuario);
                            vue.$router.push('/admin-publicaciones');
                        } else {
                            vue.errores = response.data;
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        cerrarIngreso: function() {
            this.ingreso.codigo = "";
            this.ingreso.password = "";
            this.$router.push('/');
        },
        validarIngreso: function() {
            this.errores = [];
            if (this.validCampo(this.ingreso.codigo) == false) this.errores.push("El campo código es requerido");
            if (this.validCampo(this.ingreso.password) == false) this.errores.push("El campo contraseña es requerido");
        },
        validCampo: function(campo) {
            if (campo == null || campo == 0 || /^\s+$/.test(campo)) {
                return false
            }
        }
    }
})

export { adminLogin };