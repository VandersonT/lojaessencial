<template>
    <div>
        <section class="boxProductsWanted">
            <div class="boxFilter">
                <h1>Filtro</h1>
                
                <div class="priceFilter">
                    <h3>Preço:</h3>
                    <select>
                        <option>Todos</option>
                        <option>Menor preço</option>
                        <option>Maior preço</option>
                    </select>

                    <h3>Produto:</h3>
                    <div class="filterSingle">
                        <div>
                            <input type="radio" name="productFilter" />
                            Todos
                        </div>
                        <div>
                            <input type="radio" name="productFilter" />
                            Calça
                        </div>
                        <div>
                            <input type="radio" name="productFilter" />
                            Sapato
                        </div>
                        <div>
                            <input type="radio" name="productFilter" />
                            Blusas
                        </div>
                    </div>

                    <h3>Genero:</h3>
                    <div class="filterSingle">
                        <div>
                            <input type="radio" name="productFilter" />
                            Masculino
                        </div>
                        <div>
                            <input type="radio" name="productFilter" />
                            Feminino
                        </div>
                        <div>
                            <input type="radio" name="productFilter" />
                            Unissex
                        </div>
                    </div>
                </div>

                <button>Filtrar</button>

            </div>
            <div>
                Resultado para {{$route.params.wanted}}
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        components: {
            
        },
        data(){
            return{
                
            }
        }
    }
</script>

<style>
    .boxProductsWanted{
        margin-top: 70px;
        display: flex;
    }
    .boxFilter{
        width: 350px;
        height: calc(100vh - 70px);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid rgb(189, 189, 189);
        border-bottom: 1px solid rgb(189, 189, 189);
    }
    .boxFilter h1{
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        color: rgb(92, 92, 92);
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 30px;
    }
    .boxFilter h3{
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        color: rgb(92, 92, 92);
        margin: 20px 10px 10px 20px;
    }
    .boxFilter h3:nth-last-of-type(3){
         margin-top: 10px;
    }
    .boxFilter select{
        margin-left: 20px;
        width: 200px;
        padding: 5px;
        outline: 0;
        font-size: 15px;
        color: rgb(58, 58, 58);
    }
    .filterSingle{
        margin-left: 20px;
    }

    .boxFilter button{
        margin-top: 30px;
        width: 120px;
        padding: 8px;
        border: 0;
        border-radius: 5px;
        background: rgb(0, 162, 255);
        color: white;
        text-transform: uppercase;
        cursor: pointer;
    }
</style>
