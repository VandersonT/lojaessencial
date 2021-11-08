<template>
    <div>
        <section class="boxContent">
            cadastro
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
    
</style>
