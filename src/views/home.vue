<template>
    <div>
        <section class="boxMainImage">
            <h1 class="mainPhrase">
                Um look criativo e bem montado pode fazer mágica
                <i class="fab fa-angellist"></i>
            </h1>
        </section>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        components: {
            
        },
        data(){
            return {
                logged: false,
                loggedUser: []
            }
        },
        beforeCreate(){
            axios
                .post('http://127.0.0.1:8000/api/userAuth',{
                    'currentToken': ''
                })
                .then((r)=>{
                    //Se o usuário estiver logado o sistema pega os dados da conta
                    this.logged = r.data.logged;
                    if(this.logged){
                        this.loggedUser = r.data.loggedUser;
                    }

                });
        }
    }
</script>

<style>
    .boxMainImage{
        width: 100vw;
        max-width: 100%;
        height: calc(90vh - 70px);
        margin-top: 70px;
        background-color: rgb(107, 20, 20);
        background-image: url('../assets/images/mainBanner.jpg');
        background-position: center;
        background-size: 100% 100%;
    }

    .mainPhrase{
        width: 500px;
        padding: 5px;
        position: relative;
        top: 40%;
        left: 12%;
        color: rgb(22, 22, 87);
        font-weight: lighter;
        font-size: 36px;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        transform: rotate(-5deg);
    }
</style>
