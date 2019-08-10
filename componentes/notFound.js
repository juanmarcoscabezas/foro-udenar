var notFound = Vue.component('not-found', {
    props: {
        entradas: Array
    },
    template: `
    <div>
        </br>
        <div class="jumbotron col-sm-9">
            <h3>La página a la que desea acceder no se encuentra disponible...</h3>
            <img class="img-responsive" src="https://fthmb.tqn.com/qLv10Pgd30kCy7OxXacwOWKxZ8M=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_325494917-5a68d8403418c600190a3e1f.jpg">
        </div>
    </div>`
})

export { notFound };