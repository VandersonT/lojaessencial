<template>
    <div>
        <section class="boxFavorites">
            <h1><i class="far fa-heart"></i> Favoritos</h1>
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
                    Você não tem nada nos favoritos.
                </p>

                <p v-show="loading" class="loadingProducts">
                    Carregando...
                </p>

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
                products: [],
                loading: true
            }
        },
        methods:{
            openProdcut: function(productId){
                this.$router.push('/produto/'+productId);
            },
            deleteFavorite: function(id, index){

                if(!confirm('Você quer realmente remover este item dos favoritos?')){
                    return false;
                }

                this.product.splice(index, 1)
                axios
                    .delete('https://api.lojaessencial.ga/api/favorite/'+id)
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
            /*Get user*/
            axios
                .post('https://api.lojaessencial.ga/api/userAuth',{
                    'currentToken': localStorage.getItem('token')
                })
                .then((r)=>{
                    //Se o usuário estiver logado o sistema pega os dados da conta
                    this.logged = r.data.logged;
                    if(this.logged){
                        this.loggedUser = r.data.loggedUser;
                    }else{
                        this.$router.push('/login')
                    }

                })
                .finally(()=>{
                    axios
                        .get('https://api.lojaessencial.ga/api/favorites/'+this.loggedUser.id)
                        .then((r)=>{
                            this.products = r.data.favorites;
                        })
                        .finally(()=>{
                            this.loading = false;
                        });
                });
        }
    }
</script>

<style>
    .boxFavorites{
        width: 90%;
        margin: 0 auto;
        margin-top: 70px;
        padding-top: 40px;
        padding-bottom: 100px;
    }
    .boxFavorites h1{
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        color: #4e4e4e;
        border-bottom: 1px solid gray;
    }
    /*A página que exibe os produtos que foram encontrados usa a mesma estrutura html/css que a página home: .
    Então, para não repetir css o css dele é compartilhado e se encontra em style da página home*/
    @media screen and (max-width: 500px) {
        .boxFavorites h1{
            font-size: 20px;
            margin-top: 20px;
        }
    }
</style>
