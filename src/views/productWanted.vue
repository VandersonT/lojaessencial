<template>
    <div>
        <section class="boxProductsWanted">

            <button @click="toggleFilter" class="toggleFilter">
                {{showFilter ? 'Remover Filtro' : 'Mostrar Filtro'}}
            </button>

            <div v-if="showFilter" class="boxFilter">
                <h1>Filtro</h1>
                
                <div class="priceFilter">
                    <div class="filterOrder">
                        <h3>Preço:</h3>
                        <select v-model="priceOrder">
                            <option>Normal</option>
                            <option>Menor Preço</option>
                            <option>Maior Preço</option>
                        </select>
                    </div>
                    
                    <div class="filterSingle">
                        <h3>Produto:</h3>
                        <div>
                            <input v-model="productToSearch" type="checkbox" checked value="calça"/>
                            Calças
                        </div>
                        <div>
                            <input v-model="productToSearch" type="checkbox" checked value="sapato"/>
                            Sapatos
                        </div>
                        <div>
                            <input v-model="productToSearch" type="checkbox" checked value="blusa"/>
                            Blusas
                        </div>
                        <div>
                            <input v-model="productToSearch" type="checkbox" checked value="camisa"/>
                            Camisas
                        </div>
                        <div>
                            <input v-model="productToSearch" type="checkbox" checked value="jaqueta"/>
                            Jaquetas
                        </div>
                    </div>

                    
                    <div class="filterSingle">
                        <h3>Genero:</h3>
                        <div>
                            <input type="radio" v-model="gender" value="todos" name="genderFilter" checked />
                            Todos
                        </div>
                        <div>
                            <input type="radio" v-model="gender" value="unissex" name="genderFilter" />
                            Unissex
                        </div>
                        <div>
                            <input type="radio" v-model="gender" value="masculino" name="genderFilter" />
                            Masculino
                        </div>
                        <div>
                            <input type="radio" v-model="gender" value="feminino" name="genderFilter" />
                            Feminino
                        </div>
                    </div>
                    
                    <div class="filterSingle">
                        <h3>Para:</h3>
                        <div>
                            <input v-model="ageToSearch" value="bebês" type="checkbox" checked />
                            Bebês
                        </div>
                        <div>
                            <input v-model="ageToSearch" value="crianças" type="checkbox" checked />
                            Crianças
                        </div>
                        <div>
                            <input v-model="ageToSearch" value="adolecentes" type="checkbox" checked />
                            Adolecente
                        </div>
                        <div>
                            <input v-model="ageToSearch" value="adultos" type="checkbox" checked />
                            Adultos
                        </div>
                    </div>

                </div>

                <button v-on:click="filterProduct()">Filtrar</button>

            </div>
            <div class="boxResults">
                <h1>Resultados para {{search}}:</h1>
                <div class="showCaseFavorites">
                    
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
                        Nenhum produto encontrado com esse filtro <i class="far fa-frown"></i>
                    </p>
                    
                    <p v-show="loading" class="loadingProducts">Carregando produtos...</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {

        data(){
            return{
                logged: false,
                loggedUser: [],
                products: [],
                loading: true,
                search: '',
                priceOrder: 'Normal',
                productToSearch: ['calça', 'sapato', 'blusa', 'camisa', 'jaqueta'],
                gender: 'todos',
                ageToSearch: ['bebês', 'crianças', 'adolecentes', 'adultos'],
                showFilter: false
            }
        },
        methods:{
            toggleFilter: function(){
                this.showFilter = !this.showFilter
            },
            getProductSearched: function(){

                var url = window.location.href;
                url = url.split('?search=');
                this.search = url[1];
                
                if(this.search != undefined){
                    this.search = this.search.replace("%20", " ");
                }

                axios
                    .get('https://api.lojaessencial.ga/api/filteredClothes?search='+this.search+'&order='+this.priceOrder+'&p1='+this.productToSearch[0]+'&p2='+this.productToSearch[1]+'&p3='+this.productToSearch[2]+'&p4='+this.productToSearch[3]+'&p5='+this.productToSearch[4]+'&gender='+this.gender+'&age1='+this.ageToSearch[0]+'&age2='+this.ageToSearch[1]+'&age3='+this.ageToSearch[2]+'&age4='+this.ageToSearch[3])
                    .then((r)=>{
                        this.products = r.data.products;
                    })
                    .finally(()=>{
                        this.loading = false;
                    });
            },
            filterProduct: function(){
                axios
                    .get('https://api.lojaessencial.ga/api/filteredClothes?search='+this.search+'&order='+this.priceOrder+'&p1='+this.productToSearch[0]+'&p2='+this.productToSearch[1]+'&p3='+this.productToSearch[2]+'&p4='+this.productToSearch[3]+'&p5='+this.productToSearch[4]+'&gender='+this.gender+'&age1='+this.ageToSearch[0]+'&age2='+this.ageToSearch[1]+'&age3='+this.ageToSearch[2]+'&age4='+this.ageToSearch[3])
                    .then((r)=>{
                        this.products = r.data.products;
                    })
                    .finally(()=>{
                        this.loading = false;
                    });
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
        beforeMount(){
            this.getProductSearched();
        },
        beforeCreate(){
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
    }
</script>

<style>
    .loadingProducts{
        margin-top: 65px;
        color: #777777;
    }
    .boxProductsWanted{
        margin-top: 80px;
        display: flex;
        flex-direction: column;
    }
    .filterOrder h3{
        text-align: center;
        padding-left: 0;
        padding-right: 35px;
    }

    .toggleFilter{
        font-family: 'Lato', sans-serif;
        background: rgb(26, 26, 26);
        border: 0;
        width: max-content;
        margin: 0 auto;
        margin-top: 40px;
        padding: 5px 10px;
        border-radius: 3px;
        color: white;
        cursor: pointer;
    }

    .boxFilter{
        width: 100vw;
        max-width: 100%;
        height: auto;
        min-height: auto;        
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-bottom: 20px;
        border-right: 1px solid #8a8a8a;
        border-bottom: 1px solid #8a8a8a;
    }
    .boxFilter h1{
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        color: rgb(92, 92, 92);
        text-align: center;
        margin-top: 50px;
        margin-bottom: 0;
        font-size: 25px;
    }
    .boxFilter h3{
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        color: rgb(92, 92, 92);
        margin: 35px 10px 10px 20px;
        font-size: 17px;
    }
    .boxFilter h3:nth-child(1){
         margin-top: 20px;
    }
    .boxFilter select{
        margin-left: 20px;
        width: 200px;
        padding: 5px;
        outline: 0;
        font-size: 15px;
        color: rgb(58, 58, 58);
        height: 35px;
        display: flex;
        flex-direction: column;
    }
    .filterSingle{
        margin-left: 50px;
    }

    .boxFilter button{
        margin-top: 30px;
        width: 120px;
        padding: 8px;
        border: 0;
        border-radius: 5px;
        background: rgb(0, 162, 255);
        color: white;
        text-transform: uppercase;
        cursor: pointer;
    }

    .boxResults{
        padding: 20px;
        width: 100%;
        margin-bottom: 50px;
    }
    .boxResults h1{
        color: #1d1d1d;
        font-family: 'Lato', sans-serif;
        font-weight: lighter;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .priceFilter{
        display: flex;
        flex-direction: row;
    }
    /*A página que exibe os produtos que foram encontrados usa a mesma estrutura html/css que a página home: .
    Então, para não repetir css o css dele é compartilhado e se encontra em style da página home*/

    .showCaseFavorites{
        width: 100vw;
        max-width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap:wrap;
    }

    @media screen and (max-width: 700px){
        .priceFilter{
            flex-direction: column;
        }
        .boxResults h1{
            font-size: 20px;
        }
    }

    @media screen and (max-width: 700px){
        .loadingProducts{
            font-size: 12px;
        }
    }

</style>
