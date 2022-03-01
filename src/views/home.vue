<template>
    <div>
        <section class="boxMainImage">
            <h1 class="mainPhrase">
                Um look criativo e bem montado pode fazer mágica
                <i class="fas fa-magic"></i>
            </h1>
        </section>
        <section class="boxProducts">
            <h1>Nossos Produtos</h1>
            <div class="textDetail"></div>

            <div class="showCase">

                <div v-show="products.length > 0" v-for="product in products" v-bind:key="product.id" class="productSingle">
                    <img v-on:click="openProdcut(product.id)" :src="product.cover" />
                    <p v-on:click="openProdcut(product.id)" class="productName">{{product.name}}</p>
                    <p class="sex">{{product.sex}}</p>
                    <p class="productPrice">R$ {{(product.price).toFixed(2).replace('.', ',')}}</p>
                    
                    <!--
                    <button v-on:click="addToFavorite(product.id)" class="icon save"><i class="fas fa-heart"></i></button>
                    <button v-on:click="addToKart(product.id)" class="icon"><i class="fas fa-shopping-cart"></i></button>
                    -->
                </div>

                <p v-show="products.length < 1 && !loading" class="empty">
                    Não temos nenhum produto cadastrado ainda <i class="far fa-frown"></i>
                </p>

                <p v-show="loading" class="loadingProducts">
                    Carregando...
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
            <h1 class="userOpinions--title">Depoimentos</h1>
            <div class="textDetail"></div>

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
                    <p><i class="fas fa-map-marker-alt"></i> Loja Essecial, praça X, 999, centro, Cidade X</p>
                    <p><i class="fas fa-envelope"></i> exemplo@exemplo.com</p>
                    <p><i class="fas fa-phone-alt"></i> +99 (99)9999-9999</p>
                    <a href=""><p><i class="fab fa-instagram"></i> nomeaqui</p></a>
                    <a href=""><p><i class="fab fa-facebook-f"></i> nomeaqui</p></a>
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
                getUserEmail: '',
                loading: true
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
            },
            addToFavorite: function(productId){
                if(this.logged){
                    
                    axios
                        .post('https://api.lojaessencial.ga/api/addFavorite',{
                            'id': this.loggedUser.id,
                            'productid': productId
                        })
                        .then((r)=>{
                            if(r.data['error']){
                                alert('Este produto já foi adicionado aos favoritos.')
                            }else{  
                                alert("Produto adicionado aos favoritos")
                            }
                        });

                }else{
                    alert("Você deve estar logado para adicionar aos favoritos.")
                }
            },
            addToKart: function(productId){
                if(this.logged){
                    
                    axios
                        .post('https://api.lojaessencial.ga/api/addToKart',{
                            'id': this.loggedUser.id,
                            'productid': productId
                        })
                        .then((r)=>{
                            if(r.data['error']){
                                alert('Este produto já foi adicionado ao seu carrinho, caso queira mais quantidades dele, basta definir isso no seu carrinho.')
                            }else{  
                                alert("Produto adicionado no carrinho.")
                            }
                        });

                }else{
                    alert("Você deve estar logado para adicionar ao carrinho.")
                }
            }
        },
        beforeCreate(){
            axios
                .get('https://api.lojaessencial.ga/api/clothes')
                .then((r)=>{
                    this.products = r.data.products;
                })
                .finally(()=>{
                    this.loading = false;
                });

            axios
                .post('https://api.lojaessencial.ga/api/userAuth',{
                    'currentToken': localStorage.getItem('token')
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
    body{
        background: #ffffff !important;
    }
    .boxMainImage{
        width: 100vw;
        max-width: 100%;
        height: 100vh !important;
        margin-top: 80px;
        background-image: url('../assets/images/banner.png');
        background-position: center;
        background-size: cover;
        border-bottom: 1px solid rgb(194, 194, 194);
    }

    .mainPhrase{
        width: 570px !important;
        padding: 5px;
        position: relative;
        top: 40%;
        left: 5%;
        color: #202020;
        font-size: 40px !important;
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
        padding-top: 100px;
        margin: 0 auto;
        padding-bottom: 90px;
    }
    
    .userOpinions--title,
    .boxProducts h1{
        text-transform: capitalize;
        font-weight: 400;
        font-size: 28px;
        color: #141414;
        margin-bottom: 10px;
        font-family: 'Lato', sans-serif;
        text-align: center;
    }

    .textDetail{
        width: 70px !important;
        margin: 0 auto;
        border-top: 2px solid #066AFF;
    }

    .showCase{
        max-width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap:wrap;
        margin-top: 50px;
    }

    .productSingle{
        width: 200px;
        margin: 20px;
        margin-bottom: 70px;
        font-family: Arial,tahoma,verdana;
    }

    .empty{
        color: #777777;
        margin-top: 60px;
        font-size: 24px;
    }

    .productSingle img{
        width: 100%;
        max-width: 100%;
        height: 170px;
        margin-bottom: 10px;
        cursor: pointer;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgb(211, 211, 211);
    }

    .productName{
        color: #000000;
        font-size: 15px;
        font-weight:500;
        cursor: pointer;
        /*max-width: 70ch;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;*/
        font-family: 'Lato', sans-serif;
        padding-bottom: 5px;
        text-align: left !important;
        margin-bottom: 5px;
        cursor: pointer;
    }

    .sex{
        text-align: left !important;
        color: #838383;
        margin-bottom: 10px;
        font-size: 14px;
        text-transform: capitalize;
    }

    .productPrice{
        font-size: 14px;
        color:#141414;
        font-weight: 400;
        font-family: 'Lato', sans-serif;
    }

    /*Promotion*/
    .boxPromotion{
        width: 95vw;
        max-width: 100%;
        height: 600px;
        margin: 0 auto;
        background-image: url('../assets/images/discount.png');
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
        margin-top: 80px;
        margin-bottom: 40px;
    }
    .userOpinions--title{
        margin-top: 100px;
        text-transform: capitalize;
        font-weight: lighter;
        font-size: 28px;
        color: #1b1b1b;
        margin-bottom: 10px;
        font-family: 'Lato', sans-serif;
    }
    .boxOpinions{
        width: 100%;
        height: 400px;
        border:1px solid rgb(165, 165, 165);
        display: flex;
        border-radius: 5px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(rgb(235, 229, 229), rgb(226, 226, 226));
        margin-top: 50px;
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
        border: 1px solid rgb(190, 190, 190);
    }
    .opinionsSingle--message{
       font-size: 16px;
        margin-bottom: 30px;
        color: #383838;
        font-family: 'Lato', sans-serif;
    }

    .opinionsSingle--author{
       font-size: 18px;
        color: #272727;
        font-family: 'Lato', sans-serif;
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
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        margin-bottom: 20px;
        text-transform: uppercase;
        color: #2b2b2b;
        font-family: 'Lato', sans-serif;
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
        padding: 8px 15px;
        border: 0;
        cursor: pointer;
        background: rgb(0, 152, 240);
        color: white;
        border-radius: 3px;
    }
    .stayTurned button:hover{
        background: rgb(0, 147, 233);
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
            font-size: 25px !important;
        }

        .userOpinions--title,
        .boxProducts h1,
         .stayTurned h1{
            font-size: 22px;
        }
        .boxPromotion{
            height: 450px;
        }
        .boxPromotion--phrase{
            font-size: 38px;
            left: 80px;
            top: 150px;
        }
        .boxPromotion img{
            top: 170px;
            left: 13%;
            width: 200px;
            height: 80px;
        }
    }
    @media screen and (max-width: 850px){

        .boxMainImage{
            height: 300px !important;
        }

        .mainPhrase{
            width: 250px !important;
            top: 39% !important;
            left: 6%;
            font-size: 22px !important;
        }
        footer h1{
            font-size: 24px;
        }
        .businessHours h2,
        .contacts h2{
            font-size: 19px;
        }
        .contacts p,
        .businessHours p{
            font-size: 14px;
        }
        .copyright{
            font-size: 14px;
        }
        .opinionsSingle{
            max-width: 95%;
        }
    }
    
    @media screen and (max-width: 650px){
        .boxPromotion--phrase{
            font-size: 25px;
            left: 50px;
            top: 150px;
        }
        .boxPromotion img{
            top: 160px;
            left: 13%;
            width: 130px;
            height: 60px;
        }
        .empty{
            font-size: 16px;
        }
        .productSingle{
            width: 130px;
            margin: 20px;
        }
        .productSingle img{
            height: auto;
        }
        .productName,
        .sex,
        .productPrice{
            font-size: 13px;
        }
        .boxProducts{
            padding-top: 50px;
        }
        .userOpinions{
            margin-top: 0;
        }
    }
    
    @media screen and (max-width: 510px){


        .boxMainImage{
            margin-top: 150px;
            border: 1px solid rgb(194, 194, 194);
            height: 250px !important;
        }
        .mainPhrase{
            display: none;
        }

        .boxProducts{
            width: 100%;
        }
        .userOpinions--title,
        .boxProducts h1,
        .stayTurned h1{
            font-size: 18px;
        }
        .stayTurned p{
            width: 90%;
            font-size: 13px;
        }
        .stayTurned input{
            width: 90%;
            font-size: 14px;
        }
        .boxOpinions{
            height: 250px;
        }
        .opinionsSingle{
            height: 60%;
            justify-content: space-around;
        }
        .opinionsSingle img{
            width: 50px;
            height: 50px;
        }
        .opinionsSingle--message{
            font-size: 15px;
            margin-bottom: 0;
        }
        .opinionsSingle--author{
            font-size: 15px;
        }
        .boxInfo{
           flex-direction: column;
           align-items: center;
        }
        .businessHours{
            width: 50%;
            text-align: left;
        }
        .contacts{
            width: 50%;
            margin-right: 0;
            margin-bottom: 40px;
            margin-top: 30px;
            text-align: left;
        }
        .businessHours h2,
        .contacts h2{
            font-size: 16px;
        }
        .textDetail{
            width: 40px !important;
        }
    }

    @media screen and (max-width: 435px){
        .mainPhrase{
            width: 90% !important;
            top: 15%;
            left: 5%;
            font-size: 23px !important;
        }
        .businessHours{
            width: 80%;
        }
        .contacts{
            width: 80%;
        }
        .contacts p,
        .businessHours p{
            font-size: 12px;
        }
        .copyright{
            font-size: 11px;
        }
        footer h1{
            font-size: 20px;
            margin-bottom: 0;
            margin-top: 20px;
        }
        .empty{
            font-size: 14px;
        }
        .opinionsSingle--author{
            font-size: 13px;
        }
        .opinionsSingle--message{
            font-size: 11px;
        }
        .productSingle{
            width: calc(100% / 2 - 40px);
        }
        .showCase{
            margin-top: 30px;
        }
    }
</style>
