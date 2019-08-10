var ayuda = Vue.component('ayuda', {
    template: `
    <div>
        <div class=" col-sm-9">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title col-sm-11">Si tienes alguna duda, cuéntanos</h4>
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
                </div>
                <div class="modal-footer">
                    <button v-on:click="salir" type="button" class="btn btn-secondary">Regresar</button>
                    <button v-on:click="agregar" type="button" class="btn btn-success">Enviar</button>
                </div>
            </div>
            </br></br>
        </div>
    </div>`,
    data: function() {
        return {
            titulo: "",
            descripcion: "",
            errores: [],
            ayudas: []
        }
    },
    methods: {
        agregar: function() {
            var d = new Date();
            var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
            var data = {
                titulo: this.titulo,
                descripcion: this.descripcion,
                fecha_creacion: datestring,
                id_usuario: this.id_usuario
            };
            this.validarIngreso();
            const vue = this;
            if (this.errores.length == 0) {
                axios.post('./servidor/ayuda.php?action=post', JSON.stringify(data))
                    .then(function(response) {
                        vue.titulo = "";
                        vue.descripcion = "";
                        vue.ayudas = response.data;
                        console.log(response.data);

                        $('#exitomensaje').modal('show');
                        setTimeout(function() {
                            $('#exitomensaje').modal('hide');
                        }, 2000);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                this.$router.push('/');
            }
        },
        salir: function() {
            this.$router.go(-1);
        },
        validarIngreso: function() {
            this.errores = [];
            if (this.validCampo(this.titulo) == false) this.errores.push("El campo título es requerido");
            if (this.validCampo(this.descripcion) == false) this.errores.push("El campo descripción es requerido");
        },
        validCampo: function(campo) {
            if (campo == null || campo == 0 || /^\s+$/.test(campo)) {
                return false
            }
        },
    }
})

export { ayuda };