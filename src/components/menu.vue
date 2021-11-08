<template>
    <div class="boxMenu">
        <router-link class="logo" to="/login"></router-link>

        <div class="boxSearch">
           <input type="text" v-model="search" placeholder="Busque por algum produto" />
           <button><i class="fas fa-search"></i></button>
        </div>

        <div class="menut">
            <div class="menu">
                <ul v-show="!isLogged && !loadingHeader">
                    <li v-on:click="changeSelected('/')" class="btn" :class="(selected == '/') ? 'selected' : ''" to="/">Home</li>
                    <li v-on:click="changeSelected('/login')" class="btn" :class="(selected == '/login') ? 'selected' : ''" to="/login">Login</li>
                    <li v-on:click="changeSelected('/register')" class="btn" :class="(selected == '/register') ? 'selected' : ''" to="/register">Cadastrar</li>
                </ul>

                <ul v-show="isLogged && !loadingHeader">
                    <li v-on:click="changeSelected('/')" class="btn" :class="(selected == '/') ? 'selected' : ''" to="/"><i class="fas fa-home"></i></li>
                    <li v-on:click="changeSelected('/favorites')" class="btn" :class="(selected == '/favorites') ? 'selected' : ''" to="/"><i class="fas fa-heart"></i></li>
                    <li v-on:click="changeSelected('/kart')" class="btn" :class="(selected == '/kart') ? 'selected' : ''" to="/"><i class="fas fa-shopping-cart"></i></li>
                    <div class="profileIcon">
                        <img :src="isLogged.photo" />
                    </div>
                </ul>

                <p class="loading" v-show="loadingHeader">Carregando...</p>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    
    export default {
        name: 'loggedoutHeader',
        data(){
            return {
                search: '',
                selected: '/',
                isLogged: false,
                loadingHeader: true
            }
        },
        methods:{
            changeSelected: function(route){
                this.$router.push(route) 
                this.selected = route;
            }
        },
        beforeCreate(){
            axios
                .post('http://127.0.0.1:8000/api/userAuth',{
                    'currentToken': 'b4e5b9cd972ec187589039cc81fec82a'
                })
                .then((r)=>{
                    //Se o usuário estiver logado o sistema pega os dados da conta
                    this.logged = r.data.logged;
                    if(this.logged){
                        this.isLogged = r.data.loggedUser;
                    }

                })
                .finally(()=>{
                    this.loadingHeader = false;
                });
        }
    }
</script>

<style>
    .loading{
        color: white;
    }
    .boxMenu{
        position: fixed;
        width: 100vw;
        max-width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        background: rgb(18, 18, 20);
    }
    .logo{
        width: 80px;
        height: 80%;
        background-image: url('../assets/images/logo2.png');
        background-position: center;
        background-size: 100% 100%;
    }

    .boxSearch input{
        font-size: 16px;
        padding: 5px;
        padding-left: 10px;
        outline: 0;
        border: 0;
        border-radius: 5px;
        margin-right: 5px;
        color: rgb(105, 105, 105);
    }

    .boxSearch button{
        font-size: 18px;
        border: 0;
        padding: 2px 5px;
        border-radius: 5px;
        cursor: pointer;
        color: rgb(27, 27, 27);
    }

    .menu ul{
        display: flex;
        align-items: center;
    }

    .menu .btn{
        margin-right:  15px;
        list-style: none;
        font-size: 18px;
        cursor: pointer;
        border-bottom: 1px solid transparent;
        color: white;
        text-decoration: none;
    }

    .selected,
    .menu .btn:hover{
        border-bottom: 1px solid white !important;
    }
    .profileIcon{
        width: 40px;
        height: 40px;
        cursor: pointer;
        margin-left: 15px;
    }
    .profileIcon img{
        width: 100%;
        height: 100%;
        border-radius: 50px;
    }
</style>