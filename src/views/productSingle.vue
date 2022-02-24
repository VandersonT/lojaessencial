<template>
    <div>
        <section class="boxProdutSingle">
            <div class="showProdut">
                <div class="showProdutImages">
                    <div class="zoom">
                        <img class="mainImage" :src="currentImage" />
                    </div>
                    <div class="productGallery">
                        <p v-if="productImages < 1" class="emptyImages" >Carregando...</p>
                        <div v-else class="scrollGallery">
                            <img v-on:click="viewNewImage(index)" v-for="(info, index) in productImages" v-bind:key="info.id" class="miniImage" :src="info.url"/>
                        </div>
                    </div>
                </div>
                <div class="showProdutInfo">
                    <h1>{{product.name}}</h1>
                    
                    <div class="showProductPrice">
                        <span><span class="oldPrice">R$ {{(parseInt(product.price) + 79).toFixed(2).replace('.', ',')}}</span> R$ {{parseInt(product.price).toFixed(2).replace('.', ',')}}</span>
                    </div>

                    <div class="showProductDescription">
                        <p>{{product.description}}</p>
                    </div>
                    
                    <select>
                        <option disabled selected>Tamanho</option>
                        <option>P</option>
                        <option>M</option>
                        <option>G</option>
                        <option>GG</option>
                    </select>

                    <div class="setAmount">
                        <p>Quantidade: ({{product.amount}} disponiveis)</p>
                        <input @keyup="verifyNumber()" v-model="amount" type="number" placeholder="Digite a quantidade" />
                    </div>

                    <div class="calcFrete free">
                        <p><i class="fas fa-truck"></i> Frete gratis</p>
                    </div>

                    <div class="boxBtn2">
                        <button v-on:click="addToFavorite(product.id)" class="buttonModel1 btnOrange">Salvar nos favoritos</button>
                        <button v-on:click="addToKart(product.id)" class="buttonModel1 btnBlue">Adicionar ao carrinho</button>
                    </div>
                    
                </div>
            </div>
            <div class="infoProduct">
                <h1 class="title">Informações do Produto:</h1>
                <p>{{product.info}}</p>
            </div>

            <div class="productComments">
                <h1 class="title">Avaliações dos Clientes:</h1>

                <div class="boxCommentsSingle">
                    
                    <div class="commentSingle" v-for="comment in comments" v-bind:key="comment.id">
                        <div class="infoComment">
                            <h1>{{comment.name}}</h1>
                            <p class="boxRate">
                                <i v-for="index in comment.rate" :key="index" class="fas fa-star star"></i>
                            </p>
                        </div>
                        <p class="userMessage">{{comment.comment}}</p>
                    </div>

                    <p v-show="comments.length < 1" class="emptyComments">
                        Nenhuma avaliação ainda!
                    </p>

                </div>

                <button v-on:click="makeAComment()" class="makeAComment">Faça um comentário</button>

            </div>

            <div class="similarProduct">
                 <h1 class="title">Mais Produtos:</h1>
                 <div class="boxSimilarProduct">
                    <div class="scrollGallery">
                        <img v-on:click="openProdcut(product.id)" v-for="product in moreProducts" v-bind:key="product.id" :src="product.cover" class="similarProductImage" />
                    </div>
                 </div>
            </div>
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
            return{
                logged: false,
                loggedUser: [],
                product: [],
                productImages: [],
                currentImage: '',
                amount: 1,
                amountBackup: 1,
                moreProducts: [],
                comments: [],
                commentRate: []
            }
        },
        methods:{
            viewNewImage: function(idImage){
                this.currentImage = this.productImages[idImage].url;
            },
            verifyNumber: function(){
                if(this.amount > this.product.amount){
                    this.amount = this.amountBackup;
                    return false;
                }
                this.amountBackup = this.amount;
            },
            openProdcut: function(productId){
                var url = window.location.href;
                url = url.split('/');
                var currentId = url[5];

                if(currentId == productId){
                    return false;
                }

                this.$router.push('/produto/'+productId);
            },
            makeAComment: function(){
                alert("Você só poderá avaliar após adquirir o produto.")
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
        beforeCreate () {
            window.scrollTo(0, 0)
            /*Get specific cloth*/
            axios
                .get('https://api.lojaessencial.ga/api/cloth/'+this.$route.params.id)
                .then((r)=>{

                    if(r.data.error){
                        this.$router.push('/')
                        return false;
                    }

                    this.product = r.data.product;
                    this.productImages = r.data.images;
                    this.comments = r.data.comments;
                    this.currentImage = this.product.cover;

                });

            /*Get all clothes*/
            axios
                .get('https://api.lojaessencial.ga/api/clothes')
                .then((r)=>{
                    this.moreProducts = r.data.products;
                });

            /*GetUser*/
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
        }
    }
</script>

<style>
    body{
        background: #eaeef1;
    }
    .boxProdutSingle{
        width: 95%;
        margin: 0 auto;
        /*margin-top: 75px;*/
        margin-top: 160px;
    }

    .showProdut{
        display: flex;
    }

    .showProdutImages{
        width: 460px;
        height: 500px;
        text-align: center;
        border: 1px solid rgb(192, 192, 192);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .showProdutImages .zoom{
        width: 100%;
        height: calc(100% - 100px);
    }

    .mainImage{
        width: 100%;
        height: 100%;
        background: rgb(243, 243, 243);
    }

    .zoom{
        max-width: 100%;
        overflow: hidden;
        cursor: zoom-in;
    }

    .zoom .mainImage{
        transition: all 0.3s;
        -moz-transition: all 0.3s;
        -webkit-transition: all 0.3s;
    }

    .zoom .mainImage:hover{
        transform: scale(1,4);
        -moz-transform: scale(1.4);
        -webkit-transform: scale(1.4);
    }

    .productGallery{
        width: 100%;
        height: 100px;
        border-top: 1px solid rgb(192, 192, 192);
        overflow-x: auto;
        background: rgb(243, 243, 243);
    }

    .scrollGallery{
        width: max-content;
        height: 100%;
        display: flex;
    }

    .emptyImages{
        color: gray;
        width: 100%;
        line-height: 90px;
        font-size: 16px;
        text-align: center;
    }

    .miniImage{
        width: 110px;
        height: 100%;
        border-right: 1px solid rgb(192, 192, 192);
        cursor: pointer;
    }
    .miniImage:hover{
        border: 1px solid rgb(167, 167, 167) !important;
    }

    .miniImage:last-child{
        border-right: 0;
    }

    .showProdutInfo{
        width: calc(100% - 460px);
        padding-left: 20px;
        background: rgb(243, 243, 243);
        border: 1px solid rgb(192, 192, 192);
        border-left: 0;
    }

    .showProdutInfo h1{
        font-weight: lighter;
        font-family: 'Lato', sans-serif;
        margin-top: 25px;
        color: #000000;
        font-size: 30px;
    }

    .showProductPrice,
    .showProductDescription{
        margin: 20px 0;
        font-family: 'Lato', sans-serif;
        font-size: 24px;
        color: #333333;
    }

    .showProductDescription p{
        width: 100%;
        color: #313131;
        font-size: 16px;
        font-family: 'Lato', sans-serif;
    }

    .showProdutInfo select{
        width: 200px;
        padding: 5px;
        outline: 0;
        font-size: 15px;
        color: rgb(58, 58, 58);
        margin-bottom: 20px;
    }

    .oldPrice{
        text-decoration: line-through;
        color: rgb(165, 165, 165);
    }

    .setAmount,
    .calcFrete{
        margin: 20px 0;
        font-family: 'Lato', sans-serif;
        color: rgb(58, 58, 58);
    }
    
    .free{
        color: rgb(15, 139, 15);
    }

    .setAmount input,
    .calcFrete input[type=number]{
        outline: 0;
        border: 1px solid rgb(165, 165, 165);
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 5px;
    }

    .buttonModel1{
        width: max-content;
        padding: 10px 8px;
        border: 0;
        border-radius: 5px;
        color: white;
        text-transform: uppercase;
        cursor: pointer;
        background: rgb(36, 36, 36);
        margin-top: 20px;
    }

    .buttonModel1:nth-child(1){
        margin-right: 15px;
    }

    .btnBlue{
        background: rgb(0, 162, 255);
        color: rgb(255, 255, 255);
    }

    .btnOrange{
        background: #FF4500;
    }

    /*Info product*/
    .infoProduct{
        margin: 0 auto;
        margin-top: 40px;
        margin-bottom: 30px;
    }

    .title{
        font-weight: lighter;
        font-size: 24px;
        color: #141414;
        margin-top: 20px;
        margin-bottom: 20px;
        font-family: 'Lato', sans-serif;
        border-top: 1px solid rgb(192, 192, 192);
        padding-top: 40px;
    }

    .infoProduct p{
        width: 90%;
        color: #303030;
        font-size: 16px;
        font-family: 'Lato', sans-serif;
    }

    /*Product Comments*/
    .emptyComments{
        color: rgb(46, 46, 46);
        font-size: 16px;
        font-family: 'Lato', sans-serif;
    }
    .makeAComment{
        padding: 10px 10px;
        border: 0;
        cursor: pointer;
        background: rgb(0, 152, 240);
        color: white; 
        margin-bottom: 20px;
        border-radius: 5px;
    }
    .boxCommentsSingle{
        margin-bottom: 30px;
    }
    .commentSingle{
        border: 1px solid rgb(209, 209, 209);
        margin-bottom: 10px;
        padding: 10px;
        font-family: 'Lato', sans-serif;
    }
    .infoComment{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 15px;
    }

    .infoComment h1{
        margin-right: 10px;
        font-family: 'Lato', sans-serif;
        font-weight: lighter;
        font-size: 18px;
        color: #0084ff;
    }

    .infoComment i{
       color: rgb(44, 44, 44);
    }

    .star{
        color: rgb(218, 181, 16) !important;
    }

    .userMessage{
        width: 800px;
        margin-bottom: 10px;
        color: #2b2b2b;
        font-size: 16px;
    }

    /*Similar Product*/
    .boxSimilarProduct{
        width: 100%;
        border: 1px solid rgb(192, 192, 192);
        margin-bottom: 50px;
        overflow-x: auto;
    }
    .similarProductImage{
        width: 200px;
        height: 180px;
        background: rgb(71, 71, 71);
        border-right: 1px solid rgb(143, 143, 143);
        cursor: pointer;
    }
    .similarProductImage:hover{
        border: 1px solid rgb(167, 167, 167);
    }

    @media screen and (max-width: 1130px){
        .showProdutInfo h1{
            font-size: 16px;
            text-align: left;
            color: black;
        }
        .showProductDescription p{
            font-size: 14px;
        }
        .setAmount input,
        .calcFrete input[type=number]{
            font-size: 13px;
        }
        .buttonModel1{
            font-size: 9px;
        }
        .calcFrete{
            font-size: 14px;
        }
    }
    @media screen and (max-width: 850px){
        .showProdut{
            flex-direction: column;
        }
        .showProdutImages{
            width: 100%;
        }
        .mainImage{
            width: 70%;
            height: 100%;
            border: 1px solid gray;
        }
        .showProdutInfo{
            width: 100%;
            margin-top: 0;
            padding: 20px;
            padding-top: 0;
            text-align: center;
            border-left: 1px solid rgb(165, 165, 165);
        }
        .showProdutInfo h1{
            text-align: center;
        }
        .userMessage{
            width: 100%;
            font-size: 14px;
        }
        .infoComment h1{
            font-size: 15px;
        }
        .boxRate i{
            font-size: 12px;
        }
    }

    @media screen and (max-width: 530px){
        .mainImage{
            width: 100%;
            border: 0;
        }
        .similarProductImage{
            width: 120px;
            height: 120px;
        }
        .showProdutImages{
            height: 450px;
        }
    }

    @media screen and (max-width: 400px){
        .title{
            font-size: 17px;
        }
        .emptyComments{
            font-size: 13px;
        }
        .makeAComment{
            padding: 8px 6px;
            font-size: 11px;
            border-radius: 5px;
        }
        .showProdutImages{
            height: 380px;
        }
        .infoProduct p{
            font-size: 13px;
        }
    }
    @media screen and (max-width: 350px){
        .buttonModel1{
            width: 200px;
            margin-bottom: 10px;
        }
        .buttonModel1:nth-child(1){
            margin-right: 0;
        }
    }
</style>
