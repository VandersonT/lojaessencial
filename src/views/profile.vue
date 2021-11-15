<template>
    <div>
        <section class="boxProfile">
            Perfil
        </section>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        components: {
            
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
                    }
                });
        }
    }
</script>

<style>
    .boxProfile{
        margin-top: 70px;
    }
</style>
