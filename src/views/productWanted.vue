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
                            <input type="checkbox" checked />
                            Calças
                        </div>
                        <div>
                            <input type="checkbox" checked/>
                            Sapatos
                        </div>
                        <div>
                            <input type="checkbox" checked/>
                            Blusas
                        </div>
                        <div>
                            <input type="checkbox" checked/>
                            Camisas
                        </div>
                    </div>

                    <h3>Genero:</h3>
                    <div class="filterSingle">
                        <div>
                            <input type="radio" name="genderFilter" checked />
                            Unissex
                        </div>
                        <div>
                            <input type="radio" name="genderFilter" />
                            Masculino
                        </div>
                        <div>
                            <input type="radio" name="genderFilter" />
                            Feminino
                        </div>
                    </div>

                    <h3>Para:</h3>
                    <div class="filterSingle">
                        <div>
                            <input type="checkbox" checked />
                            Bebês
                        </div>
                        <div>
                            <input type="checkbox" checked />
                            Crianças
                        </div>
                        <div>
                            <input type="checkbox" checked />
                            Adultos
                        </div>
                    </div>

                </div>

                <button>Filtrar</button>

            </div>
            <div class="boxResults">
                <h1>Resultado para {{$route.params.wanted}}:</h1>
                <div class="showCase">
                    <div class="productSingle">
                        <img src="https://images.tcdn.com.br/img/img_prod/482949/blusa_feminina_minuty_country_bordada_275_2764_1_20210809100307.png" />
                        <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                        <p class="productPrice">R$ 999,00</p>
                    </div>
                    <div class="productSingle">
                        <img src="https://images.tcdn.com.br/img/img_prod/482949/blusa_feminina_minuty_country_suede_291_2778_1_20210809101902.png" />
                        <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                        <p class="productPrice">R$ 999,00</p>
                    </div>
                    <div class="productSingle">
                        <img src="http://2.bp.blogspot.com/-ikgwp4F21S4/Ue8bTIXrw-I/AAAAAAAAAt0/Bsu-z3sDLvE/s1600/Blusa_de_Manga_L_4f146ae67a4b9.png" />
                        <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                        <p class="productPrice">R$ 999,00</p>
                    </div>
                    <div class="productSingle">
                        <img src="https://institucional.lojasleader.com.br/wp-content/uploads/2019/11/BLUSA-CROPPED-ESTAMPA-JOIAS-5999.png" />
                        <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                        <p class="productPrice">R$ 999,00</p>
                    </div>
                    <div class="productSingle">
                        <img src="https://www.gsuplementos.com.br/upload/produto/imagem/b_cal-a-jogger-growth-manuscrito.png" />
                        <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                        <p class="productPrice">R$ 999,00</p>
                    </div>
                    <div class="productSingle">
                        <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Imagem-de-Sapato-em-PNG-1280x720.png" />
                        <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                        <p class="productPrice">R$ 999,00</p>
                    </div>
                    <div class="productSingle">
                        <img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Rel%C3%B3gio-Sony-PNG.png" />
                        <p class="productDescription">loren ipsun dolor amet sit test, so i want to eat a piece of meat today</p>
                        <p class="productPrice">R$ 999,00</p>
                    </div>
                </div>
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

    .boxResults{
        width: calc(100vw - 350px);
        padding: 20px;
    }
    .boxResults h1{
        color: #858585;
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    /*A página que exibe os produtos que foram encontrados usa a mesma estrutura html/css que a página home: .
    Então, para não repetir css o css dele é compartilhado e se encontra em style da página home*/
</style>
