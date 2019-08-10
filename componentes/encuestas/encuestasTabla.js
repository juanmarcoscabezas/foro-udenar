var encuestasTabla = Vue.component('encuestas-tabla', {
    template: `
    <div class="col-sm-9 table-responsive">
        <div class="jumbotron text-center">
        <h3>Encuestas del foro Udenar</h3>
        </br></br></br>
        <table class="table" id="tabla">
            <thead class="btn-success">
                <tr>
                    <th>Título</th>
                    <th>Creador</th>
                </tr>
            </thead>
            <tbody v-for="en in encuestas">
                <td> <router-link v-bind:to="{path: '/encuestas/' + en.id}"> {{en.titulo}} </router-link></td>
                <td>juanmarcoscabezas@gmail.com</td>
            </tbody>
        </table>
        </div>
        <br><br>
    </div>`,
    data: function() {
        return {
            encuestas: [],
            id_usuario: localStorage.getItem("id_usuario"),
        }
    },
    created: function() {
        this.consultar();
        setInterval(this.ready, 1000);
    },
    methods: {
        consultar: function() {
            const vue = this;
            axios.get('./servidor/encuestas.php?action=get')
                .then(function(response) {
                    vue.encuestas = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
})

export { encuestasTabla };