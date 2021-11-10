<template>
    <div>
        <section class="boxProdutSingle">
            <div class="showProdut">
                <div class="showProdutImages">
                    <img class="mainImage" src="../assets/images/coat.jpg" />
                    <div class="productGallery">
                        <div class="scrollGallery" src="../assets/images/coat.jpg">
                            <img class="miniImage" src="../assets/images/coat.jpg"/>
                            <img class="miniImage" src="../assets/images/coat.jpg"/>
                            <img class="miniImage" src="../assets/images/coat.jpg"/>
                            <img class="miniImage" src="../assets/images/coat.jpg"/>
                            <img class="miniImage" src="../assets/images/coat.jpg"/>
                        </div>
                    </div>
                </div>
                <div class="showProdutInfo">
                    <h1>Casaco de Treident</h1>
                    
                    <div class="showProductDescription">
                        <b class="subTitleProduct">Descrição:</b>
                        <p>loren ipsun dolor o uqe eu quiser falar i will say because i know it and is very userful loren ipsun dolor o uqe eu quiser falar i will say because i know it and is very userful</p>
                    </div>
                    
                    <div class="showProductPrice">
                        <b class="subTitleProduct">Preço:</b><span> R$ 999,00</span>
                    </div>
                    
                    <select>
                        <option disabled selected>Tamanho</option>
                        <option>P</option>
                        <option>M</option>
                        <option>G</option>
                        <option>GG</option>
                    </select>

                    <div class="calcFrete">
                        <p>Calcular frete:</p>
                        <input type="number" placeholder="00000-000" />
                        <button>ok</button>
                        <p class="link">Não sei o meu cep</p>
                    </div>

                    <div>
                        <button class="buttonModel1 btnOrange">Adicionar aos favoritos</button>
                         <button class="buttonModel1 btnBlue">Adicionar ao carrinho</button>
                    </div>
                    
                </div>
            </div>
            <div class="infoProduct">
                
            </div>
            <div class="productComments">
                
            </div>
            <div class="similarProduct">
                
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        components: {
            
        }
    }
</script>

<style>
    .boxProdutSingle{
        margin-top: 70px;
    }

    .showProdut{
        display: flex;
    }

    .showProdutImages{
        width: 460px;
        height: 70vh;
        text-align: center;
        border: 1px solid rgb(179, 179, 179);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .showProdutImages .mainImage{
        width: 100%;
        height: calc(100% - 100px);
    }

    .productGallery{
        width: 100%;
        height: 100px;
        border-top: 1px solid rgb(179, 179, 179);
        overflow-x: auto;
    }

    .scrollGallery{
        width: max-content;
        height: 100%;
        display: flex;
    }

    .miniImage{
        width: 110px;
        height: 100%;
        margin-right: 10px;
        border-right: 1px solid rgb(179, 179, 179);
    }

    .miniImage:last-child{
        border-right: 0;
    }

    .subTitleProduct{
        font-weight: lighter;
        color: #292929;
        font-size: 20px;
    }

    .showProdutInfo{
        width: calc(100% - 460px);
        border-bottom: 1px solid rgb(179, 179, 179);
        padding-left: 20px;
    }

    .showProdutInfo h1{
        font-weight: lighter;
        font-family: Arial,tahoma,verdana;
        text-align: center;
        margin-top: 25px;
        color: #4e4e4e;
    }

    .showProductPrice,
    .showProductDescription{
        margin: 20px 0;
    }

    .showProductDescription p{
        width: 600px;
        color: #777777;
    }

    .showProdutInfo select{
        width: 200px;
        padding: 5px;
        outline: 0;
        font-size: 15px;
        color: rgb(58, 58, 58);
        margin-bottom: 20px;
    }

    .calcFrete{
        margin: 20px 0;
    }
    
    .calcFrete input[type=number]{
        outline: 0;
        border: 1px solid rgb(168, 168, 168);
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 5px;
    }
    
    .calcFrete button{
        width: max-content;
        padding: 5px 8px;
        border: 0;
        border-radius: 5px;
        background: rgb(0, 162, 255);
        color: white;
        text-transform: uppercase;
        cursor: pointer;
        margin-left: 5px;
    }

    .buttonModel1{
        width: max-content;
        padding: 10px 8px;
        border: 0;
        border-radius: 5px;
        color: white;
        text-transform: uppercase;
        cursor: pointer;
        background: rgb(36, 36, 36);
    }

    .buttonModel1:nth-child(1){
        margin-right: 15px;
    }

    .btnBlue{
        background: rgb(0, 162, 255);
    }

    .btnOrange{
        background: rgb(44, 44, 43);
    }

</style>
