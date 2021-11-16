<template>
    <div>
        <section class="boxProfile">
            <div v-if="success" class="flash success">
                <p class="animate__animated animate__flipInX">{{flashMessage}}</p>
            </div>
            <div v-if="error" class="flash error">
                <p class="animate__animated animate__flipInX">{{flashMessage}}</p>
            </div>
            <div class="profile">
                <div class="section1">
                    <h1>Seu Perfil</h1>
                    <img :src="loggedUser.photo" />
                </div>
                <div class="boxFileds">
                    <div class="fields">
                        <div class="fieldSingle">
                            <p>Nome:</p>
                            <input v-model="loggedUser.name" type="text"/>
                        </div>
                        <div class="fieldSingle">
                            <p>Email:</p>
                            <input v-model="loggedUser.email" type="text"/>
                        </div>
                        <div class="fieldSingle">
                            <p>Foto de perfil:</p>
                            <input type="file" id="file"/>
                        </div>
                        <div class="fieldSingle">
                            <p>Senha Atual:</p>
                            <input v-model="currentPass" type="password" />
                        </div>
                        <div class="fieldSingle">
                            <p>Nova senha:</p>
                            <input v-model="newPass" :type="(showPass) ? 'text' : 'password'" />
                            <div class="showPass">
                                <input v-model="showPass" type="checkbox" />
                                Mostrar senha
                            </div>
                        </div>
                        <!--<div class="fieldSingle">
                            <p>Cep:</p>
                            <input type="text" />
                        </div>
                        <div class="fieldSingle">
                            <p>Cidade:</p>
                            <input type="text" />
                        </div>
                        <div class="fieldSingle">
                            <p>Endereço:</p>
                            <input type="text" />
                        </div>-->
                    </div>
                    <div class="boxButtons">
                        <button v-on:click="goBack()" class="return">Voltar</button>
                        <button v-on:click="saveChanges()" class="black">Salvar Alterações</button>
                    </div>
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
                loggedUser: [],
                logged: false,
                success: false,
                error: false,
                flashMessage: '',
                showPass: false,
                currentPass: '',
                newPass: ''
            }
        },
        methods:{
            goBack: function(){
                window.history.back();
            },
            saveChanges: function(){
                let data = new FormData();

                data.append('file', document.getElementById('file').files[0]);

                var fileVerify = document.getElementById('file');
                var photoUpdated = false;

                if(fileVerify.value){
                    axios
                        .post('http://127.0.0.1:8000/api/updatePhoto/1', data).then(function () {
                            //console.log(response.data);
                        }); 
                    photoUpdated = true;
                }
                
                axios
                    .put('http://127.0.0.1:8000/api/updateProfile', {
                        'id': this.loggedUser.id,
                        'name': this.loggedUser.name,
                        'email': this.loggedUser.email,
                        'currentPassword': this.currentPass,
                        'newPassword': this.newPass,
                        'photoUpdated': photoUpdated
                    }).then((r)=>{
                        if(r.data.error){
                            this.flashMessage = r.data.error;
                            this.success = false;
                            this.error = true;
                        }else{
                            this.flashMessage = 'Seu perfil foi atualizado com sucesso!';
                            this.error = false;
                            this.success = true;

                            axios
                                .post('http://127.0.0.1:8000/api/userAuth',{
                                    'currentToken': localStorage.getItem('token')
                                })
                                .then((r)=>{
                                    //Se estiver logado é redirecionado ao menu principal pois já não precisa logar
                                    if(!(r.data.logged)){
                                        this.$router.push('/')
                                    }else{
                                        this.loggedUser = r.data.loggedUser;
                                        this.logged = r.data.logged;
                                    }
                                });
                        }
                    });
            }
        },
        beforeCreate(){
            axios
                .post('http://127.0.0.1:8000/api/userAuth',{
                    'currentToken': localStorage.getItem('token')
                })
                .then((r)=>{
                    //Se estiver logado é redirecionado ao menu principal pois já não precisa logar
                    if(!(r.data.logged)){
                        this.$router.push('/')
                    }else{
                        this.loggedUser = r.data.loggedUser;
                        this.logged = r.data.logged;
                    }
                });
        }
    }
</script>

<style scoped>
    .file{
        width: 100px;
        background: red;
    }
    .boxProfile{
        margin-top: 70px;
    }
    .flash{
        text-align: center;
        padding: 6px;
        font-size: 18px;
    }
    .flash p{
        width: max-content;
        margin: 0 auto;
    }
    .success{
        background: rgb(6, 224, 6);
    }
    .error{
        background: rgb(224, 6, 6);
        color: white;
    }
    .profile{
        display: flex;
        justify-content: center;
    }
    .profile .section1{
        width: 300px;
        height: calc(100vh - 108px);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
    }
    .profile .section1 h1{
        width: 100%;
        color: rgb(39, 39, 39);
        font-weight: lighter;
        margin-bottom: 20px;
        text-align: center;
    }
    .profile .section1 img{
        width: 150px;
        height: 150px;
        border-radius: 100px;
        margin-bottom: 10px;
        border: 1px solid rgb(121, 121, 121);
    }
    .boxFileds{
        width: calc(100% - 300px);
    }
    .fields{
        padding-top: 60px;
        display: flex;
        flex-direction: column;
    }
    .fieldSingle{
        width: 400px;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    .fieldSingle p{
        color: rgb(53, 53, 53);
    }
    .fieldSingle input:not(input[type=file]){
        padding: 10px;
        outline: 0;
        border: 1px solid rgb(148, 148, 148);
        border-radius: 5px;
        font-size: 17px;
        color: rgb(75, 75, 75);
    }
    .boxButtons button{
        border: 0;
        padding: 10px;
        border-radius: 5px;
        text-transform: uppercase;
        color: white;
        font-size: 11px;
        cursor: pointer;
    }
    .showPass{
        margin-top: 10px;
    }
    .black{
        background: rgb(14, 14, 14);
    }
    .black:active{
        background: rgb(20, 20, 20) !important;
    }
    .return{
        background: #862121;
        margin-right: 10px;
    }
    .return:active{
        background: #922828 !important;
    }
    @media screen and (max-width: 730px){
        .profile{
           flex-direction: column;
            margin-bottom: 70px;
        }
        .profile .section1{
            width: 100%;
            height: auto;
            padding-bottom: 10px;
        }
        .boxFileds{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .fields{
            padding-top: 0;
        }
        .flash p{
            font-size: 16px;
        }
    }

    @media screen and (max-width: 430px){
        .fields{
            width: 100%;
            align-items: center;
        }
        .fieldSingle{
            width: 90%;
        }
        .profile .section1 img{
            width: 100px;
            height: 100px;
        }
        .fieldSingle input:not(input[type=file]){
            font-size: 13px;
        }
        .flash p{
            font-size: 14px;
        }
    }
</style>
