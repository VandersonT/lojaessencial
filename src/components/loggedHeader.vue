<template>
    <div class="boxMenu">
        <div class="logo"></div>

        <div class="boxSearch">
           <input type="text" v-model="search" placeholder="Busque por algum produto" />
           <button><i class="fas fa-search"></i></button>
        </div>
        <div class="menu">
            <ul>
                <li class="heart" @click="openFavorite"><i class="fas fa-heart"></i></li>
                <li class="kart" @click="openKart"><i class="fas fa-shopping-cart"></i></li>
                <li class="profile" @click="openProfile"><i class="fas fa-user-circle"></i></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loggedHeader',
    data(){
        return {
            search: ''
        }
    },
    methods:{
        openKart: function(){
            alert("Favoritos ainda em manutenção");
        },
        openFavorite: function(){
            alert("Favoritos ainda em manutenção");
        },
        openProfile: function(){
            alert("Perfil ainda em manutenção");
        }
    }
}
</script>

<style>
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
        color: white;
        align-items: center;
    }

    .menu li{
        margin-right:  15px;
        list-style: none;
        font-size: 18px;
        cursor: pointer;
        border-bottom: 1px solid transparent;
        font-size: 20px;
    }
    .heart{
        color: rgb(201, 75, 75);
    }
    .kart{
        color: rgb(185, 185, 185);
    }
    .profile i{
        font-size: 32px;
        color: rgb(185, 185, 185);
    }
</style>