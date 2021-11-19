<template>
    <div>
        <section class="boxRegister">
            <div class="register">
                <div v-show="registerError" class="flashError animate__animated animate__bounceIn">
                    {{errorMessage}}
                </div>
                <h1><i class="fas fa-user-tag"></i>Cadastre-se</h1>
                <input type="text" placeholder="Nome" v-model="name"/>
                <i class="fas fa-user iconInput"></i>
                <input type="email" placeholder="Email" v-model="email"/>
                <i class="fas fa-envelope iconInput"></i>
                <input :type="(show) ? 'text' : 'password'" placeholder="Senha" v-model="password"/>
                <i class="fas fa-lock iconInput"></i>
                <input :type="(show) ? 'text' : 'password'" placeholder="Confirme a senha" v-model="confirmPassword"/>
                <i class="fas fa-lock iconInput"></i>
                <div class="sameLine">
                    <input type="checkbox" v-on:click="showPassword()" />
                    <p>Mostrar senha</p>
                </div>
                <button v-on:click="createAccount()">Registrar</button>
                <router-link class="link" to="/login">Já possuo uma conta</router-link>
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
                show: false,
                registerError: false,
                errorMessage: '',
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        },
        methods:{
            showPassword: function(){
                this.show = !this.show;
            },
            createAccount: function(){
                //filtra campos vazios
                if(!this.name || !this.email || !this.password || !this.confirmPassword){
                    this.registerError = true;
                    this.errorMessage = 'Não envie campos vazios';
                    return false;
                }

                //Verifica se as senhas batem
                if(this.password != this.confirmPassword){
                    this.registerError = true;
                    this.errorMessage = 'A senha e a confirmação estão diferentes.';
                    return false;
                }

                //valida o email enviado
                var usuario = this.email.substring(0, this.email.indexOf("@"));
                var dominio = this.email.substring(this.email.indexOf("@")+ 1, this.email.length);

                if (!((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) && (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) && (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1) && (dominio.lastIndexOf(".") < dominio.length - 1))){
                    this.registerError = true;
                    this.errorMessage = 'Digite um email valido para podermos prosseguir.';
                    return false
                }

                //Envia as informações para o back-end
                axios
                .post('https://api.lojaessencial.ga/api/users',{
                    'name': this.name,
                    'email': this.email,
                    'password': this.password,
                    'confirmPassword': this.confirmPassword,
                })
                .then((r)=>{
                    //Se estiver logado é redirecionado ao menu principal pois já não precisa logar
                    if(r.data.error){
                        this.registerError = true;
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
        margin-top: 10vh;
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
       .boxRegister{
            margin-top: 96px;
            height: calc(100vh - 96px);
        }
        .register{
            width: 70%;
            margin-top: 10vh;
        }
        .iconInput{
            right: 44% !important;
            bottom: 26px !important;
            font-size: 15px !important;
        }
        .register input:not(input[type=checkbox]){
            font-size: 14px;
        }
        .register h1{
            font-size: 17px;
        }
        .register h1 i{
            font-size: 14px;
        }
        .register button{
            font-size: 10px;
        }
        .link2{
            font-size: 14px;
        }
    }

    @media screen and (max-width: 450px){
        .register{
            width: 80%;
        }
        .register input:not(input[type=checkbox]){
            padding-left: 29px;
        }
    }

    @media screen and (max-width: 350px){
        .register{
            width: 96%;
        }
    }

    @media screen and (max-height: 600px){
        .register{
            margin-top: 2vh;
        }
    }

    @media screen and (max-height: 530px){
        .boxRegister{
            height: auto;
            padding-bottom: 20px;
        }
    }
</style>
