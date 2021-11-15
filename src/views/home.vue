<template>
    <div>
        <section class="boxMainImage">
            <h1 class="mainPhrase">
                Um look criativo e bem montado pode fazer mágica
                <i class="fas fa-magic"></i>
            </h1>
        </section>
        <section class="boxProducts">
            <h1><i class="fab fa-battle-net"></i> Nossos Produtos</h1>

            <div class="showCase">

                <div v-show="products.length > 0" v-for="product in products" v-bind:key="product.id" class="productSingle">
                    <img v-on:click="openProdcut(product.id)" :src="product.cover" />
                    <p class="productDescription">{{product.description}}</p>
                    <p class="productPrice">R$ {{product.price}}</p>
                    <button class="icon save"><i class="fas fa-heart"></i></button>
                    <button class="icon"><i class="fas fa-shopping-cart"></i></button>
                </div>

                <p v-show="products.length < 1" class="empty">
                    Não temos nenhum produto cadastrado ainda <i class="far fa-frown"></i>
                </p>

            </div>

        </section>

        <section class="boxPromotion">
            <div class="boxPromotion--phrase">
                <p>Até 30% de desconto</p>
                <p>aproveite essa oferta.<i class="fab fa-google-wallet"></i></p>
            </div>
            <img src="../assets/images/promotionIcon.png" />
        </section>

        <section class="userOpinions">
            <h1 class="userOpinions--title"><i class="fas fa-user-friends"></i> Depoimentos</h1>
            <div class="boxOpinions">
                <div class="opinionsSingle animate__animated animate__fadeIn">
                    <img src="../assets/images/no-picture.png" />
                    <p class="opinionsSingle--message">
                        Gostei muito do atendimento e dos produtos oferecidos, super recomendo.
                    </p>
                    <p class="opinionsSingle--author">Joana Silva</p>
                </div>
                <div class="opinionsSingle animate__animated animate__fadeIn">
                    <img src="../assets/images/no-picture.png" />
                    <p class="opinionsSingle--message">
                        Encontrei tudo que estava procurando, loja exelente.
                    </p>
                    <p class="opinionsSingle--author">Ana Clara</p>
                </div>
                <div class="opinionsSingle animate__animated animate__fadeIn">
                    <img src="../assets/images/no-picture.png" />
                    <p class="opinionsSingle--message">
                       O atendimento foi incrivel! O pessoal sabe tratar clientes
                    </p>
                    <p class="opinionsSingle--author">Pedro Antonio</p>
                </div>
                <div class="opinionsSingle animate__animated animate__fadeIn">
                    <img src="../assets/images/no-picture.png" />
                    <p class="opinionsSingle--message">
                       Muito top, recomendo demais :D 
                    </p>
                    <p class="opinionsSingle--author">Ana Beatriz</p>
                </div>
                <div class="controlsOpinions"></div>
            </div>
        </section>

        <section class="stayTurned">
            <h1><i class="fas fa-bahai"></i> Fique Atualizado</h1>
            <p>Envie seu email abaixo para nós podermos te enviar novas ofertas e novidades sobre nosso produtos.</p>
            <input type="text" placeholder="Digite o seu email" v-model="getUserEmail" />
            <p v-if="userSendEmail" class="successStayTurned animate__animated animate__rubberBand">Seu email foi cadastrado com sucesso <i class="far fa-smile-wink"></i></p>
            <p v-if="userSentAnInvalidEmail" class="errorStayTurned animate__animated animate__rubberBand"><i class="fas fa-times"></i> Digite um email valido!</p>
            <button v-on:click="sendEmail()">Enviar</button>
        </section>

        <footer>
            <h1>Nos Contate</h1>
            <div class="boxInfo">
                <div class="contacts">
                    <h2>Contatos</h2>
                    <p><i class="fas fa-map-marker-alt"></i> Essecial,praça zeferino, 162, centro, são joão</p>
                    <p><i class="fas fa-envelope"></i> lojaessencial@gmail.com</p>
                    <p><i class="fas fa-phone-alt"></i> +55 (33)8861-7281</p>
                    <a href=""><p><i class="fab fa-instagram"></i> Essencial.mv2</p></a>
                    <a href=""><p><i class="fab fa-facebook-f"></i> Essencial.mv2</p></a>
                </div>
                <div class="businessHours">
                    <h2>Funcionamento</h2>
                    <p>Segunda a Sexta</p>
                    <p>08:00 16:00</p>
                </div>
            </div>
            <div class="copyright">
                Copyright 2021 Essencial - Todos os direitos reservados
            </div>
        </footer>

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
                loggedUser: [],
                thereIsOpinions: true,
                userSendEmail: false,
                userSentAnInvalidEmail: false,
                products: [],
                getUserEmail: ''
            }
        },
        methods:{
            sendEmail: function(){
                if(this.getUserEmail == ''){
                    this.userSendEmail = false;
                    this.userSentAnInvalidEmail = true;
                    return false;
                }
                var usuario = this.getUserEmail.substring(0, this.getUserEmail.indexOf("@"));
                var dominio = this.getUserEmail.substring(this.getUserEmail.indexOf("@")+ 1, this.getUserEmail.length);

                if (!((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) && (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) && (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1) && (dominio.lastIndexOf(".") < dominio.length - 1))){
                    this.userSentAnInvalidEmail = true;
                    return false;
                }
                this.getUserEmail = '';
                this.userSentAnInvalidEmail = false;
                this.userSendEmail = true;
            },
            openProdcut: function(productId){
                this.$router.push('/produto/'+productId);
            }
        },
        beforeCreate(){
            axios
                .get('http://127.0.0.1:8000/api/clothes')
                .then((r)=>{
                    this.products = r.data.products;
                });
        },
        mounted(){
            var height = window.innerHeight - 69;
            document.querySelector('.boxMainImage').style.height = height+'px';

            /*userOpnions*/
            let startIn = 1;
            let waitingTime = 6000;
            let amount = document.querySelectorAll('.opinionsSingle').length;


            if(amount > 1){
                controlsGeneration(amount);
                slideStart(startIn);
            }else{
                let box = document.querySelector('.boxOpinions');
                box.innerHTML = "<h1 class='empty'>Não temos nenhum depoimento disponivel no momento!</h1>";
            }
            
            function slideStart(startIn){
                let opinionsSingle = document.querySelectorAll('.opinionsSingle');
                let opinionsControls = document.querySelectorAll('.controlsOpinions span');
                startIn = startIn - 1;

                opinionsControls[startIn].classList.add('controlsOpinions--selected');
                opinionsSingle[startIn].style.display = 'flex';

                let opinionsLoop = setInterval(function(){
                    for(let i = 0; i < amount; i++){
                        opinionsSingle[i].style.display = 'none';
                        opinionsControls[i].classList.remove('controlsOpinions--selected');
                    }

                    if(startIn < amount-1){
                        startIn++;
                    }else{
                        startIn = 0;
                    }
                    opinionsControls[startIn].classList.add('controlsOpinions--selected');
                    opinionsSingle[startIn].style.display = 'flex';
                }, waitingTime);

                for(let i = 0; i < amount; i++){
                    opinionsControls[i].addEventListener('click', function(){
                        clearInterval(opinionsLoop);
                        for(let i = 0; i < amount; i++){
                            opinionsSingle[i].style.display = 'none';
                            opinionsControls[i].classList.remove('controlsOpinions--selected');
                        }
                        slideStart(i+1);
                    })
                }
            }

            function controlsGeneration(amount){
                for(let i = 0; i < amount; i++){
                    let controlSingle = document.createElement("span");
                    document.querySelector('.controlsOpinions').appendChild(controlSingle);
                }
            }
        }
    }
</script>

<style>
    .boxMainImage{
        width: 100vw;
        max-width: 100%;
        height: 730px;
        margin-top: 70px;
        background-image: url('../assets/images/mainBanner.jpg');
        background-position: center;
        background-size: cover;
    }

    .mainPhrase{
        width: 550px;
        padding: 5px;
        position: relative;
        top: 40%;
        left: 12%;
        color: #202020;
        font-size: 40px;
        font-family: 'Dancing Script', cursive;
        text-transform: capitalize;
        transform: rotate(-5deg);
        text-align: center;
        font-weight:500;
    }
    .mainPhrase i{
        font-size: 22px;
    }
    /*Nossos Produtos*/
    .boxProducts{
        width: 90%;
        padding-top: 50px;
        margin: 0 auto;
        padding-bottom: 90px;
    }
    .boxProducts h1{
        text-transform: capitalize;
        font-weight: lighter;
        font-size: 28px;
        color: #4e4e4e;
        margin-bottom: 10px;
        font-family: Arial,tahoma,verdana;
        border-bottom: 1px solid rgb(192, 192, 192);
    }

    .showCase{
        max-width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap:wrap;
    }

    .productSingle{
        width: 200px;
        height: 300px;
        margin: 20px;
        text-align: center;
        font-family: Arial,tahoma,verdana;
    }

    .empty{
        color: #777777;
        margin-top: 60px;
        font-size: 24px;
    }

    .productSingle img{
        width: auto;
        max-width: 100%;
        height: 165px;
        margin-bottom: 20px;
        cursor: pointer;
    }

    .productDescription{
        color: #777777;
        margin-bottom: 10px;
        font-size: 13px;
        font-weight: normal;
        line-height: 12px;
    }

    .productPrice{
        font-size: 16px;
        color:#197ABB;
        font-weight: bold;
    }

    /*Promotion*/
    .boxPromotion{
        width: 100vw;
        max-width: 100%;
        height: 600px;
        background-image: url('../assets/images/banner2Home.jpg');
        background-position: center;
        background-size: cover;
        margin-bottom: 20px;
    }

    .boxPromotion--phrase{
        width: max-content;
        color: white;
        font-size: 50px;
        font-family: 'Dancing Script', cursive;
        position: relative;
        left: 150px;
        top: 150px;
        transform: rotate(-5deg);
    }

    .boxPromotion img{
        position: relative;
        top: 180px;
        left: 17%;
        width: 250px;
        height: 110px;
    }
    /*Depositions*/
    .userOpinions{
        width: 90%;
        margin: 0 auto;
        margin-top: 60px;
        margin-bottom: 40px;
    }
    .userOpinions--title{
        margin-top: 30px;
        text-transform: capitalize;
        font-weight: lighter;
        font-size: 28px;
        color: #4e4e4e;
        margin-bottom: 10px;
        font-family: Arial,tahoma,verdana;
        border-bottom: 1px solid rgb(192, 192, 192);
    }
    .boxOpinions{
        width: 100%;
        height: 400px;
        border:1px solid rgb(201, 201, 201);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .opinionsSingle{
        width: max-content;
        max-width: 50%;
        height: 230px;
        text-align: center;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .opinionsSingle img{
        width: 70px;
        height: 70px;
        border-radius: 100px;
        margin-bottom: 30px;
    }
    .opinionsSingle--message{
       font-size: 17px;
        margin-bottom: 30px;
        color: #777777;
    }

    .opinionsSingle--author{
       font-size: 18px;
        color: #535353;
    }

    .controlsOpinions{
        width: 60%;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .controlsOpinions span{
        padding: 6px;
        background: rgb(233, 233, 233);
        border: 1px solid gray;
        border-radius: 50px;
        margin-right: 5px;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .controlsOpinions--selected{
        background: rgb(0, 162, 255) !important;
    }
    /*stayTurned*/
    .stayTurned{
        width: 100%;
        padding: 50px 10px 70px 10px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .stayTurned h1{
        color: rgb(32, 32, 32);
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        margin-bottom: 20px;
        text-transform: uppercase;
    }
    .stayTurned p{
        width: 500px;
        color: #777777;
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        margin-bottom: 20px;
        text-align: center;
        font-size: 15px;
    }
    .stayTurned input{
        width: 400px;
        padding: 10px;
        font-size: 18px;
        outline: 0;
        border: 1px solid rgb(141, 141, 141);
        color: gray;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .stayTurned button{
        border: 0;
        padding: 10px;
        background: rgb(0, 110, 255);
        border-radius: 5px;
        text-transform: uppercase;
        color: white;
        font-size: 11px;
        cursor: pointer;
    }
    .stayTurned button:hover{
        background: rgb(0, 103, 238);
        color: rgb(241, 241, 241);
    }
    .successStayTurned{
        color: rgb(0, 212, 0) !important;
    }
    .errorStayTurned{
        color: rgb(194, 19, 19) !important;
    }
    /*Footer*/
    footer{
        background: rgb(13, 13, 14);
        border-top: 1px solid rgb(18, 18, 20);
        color: rgb(184, 184, 184);
    }
    footer h1{
        margin-top: 40px;
        text-align: center;
        color: rgb(184, 184, 184);
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        margin-bottom: 20px;
    }
    .boxInfo{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .businessHours h2,
    .contacts h2{
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        margin-bottom: 20px;
    }

    .contacts p,
    .businessHours p{
        margin-bottom: 10px;
        color: rgb(184, 184, 184);
    }
    .contacts{
        margin-right: 70px;
    }
    .copyright{
        border-top: 1px solid rgb(24, 24, 24);
        padding: 20px;
        text-align: center;
        margin-top: 20px;
    }
    /*RESPONSIVE*/
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
