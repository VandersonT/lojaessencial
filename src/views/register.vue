<template>
    <div>
        <section class="boxRegister">
            <form class="register">
                <div v-show="registerError" class="flashError animate__animated animate__bounceIn">
                    Email e/ou senha estão incorretos
                </div>
                <h1><i class="fas fa-user-tag"></i>Cadastre-se</h1>
                <input type="text" placeholder="Nome"/>
                <i class="fas fa-user iconInput"></i>
                <input type="email" placeholder="Email"/>
                <i class="fas fa-envelope iconInput"></i>
                <input :type="(show) ? 'text' : 'password'" placeholder="Senha"/>
                <i class="fas fa-lock iconInput"></i>
                <input :type="(show) ? 'text' : 'password'" placeholder="Confirme a senha"/>
                <i class="fas fa-lock iconInput"></i>
                <div class="sameLine">
                    <input type="checkbox" v-on:click="showPassword()" />
                    <p>Mostrar senha</p>
                </div>
                <button>Registrar</button>
                <router-link class="link" to="/login">Já possuo uma conta</router-link>
            </form>
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
                show: false,
                registerError: false
            }
        },
        methods:{
            showPassword: function(){
                this.show = !this.show;
            }
        },
        beforeCreate(){
            axios
                .post('https://jsonplaceholder.typicode.com/posts',{
                    'currentToken': ''
                })
                .then((r)=>{
                    //Se estiver logado é redirecionado ao menu principal pois já não precisa logar
                    if(r.data.logged){
                        location.href = document.referrer;
                    }
                });
        }
    }
</script>

<style>
    .boxRegister{
        margin-top: 70px;
        width: 100vw;
        max-width: 100%;
        height: calc(100vh - 70px);
        display: flex;
        justify-content: center;
        background-image: url('../assets/images/bannerLogin.jpg');
        background-position: center;
        background-size: cover;
    }

    .flashError{
        width: 100%;
        text-align: center;
        padding: 5px;
        border-radius: 5px;
        background: rgb(199, 0, 0);
        margin-bottom: 20px;
        color: white;
    }

    .register{
        width: 400px;
        height: max-content;
        margin-top: 100px;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        border-radius: 5px;
    }

    .register h1{
        color: white;
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        margin-bottom: 20px;
    }

    .register h1 i{
        margin-right: 10px;
        font-size: 20px;
    }

    .register input:not(input[type=checkbox]){
        width: 100%;
        padding: 10px;
        font-size: 17px;
        outline: 0;
        border: 1px solid rgb(37, 37, 37);
        border-radius: 5px;
        color: gray;
        padding-left: 38px;
    }

    .iconInput{
        position: relative;
        right: 150px;
        bottom: 31px;
        color: rgb(77, 77, 77);
        font-size: 20px;
    }

    .sameLine{
        width: 90%;
        display: flex;
        align-items: center;
        color: white;
    }

    .sameLine input{
        margin-right: 5px;
    }

    .register button{
        margin-top: 30px;
        background: rgb(0, 119, 255);
        outline: 0;
        border: 0;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
        color: white;
    }

    .register button:hover{
        background: rgb(0, 112, 240);
        color: rgb(236, 236, 236);
    }

    @media screen and (max-width: 630px){
       .boxLogin{
            margin-top: 96px;
            height: calc(100vh - 96px);
        }
    }
</style>
