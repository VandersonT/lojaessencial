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
        color: #202020;
        font-weight: lighter;
        font-size: 36px;
        font-family: 'Kaushan Script', cursive;
        text-transform:capitalize;
        transform: rotate(-5deg);
        text-align: center;
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
        font-family: 'Kaushan Script', cursive;
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
