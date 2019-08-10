var publicaciones = Vue.component('publicaciones', {
    template: `
    <div class="col-sm-9">
        <div class="row publicaciones jumbotron" v-for="pu in publicaciones">
            <div class="col-sm-6">
                <img class="img-responsive" v-bind:src="pu.imagen_url">
            </div>
            <div class="col-sm-6">
                <h4> <b> {{pu.titulo}} </b></h4>
                <p class="salto-linea text-justify"> {{pu.descripcion}} </p>
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            publicaciones: [],
            titulo: "",
            descripcion: "",
            imagen_url: ""
        }
    },
    created: function() {
        this.consultar();
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
            var data = {
                titulo: this.titulo,
                descripcion: this.descripcion,
                imagen_url: this.imagen_url
            };
            const vue = this;
            axios.post('./servidor/entradas.php?action=post', JSON.stringify(data))
                .then(function(response) {
                    console.log(response.data);
                    vue.titulo = "";
                    vue.descripcion = "";
                    vue.imagen_url = "";
                    vue.entradas = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
})

export { publicaciones };