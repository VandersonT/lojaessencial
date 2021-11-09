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
                <div class="productSingle">
                    <img src="https://images.tcdn.com.br/img/img_prod/482949/blusa_feminina_minuty_country_bordada_275_2764_1_20210809100307.png" />
                    <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                    <p class="productPrice">R$ 999,00</p>
                </div>
                <div class="productSingle">
                    <img src="https://images.tcdn.com.br/img/img_prod/482949/blusa_feminina_minuty_country_suede_291_2778_1_20210809101902.png" />
                    <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                    <p class="productPrice">R$ 999,00</p>
                </div>
                <div class="productSingle">
                    <img src="http://2.bp.blogspot.com/-ikgwp4F21S4/Ue8bTIXrw-I/AAAAAAAAAt0/Bsu-z3sDLvE/s1600/Blusa_de_Manga_L_4f146ae67a4b9.png" />
                    <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                    <p class="productPrice">R$ 999,00</p>
                </div>
                <div class="productSingle">
                    <img src="https://institucional.lojasleader.com.br/wp-content/uploads/2019/11/BLUSA-CROPPED-ESTAMPA-JOIAS-5999.png" />
                    <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                    <p class="productPrice">R$ 999,00</p>
                </div>
                <div class="productSingle">
                    <img src="https://www.gsuplementos.com.br/upload/produto/imagem/b_cal-a-jogger-growth-manuscrito.png" />
                    <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                    <p class="productPrice">R$ 999,00</p>
                </div>
                <div class="productSingle">
                    <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Imagem-de-Sapato-em-PNG-1280x720.png" />
                    <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                    <p class="productPrice">R$ 999,00</p>
                </div>
                <div class="productSingle">
                    <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Rel%C3%B3gio-Sony-PNG.png" />
                    <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                    <p class="productPrice">R$ 999,00</p>
                </div>
            </div>

        </section>

        <section class="boxPromotion">
            <div class="boxPromotion--phrase">
                <p>Até 30% de desconto</p>
                <p>aproveite essa oferta oferta.<i class="fab fa-google-wallet"></i></p>
            </div>
            <img src="../assets/images/promotionIcon.png" />
        </section>

        <section class="userOpinions">
            <h1 class="userOpinions--title"><i class="fas fa-user-friends"></i> Depoimentos</h1>
            <div class="boxOpinions">
                <div class="opinionsSingle animate__animated animate__fadeIn">
                    <img src="https://st2.depositphotos.com/6903990/10827/i/600/depositphotos_108277030-stock-photo-female-model-with-fashion-make.jpg" />
                    <p class="opinionsSingle--message">
                        Meu depoimento é o primeiro ihulll first
                    </p>
                    <p class="opinionsSingle--author">Joana Silva</p>
                </div>
                <div class="opinionsSingle animate__animated animate__fadeIn">
                    <img src="https://st2.depositphotos.com/6903990/10827/i/600/depositphotos_108277030-stock-photo-female-model-with-fashion-make.jpg" />
                    <p class="opinionsSingle--message">
                        eu comento por que comento mesmo pqoeur comento uyai
                    </p>
                    <p class="opinionsSingle--author">Ana Silva</p>
                </div>
                <div class="opinionsSingle animate__animated animate__fadeIn">
                    <img src="https://st2.depositphotos.com/6903990/10827/i/600/depositphotos_108277030-stock-photo-female-model-with-fashion-make.jpg" />
                    <p class="opinionsSingle--message">
                       teste
                    </p>
                    <p class="opinionsSingle--author">Pedro Silva</p>
                </div>
                <div class="controlsOpinions"></div>
            </div>
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
                loggedUser: [],
                thereIsOpinions: true
            }
        },
        beforeCreate(){
            axios
                .post('https://jsonplaceholder.typicode.com/posts',{
                    'currentToken': ''
                })
                .then((r)=>{
                    //Se o usuário estiver logado o sistema pega os dados da conta
                    this.logged = r.data.logged;
                    if(this.logged){
                        this.loggedUser = r.data.loggedUser;
                    }

                })
                .catch(() => {
                    /*
                        Se deu falha aqui, então não é possivel o usuario logar na conta dele, pois a api
                        esta com problemas e ela é quem irá autenticar ele, mas deixe um aviso falando que
                        não é possivel no momento logar na conta e permita que ele navegue sem conta msm.
                    */
                });
        },
        mounted(){
            var height = window.innerHeight - 69;
            document.querySelector('.boxMainImage').style.height = height+'px';

            /*userOpnions*/
            let startIn = 1;
            let amount = document.querySelectorAll('.opinionsSingle').length;


            if(amount > 1){
                controlsGeneration(amount);
                slideStart(startIn);
            }else{
                let box = document.querySelector('.boxOpinions');
                box.innerHTML = "<h1 class='empty'>NÃ£o temos nenhum depoimento disponivel no momento!</h1>";
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
                }, 3000);

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
    }
    .boxProducts h1{
        text-transform: capitalize;
        font-weight: lighter;
        font-size: 28px;
        color: #00ADEF;
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
        cursor: pointer;
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
        color: #383838;
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
