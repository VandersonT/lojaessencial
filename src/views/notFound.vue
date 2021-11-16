<template>
    <div>
        <section class="boxError">
            <div class="error404">
                <img src="../assets/images/404.png" />
                <p>Desculpe mas esta página não foi encontrada!</p>
                <button v-on:click="goHome()">Inicio</button>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        components: {
            
        },
        methods: {
            goHome: function(){
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    .boxError{
        margin-top: 70px;
        width: 100%;
        height: calc(100vh - 70px);
        display:flex;
        justify-content: center;
        align-items: center;
        background: rgb(219, 219, 219);
    }
    .error404{
        width: 600px;
        display: block;
        text-align: center;
        margin-bottom: 70px;
    }
    .error404 img{
        width: 100%;
        height: 200px;
    }
    .error404 p{
        color: rgb(34, 34, 34);
        font-size: 20px;
    }
    .error404 button{
        border: 0;
        padding: 10px 40px;
        background: rgb(0, 110, 255);
        border-radius: 5px;
        text-transform: uppercase;
        color: white;
        font-size: 11px;
        cursor: pointer;
        margin-top: 20px;
    }
    .error404 button:hover{
        background: rgb(0, 103, 238);
        color: rgb(241, 241, 241);
    }
    @media screen and (max-width: 1000px){
        .error404{
            width: 400px;
        }
        .error404 img{
            height: 150px;
        }
    }
    @media screen and (max-width: 630px){
        .error404{
            width: 300px;
        }
        .error404 img{
            height: 100px;
        }
        .error404 p{
            font-size: 15px;
        }
        .error404 button{
            padding: 6px 15px;
            font-size: 10px;
        }
    }
    @media screen and (max-width: 350px){
        .error404{
            width: 90%;
        }
        .error404 p{
            font-size: 11px;
        }
        .error404 img{
            height: 80px;
        }
    }
</style>
