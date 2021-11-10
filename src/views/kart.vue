<template>
    <div>
        <section class="boxKart">
            <h1><i class="fas fa-shopping-cart"></i> Seu Carrinho</h1>
            <div class="boxProducts2">
                <div class="productSingle2">
                    teste
                </div>
                <div class="productSingle2">
                    teste
                </div>
                <div class="productSingle2">
                    teste
                </div>
                <div class="productSingle2">
                    teste
                </div>
            </div>
            
            <div class="kartInfo">
                <h1>Informações:</h1>
                <div class="boxKartInfo">
                    <div class="infoKartSingle">
                        teste
                    </div>
                    <div class="infoKartSingle">
                        teste
                    </div>
                </div>
            </div>

            <div class="boxBtn">
                <button class="btnBuy">Finalizar compra</button>
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
    .boxKart{
        width: 90%;
        margin: 0 auto;
        margin-top: 70px;
        padding-top: 40px;
        padding-bottom: 100px;
    }
    .boxKart h1{
        font-family: Arial,tahoma,verdana;
        font-weight: lighter;
        color: #4e4e4e;
        margin-bottom: 10px;
    }
    .boxProducts2{
        width: 100%;
    }
    .productSingle2{
        width: 100%;
        height: 150px;
        border: 1px solid rgb(197, 197, 197);
        border-top: 0;
    }
    .productSingle2:nth-child(1){
        border-top: 1px solid rgb(197, 197, 197);
    }

    /*Info Kart*/
    .kartInfo{
        width: 100%;
        padding-top: 30px;
    }
    .infoKartSingle{
         border: 1px solid rgb(197, 197, 197);
         border-top: 0;
         padding: 20px;
    }
    .infoKartSingle:nth-child(1){
        border-top: 1px solid rgb(197, 197, 197);
    }

    /*Buttom buy*/
    .boxBtn{
        width: 100%;
        display: flex;
        justify-content:end;
    }
    .btnBuy{
        margin-top: 30px;
        width: max-content;
        padding: 12px 8px;
        border: 0;
        border-radius: 5px;
        background: rgb(0, 162, 255);
        color: white;
        text-transform: uppercase;
        cursor: pointer;
    }
</style>
