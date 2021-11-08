<template>
    <div>
        <section class="boxMainImage">
            <h1 class="mainPhrase">
                Um look criativo e bem montado pode fazer mágica
                <i class="fab fa-angellist"></i>
            </h1>
        </section>
        teste
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
        },
        mounted(){
            var height = window.innerHeight - 69;
            document.querySelector('.boxMainImage').style.height = height+'px';
        }
    }
</script>

<style>
    .boxMainImage{
        width: 100vw;
        max-width: 100%;
        height: 730px;
        margin-top: 70px;
        background-color: rgb(107, 20, 20);
        background-image: url('../assets/images/mainBanner.jpg');
        background-position: center;
        background-size: cover;
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
        text-align: center;
    }

    @media screen and (max-width: 1350px){
        .mainPhrase{
            width: 350px;
            font-size: 25px;
        }
    }
    @media screen and (max-width: 1020px){
        .mainPhrase{
            left: 3%;
            font-size: 25px;
        }
    }
    @media screen and (max-width: 850px){
        .boxMainImage{
            background-image: url('../assets/images/mainBannerMobile.jpg');
        }
        .mainPhrase{
            width: 350px;
            top: 10%;
            left: 20%;
            font-size: 27px;
        }
    }
    @media screen and (max-width: 435px){
        .mainPhrase{
            width: 90%;
            top: 10%;
            left: 5%;
            font-size: 23px;
        }
    }
</style>
