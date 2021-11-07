<template>
    <div class="boxMenu">
        <router-link class="logo" to="/login"></router-link>

        <div class="boxSearch">
           <input type="text" v-model="search" placeholder="Busque por algum produto" />
           <button><i class="fas fa-search"></i></button>
        </div>
        <div class="menu">
            <ul>
                <li v-on:click="changeSelected('/')" class="btn" :class="(selected == '/') ? 'selected' : ''" to="/">Home</li>
                <li v-on:click="changeSelected('/login')" class="btn" :class="(selected == '/login') ? 'selected' : ''" to="/login">Login</li>
                <li v-on:click="changeSelected('/register')" class="btn" :class="(selected == '/register') ? 'selected' : ''" to="/register">Cadastrar</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'loggedoutHeader',
        data(){
            return {
                search: '',
                selected: '/'
            }
        },
        methods:{
            changeSelected: function(route){
                this.$router.push(route) 
                this.selected = route;
            }
        }
    }
</script>

<style>
    .teste{
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
</style>