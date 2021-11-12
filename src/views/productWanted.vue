<template>
    <div>
        <section class="boxProductsWanted">
            <div class="boxFilter">
                <h1>Filtro</h1>
                
                <div class="priceFilter">
                    <h3>Preço:</h3>
                    <select v-model="priceOrder">
                        <option>Todos</option>
                        <option>Menor preço</option>
                        <option>Maior preço</option>
                    </select>

                    <h3>Produto:</h3>
                    <div class="filterSingle">
                        <div>
                            <input v-model="productToSearch" type="checkbox" checked value="calças"/>
                            Calças
                        </div>
                        <div>
                            <input v-model="productToSearch" type="checkbox" checked value="sapatos"/>
                            Sapatos
                        </div>
                        <div>
                            <input v-model="productToSearch" type="checkbox" checked value="blusas"/>
                            Blusas
                        </div>
                        <div>
                            <input v-model="productToSearch" type="checkbox" checked value="camisas"/>
                            Camisas
                        </div>
                        <div>
                            <input v-model="productToSearch" type="checkbox" checked value="jaquetas"/>
                            Jaquetas
                        </div>
                    </div>

                    <h3>Genero:</h3>
                    <div class="filterSingle">
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

                    <h3>Para:</h3>
                    <div class="filterSingle">
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

                <button v-on:click="filter()">Filtrar</button>

            </div>
            <div class="boxResults">
                <h1>Resultado para {{search}}:</h1>
                <div class="showCase">
                    <div v-show="products.length > 0 && !loading" v-for="product in products" v-bind:key="product.id" class="productSingle">
                        <img :src="product.cover" />
                        <p class="productDescription">{{product.name}}</p>
                        <p class="productPrice">R$ {{product.price}}</p>
                        <button class="icon save"><i class="fas fa-heart"></i></button>
                        <button class="icon"><i class="fas fa-shopping-cart"></i></button>
                    </div>

                    <p v-show="products.length < 1 && !loading" class="empty">
                        Não temos nenhum produto com esse filtro <i class="far fa-frown"></i>
                    </p>

                    <p v-show="loading" class="loadingProducts">Carregando produtos...</p>
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
            return{
                products: [],
                loading: true,
                //datas to filter
                search: '',
                priceOrder: 'Todos',
                productToSearch: ['calças', 'sapatos', 'blusas', 'camisas', 'jaquetas'],
                gender: 'todos',
                ageToSearch: ['bebês', 'crianças', 'adolecentes', 'adultos']
            }
        },
        methods:{
            filter: function(){
                var url = window.location.href;
                url = url.split('?search=');
                this.search = url[1];

                axios
                    .get('http://127.0.0.1:8000/api/filteredClothes?search='+this.search)
                    .then((r)=>{
                        this.products = r.data.products;
                    })
                    .finally(()=>{
                        this.loading = false;
                    });
            }
        },
        beforeMount(){
            this.filter();
        }
    }
</script>

<style>
    .loadingProducts{
        margin-top: 65px;
        color: #777777;
    }
    .boxProductsWanted{
        margin-top: 70px;
        display: flex;
    }
    .boxFilter{
        width: 350px;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 20px;
        border-right: 1px solid rgb(189, 189, 189);
        border-bottom: 1px solid rgb(189, 189, 189);
    }
    .boxFilter h1{
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        color: rgb(92, 92, 92);
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 30px;
    }
    .boxFilter h3{
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        color: rgb(92, 92, 92);
        margin: 20px 10px 10px 20px;
    }
    .boxFilter h3:nth-last-of-type(3){
         margin-top: 10px;
    }
    .boxFilter select{
        margin-left: 20px;
        width: 200px;
        padding: 5px;
        outline: 0;
        font-size: 15px;
        color: rgb(58, 58, 58);
    }
    .filterSingle{
        margin-left: 20px;
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
        width: calc(100vw - 350px);
        padding: 20px;
    }
    .boxResults h1{
        color: #858585;
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    /*A página que exibe os produtos que foram encontrados usa a mesma estrutura html/css que a página home: .
    Então, para não repetir css o css dele é compartilhado e se encontra em style da página home*/
</style>
