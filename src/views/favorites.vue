<template>
    <div>
        <section class="boxFavorites">
            <h1><i class="far fa-heart"></i> Favoritos</h1>
            <div class="showCase">
                <div v-show="product.length > 0 && !loading" v-for="(info, index) in product" v-bind:key="info.id" class="productSingle">
                    <img v-on:click="openProdcut(info.productId)" :src="info.cover" />
                    <p class="productDescription">{{info.description}}</p>
                    <p class="productPrice">R$ {{info.price}}</p>
                    <button v-on:click="deleteFavorite(info.id, index)" class="icon delete"><i class="fas fa-trash"></i></button>
                    <button class="icon"><i class="fas fa-shopping-cart"></i></button>
                </div>

                <p v-show="product.length < 1 && !loading" class="empty">
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
                product: [],
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
                    .delete('http://127.0.0.1:8000/api/favorite/'+id)
            }
        },
        beforeCreate(){
            /*Get user*/
            axios
                .post('http://127.0.0.1:8000/api/userAuth',{
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
                        .get('http://127.0.0.1:8000/api/favorites/'+this.loggedUser.id)
                        .then((r)=>{
                            this.product = r.data.favorites;
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
    
</style>
