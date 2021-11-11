<template>
<div>
    <div class="boxMenu">
        <div v-on:click="changeSelected('/')" class="logo" to="/"></div>

        <div class="boxSearch">
           <input type="text" v-model="search" placeholder="Procura algo especifico?" />
           <router-link :to="(search) ? '/produtos/'+search : ''" class="boxSearch--button"><i class="fas fa-search"></i></router-link>
        </div>

        <div class="menut">
            <div class="menu">
                <ul v-show="!isLogged && !loadingHeader">
                    <li v-on:click="changeSelected('/login')" class="btn" :class="(selected == '/login') ? 'selected' : ''" to="/login">Entrar</li>
                    <li v-on:click="changeSelected('/cadastro')" class="btn" :class="(selected == '/cadastro') ? 'selected' : ''" to="/register">Cadastre-se</li>
                </ul>

                <ul v-show="isLogged && !loadingHeader">
                    <li v-on:click="changeSelected('/')" class="btn" :class="(selected == '/') ? 'selected' : ''" to="/"><i class="fas fa-home"></i></li>
                    <li v-on:click="changeSelected('/favoritos')" class="btn" :class="(selected == '/favoritos') ? 'selected' : ''" to="/"><i class="fas fa-heart heart"></i></li>
                    <li v-on:click="changeSelected('/carrinho')" class="btn" :class="(selected == '/carrinho') ? 'selected' : ''" to="/"><i class="fas fa-shopping-cart kart"></i></li>
                    <div class="profileIcon" v-on:click="openMenuSlide()">
                        <img :src="isLogged.photo" />
                    </div>
                    <div class="menuSlide">
                        <router-link to="/perfil" class="btnMenuSlide">Seu perfil</router-link>
                        <router-link to="/configuração" class="btnMenuSlide">Configuração</router-link>
                        <p v-on:click="logout()" class="btnMenuSlide">Sair</p>
                    </div>
                </ul>
                <p class="loading" v-show="loadingHeader">Carregando...</p>

            </div>
        </div>

    </div>
    <div class="searchMobile">
        <input type="text" v-model="search" placeholder="Procura algo especifico?" />
        <button><i class="fas fa-search"></i></button>
    </div>
</div>
</template>

<script>
    import axios from 'axios'
    
    var currentPage = window.location.href.split('/')[4];

    export default {
        name: 'loggedoutHeader',
        data(){
            return {
                search: '',
                selected: '/'+currentPage,
                isLogged: false,
                loadingHeader: true,
                menuSlideIsOpen: false
            }
        },
        methods:{
            changeSelected: function(route){

                if(route != this.selected){
                    this.$router.push(route) 
                    this.selected = route;
                }

            },
            openMenuSlide: function(){
                if(this.menuSlideIsOpen){
                    document.querySelector('.menuSlide').style.display = 'none';
                }else{
                    document.querySelector('.menuSlide').style.display = 'flex';
                }
                this.menuSlideIsOpen = !this.menuSlideIsOpen;
            },
            logout: function(){

                if(!confirm('você quer realmente sair?')){
                    return false;
                }

                localStorage.removeItem('token');
                this.$router.push('/login');
                location.reload();
            }
        },
        beforeCreate(){
            axios
                .post('http://127.0.0.1:8000/api/userAuth',{
                    'currentToken': localStorage.getItem('token')
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
                })
                .catch(() => {
                    /*
                        Se deu falha aqui, então não é possivel o usuario logar na conta dele, pois a api
                        esta com problemas e ela é quem irá autenticar ele, mas deixe um aviso falando que
                        não é possivel no momento logar na conta e permita que ele navegue sem conta msm.
                    */
                });
        }
    }
</script>

<style>
    .boxMenu{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
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
        cursor: pointer;
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

    .boxSearch--button{
        position: relative;
        top: 1px;
        font-size: 18px;
        border: 0;
        padding: 4px 8px;
        border-radius: 5px;
        cursor: pointer;
        color: rgb(27, 27, 27);
        background: white;
    }

    .menu ul{
        display: flex;
        align-items: center;
    }

    .menu .btn{
        margin-right:  15px;
        list-style: none;
        font-size: 16px;
        cursor: pointer;
        border-bottom: 1px solid transparent;
        color: rgb(236, 236, 236);
        text-decoration: none;
    }

    .selected,
    .menu .btn:hover{
        border-bottom: 1px solid rgb(236, 236, 236) !important;
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

    .menuSlide{
        display: none;
        position: fixed;
        right: 10px;
        top: 56px;
        background: rgb(71, 71, 71);
        /*display: flex;*/
        flex-direction: column;
        align-items: center;
        border-radius: 2px;
    }
    .menuSlide .btnMenuSlide{
        width: 100%;
        text-align: center;
        padding: 7px 15px;
        color: rgb(255, 255, 255);
        text-decoration: none;
        border-bottom: 1px solid rgb(105, 105, 105);
        cursor: pointer;
    }
    .menuSlide .btnMenuSlide:hover{
        background: rgb(0, 134, 211);
    }
    .loading{
        color: white;
    }

    .searchMobile{
        display: none;
        position: fixed;
        width: 100vw;
        max-width: 100%;
        top: 50px;
        left: 0;
        background: rgb(18, 18, 20);
        border-top: 1px solid rgb(39, 39, 39);
        padding: 10px;
        justify-content: center;
    }
    .searchMobile input{
        padding: 5px;
        border-radius: 5px;
        border: 0;
        outline: 0;
        margin-right: 5px;
    }
    .searchMobile button{
        padding: 5px 8px;
        border-radius: 3px;
        border: 0;
        cursor: pointer;
    }
    /*RESPONSIVE*/
    @media screen and (max-width: 630px){
        .boxMenu{
            height: 50px;
            padding: 0 15px;
        }
        .boxSearch{
            display: none;
        }
        .menu .btn{
            font-size: 14px;
        }
        .logo{
            width: 60px;
            height: 80%;
        }
        .profileIcon{
            margin-left: 0;
        }
        .searchMobile{
            display: flex;
        }
    }
    
</style>