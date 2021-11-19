<template>
    <div>
        <section class="boxLogin">
            <div class="login">
                <div v-show="loginError" class="flashError">
                    {{errorMessage}}
                </div>
                <h1><i class="fas fa-lock"></i>Faça Login</h1>
                <input type="email" placeholder="Email" v-model="email"/>
                <i class="fas fa-envelope iconInput"></i>
                <input type="password" placeholder="Senha" v-model="password"/>
                <i class="fas fa-lock iconInput"></i>
                <!--<div class="sameLine">
                    <input type="checkbox" />
                    <p>Manter conectado</p>
                </div>-->
                <button v-on:click="login()">Entrar</button>
                <router-link class="link link2" to="/cadastro">Ainda não tem uma conta?</router-link>
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
                loginError: false,
                errorMessage: '',
                email: '',
                password: ''
            }
        },
        methods:{
            login: function(){
                if(!this.email || !this.password){
                    this.loginError = true;
                    this.errorMessage = 'Não envie campos vazios';
                    return false;
                }

                //valida o email enviado
                var usuario = this.email.substring(0, this.email.indexOf("@"));
                var dominio = this.email.substring(this.email.indexOf("@")+ 1, this.email.length);

                if (!((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) && (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) && (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1) && (dominio.lastIndexOf(".") < dominio.length - 1))){
                    this.loginError = true;
                    this.errorMessage = 'Digite um email valido para podermos prosseguir.';
                    return false;
                }

                axios
                    .post('https://api.lojaessencial.ga/api/usersLogin',{
                        'email': this.email,
                        'password': this.password
                    })
                    .then((r)=>{
                        //Se estiver logado é redirecionado ao menu principal pois já não precisa logar
                        if(r.data.error){
                            this.loginError = true;
                            this.errorMessage = r.data.error;
                        }else{
                            localStorage.setItem('token', r.data.token);
                            location.href = document.referrer;
                        }
                    });

            }
        },
        beforeCreate(){
            axios
                .post('https://api.lojaessencial.ga/api/userAuth',{
                    'currentToken': localStorage.getItem('token')
                })
                .then((r)=>{
                    //Se estiver logado é redirecionado ao menu principal pois já não precisa logar
                    if(r.data.logged){
                        this.$router.push('/')
                    }
                });
        }
    }
</script>

<style>
    .boxLogin{
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

    .login{
        width: 400px;
        height: max-content;
        margin-top: 20vh;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        border-radius: 5px;
    }

    .login h1{
        color: white;
        font-family: Arial,tahoma,verdana;
        text-transform: capitalize;
        font-weight: lighter;
        margin-bottom: 20px;
    }

    .login h1 i{
        margin-right: 10px;
        font-size: 20px;
    }

    .login input:not(input[type=checkbox]){
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

    .login button{
        background: rgb(0, 119, 255);
        outline: 0;
        border: 0;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
        color: white;
    }

    .login button:hover{
        background: rgb(0, 112, 240);
        color: rgb(236, 236, 236);
    }

    @media screen and (max-width: 630px){
       .boxLogin{
            margin-top: 96px;
            height: calc(100vh - 96px);
        }
        .login{
            width: 350px;
            margin-top: 10vh;
        }
        .iconInput{
            right: 45% !important;
            bottom: 27px !important;
            font-size: 15px !important;
        }
        .login input:not(input[type=checkbox]){
            font-size: 14px;
            padding-left: 26px;
        }
        .login h1{
            font-size: 17px;
        }
        .login h1 i{
            font-size: 14px;
        }
        .login button{
            font-size: 10px;
        }
        .link2{
            font-size: 14px;
        }
    }

    @media screen and (max-width: 450px){
        .login{
            width: 300px;
        }
        .login input:not(input[type=checkbox]){
            padding-left: 26px;
        }
        .iconInput{
            right: 44% !important;
        }
    }

    @media screen and (max-width: 350px){
        .login{
            width: 96%;
        }
        .boxLogin{
            height: auto !important;
            min-height: calc(100vh - 100px);
        }
        .login input:not(input[type=checkbox]){
            padding: 7px;
            padding-left: 24px;
        }
        .iconInput{
            right: 45% !important;
            bottom: 22px !important;
            font-size: 13px !important;
        }
        .login button{
            font-size: 10px;
            padding: 8px 10px;
        }
    }

    @media screen and (max-width: 300px){
        .login input:not(input[type=checkbox]){
            padding-left: 23px !important;
        }
        .iconInput{
            right: 44% !important;
        }
    }
</style>
