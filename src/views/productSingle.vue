<template>
    <div>
        <section class="boxProdutSingle">
            <div class="showProdut">
                <div class="showProdutImages">
                    <div class="zoom">
                        <img class="mainImage" :src="currentImage" />
                    </div>
                    <div class="productGallery">
                        <div class="scrollGallery">
                            <img v-on:click="viewNewImage(index)" v-for="(info, index) in productImages" v-bind:key="info.id" class="miniImage" :src="info.url"/>
                        </div>
                    </div>
                </div>
                <div class="showProdutInfo">
                    <h1>{{product.name}}</h1>
                    
                    <div class="showProductDescription">
                        <b class="subTitleProduct">Descrição:</b>
                        <p>{{product.description}}</p>
                    </div>
                    
                    <div class="showProductPrice">
                        <b class="subTitleProduct">Preço:</b><span> R$ {{product.price}}</span>
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

                    <!--<div class="calcFrete">
                        <p>Calcular frete:</p>
                        <input type="number" placeholder="00000-000" />
                        <button onClick="alert('Este recurso foi desabilitado pelo proprietário')">ok</button>
                        <p class="link" onClick="alert('Este recurso foi desabilitado pelo proprietário')">Não sei o meu cep</p>
                    </div>-->

                    <div>
                        <button v-on:click="addToFavorite(product.id)" class="buttonModel1 btnOrange">Adicionar aos favoritos</button>
                        <button class="buttonModel1 btnBlue">Adicionar ao carrinho</button>
                    </div>
                    
                </div>
            </div>
            <div class="infoProduct">
                <h1 class="title">Informações do produto:</h1>
                <p>{{product.info}}</p>
            </div>

            <div class="productComments">
                <h1 class="title">Avaliações dos clientes:</h1>

                <div class="boxCommentsSingle">
                    
                    <div class="commentSingle" v-for="comment in comments" v-bind:key="comment.id">
                        <div class="infoComment">
                            <h1>{{comment.name}}</h1>
                            <p class="boxRate">
                                <i v-for="index in comment.rate" :key="index" class="fas fa-star star"></i>
                            </p>
                        </div>
                        <p class="userMessage">Eu comprei na segunda e chegou na sexta feita, gostei do antendimento, comprarei novamente sem duvidas.</p>
                    </div>

                    <p v-show="comments.length < 1" class="emptyComments">
                        Nenhum comentário ainda!
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
                        .post('http://127.0.0.1:8000/api/addFavorite',{
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
            }
        },
        beforeCreate () {
            window.scrollTo(0, 0)
            /*Get specific cloth*/
            axios
                .get('http://127.0.0.1:8000/api/cloth/'+this.$route.params.id)
                .then((r)=>{
                    this.product = r.data.product;
                    this.productImages = r.data.images;
                    this.comments = r.data.comments;

                    this.currentImage = this.product.cover;

                });

            /*Get all clothes*/
            axios
                .get('http://127.0.0.1:8000/api/clothes')
                .then((r)=>{
                    this.moreProducts = r.data.products;
                });

            /*GetUser*/
            axios
                .post('http://127.0.0.1:8000/api/userAuth',{
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
    .boxProdutSingle{
        width: 95%;
        margin: 0 auto;
        margin-top: 75px;
    }

    .showProdut{
        display: flex;
    }

    .showProdutImages{
        width: 460px;
        height: 500px;
        text-align: center;
        border: 1px solid rgb(179, 179, 179);
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
        border-top: 1px solid rgb(179, 179, 179);
        overflow-x: auto;
    }

    .scrollGallery{
        width: max-content;
        height: 100%;
        display: flex;
    }

    .miniImage{
        width: 110px;
        height: 100%;
        margin-right: 10px;
        border-right: 1px solid rgb(179, 179, 179);
        cursor: pointer;
    }

    .miniImage:last-child{
        border-right: 0;
    }

    .subTitleProduct{
        font-weight: lighter;
        color: #292929;
        font-size: 20px;
    }

    .showProdutInfo{
        width: calc(100% - 460px);
        padding-left: 20px;
        border: 1px solid rgb(179, 179, 179);
        border-left: 0;
    }

    .showProdutInfo h1{
        font-weight: lighter;
        font-family: Arial,tahoma,verdana;
        text-align: center;
        margin-top: 25px;
        color: #4e4e4e;
    }

    .showProductPrice,
    .showProductDescription{
        margin: 20px 0;
    }

    .showProductDescription p{
        width: 600px;
        color: #777777;
    }

    .showProdutInfo select{
        width: 200px;
        padding: 5px;
        outline: 0;
        font-size: 15px;
        color: rgb(58, 58, 58);
        margin-bottom: 20px;
    }

    .setAmount,
    .calcFrete{
        margin: 20px 0;
    }
    
    .free{
        color: rgb(15, 139, 15);
    }

    .setAmount input[type=number],
    .calcFrete input[type=number]{
        outline: 0;
        border: 1px solid rgb(168, 168, 168);
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 5px;
    }
    
    .calcFrete button{
        width: max-content;
        padding: 5px 8px;
        border: 0;
        border-radius: 5px;
        background: rgb(0, 162, 255);
        color: white;
        text-transform: uppercase;
        cursor: pointer;
        margin-left: 5px;
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
    }

    .buttonModel1:nth-child(1){
        margin-right: 15px;
    }

    .btnBlue{
        background: rgb(0, 162, 255);
        font-weight: bold;
    }

    .btnOrange{
        background: rgb(247, 143, 23);
        color: rgb(255, 255, 255);
        font-weight: bold;
    }

    /*Info product*/
    .infoProduct{
        margin: 0 auto;
        margin-top: 40px;
        margin-bottom: 30px;
    }

    .title{
        text-transform: capitalize;
        font-weight: lighter;
        font-size: 28px;
        color: #4e4e4e;
        margin-bottom: 20px;
        font-family: Arial,tahoma,verdana;
        border-bottom: 1px solid rgb(192, 192, 192);
    }

    .infoProduct p{
        width: 90%;
        color: #777777;
        font-size: 17px;
    }

    /*Product Comments*/
    .emptyComments{
        color: rgb(77, 77, 77);
        font-size: 18px;
    }
    .makeAComment{
        padding: 10px 10px;
        border: 1px solid rgb(182, 182, 182);
        cursor: pointer;
        background: rgb(0, 152, 240);
        color: white; 
        margin-bottom: 20px;
        border-radius: 10px;
    }
    .boxCommentsSingle{
        margin-bottom: 30px;
    }
    .commentSingle{
        border: 1px solid rgb(192, 192, 192);
        margin-bottom: 10px;
        padding: 10px;
    }
    .infoComment{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .infoComment h1{
        margin-right: 10px;
        font-family: Arial,tahoma,verdana;
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
        color: #777777;
        font-size: 17px;
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
</style>
