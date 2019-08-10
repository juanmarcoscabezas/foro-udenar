var barraLateral = Vue.component('barra-lateral', {
    template: `
    <div>
        <div class="col-sm-2 col-sm-offset-1 barra-lateral text-center">
            <h4>Redes sociales</h4>
            <div class="text-left">
                <a href="https://www.facebook.com/groups/412933232514886/">
                    <i class="fab fa-facebook"></i> Facebook
                </a>
                <br>
                <a href="https://www.twitter.com">
                    <i class="fab fa-twitter-square"></i> Twitter
                </a>
            </div>
        </div>
    </div>`
})

export { barraLateral };