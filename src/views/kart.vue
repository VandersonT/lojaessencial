<template>
    <div>
        <section class="boxKart">
            <h1><i class="fas fa-shopping-cart"></i> Seu Carrinho</h1>
            <div class="boxProducts2">
                <div class="productSingle2">
                    <img src="../assets/images/no-picture.png" />
                    <div class="productInfo">
                        <h1>Casaco de couro de boiadeiro</h1>
                        <p>loren ipsun dolor amet ipsun de test and i don't know want i estou falandoloren ipsun dolor amet ipsun de test and i don't know want i estou falando</p>
                    </div>
                    <div class="boxAmount">
                        <button>-</button>
                        <p>1</p>
                        <button>+</button>
                    </div>
                    <div>
                        R$ 1000,00
                    </div>
                </div>
                <div class="productSingle2">
                    <img src="../assets/images/no-picture.png" />
                    <div class="productInfo">
                        <h1>Blusão de Seda Azul</h1>
                        <p>loren ipsun dolor amet ipsun de test and i don't know want i estou falandoloren ipsun dolor amet ipsun de test and i don't know want i estou falando</p>
                    </div>
                    <div class="boxAmount">
                        <button>-</button>
                        <p>2</p>
                        <button>+</button>
                    </div>
                    <div>
                        R$ 50,00
                    </div>
                </div>
                <div class="productSingle2">
                    <img src="../assets/images/no-picture.png" />
                    <div class="productInfo">
                        <h1>Calça Jeans</h1>
                        <p>loren ipsun dolor amet ipsun de test and i don't know want i estou falandoloren ipsun dolor amet ipsun de test and i don't know want i estou falando</p>
                    </div>
                    <div class="boxAmount">
                        <button>-</button>
                        <p>1</p>
                        <button>+</button>
                    </div>
                    <div>
                        R$ 890,00
                    </div>
                </div>
                <div class="productSingle2">
                    <img src="../assets/images/no-picture.png" />
                    <div class="productInfo">
                        <h1>Sapato Social Amoleca</h1>
                        <p>loren ipsun dolor amet ipsun de test and i don't know want i estou falandoloren ipsun dolor amet ipsun de test and i don't know want i estou falando</p>
                    </div>
                    <div class="boxAmount">
                        <button>-</button>
                        <p>10</p>
                        <button>+</button>
                    </div>
                    <div>
                        R$ 999,00
                    </div>
                </div>
            </div>
            
            <div class="kartInfo">
                <h1>Informações:</h1>
                <div class="boxKartInfo">
                    <div class="infoKartSingle">
                        <div class="getCep">
                            <p>Digite o seu cep:</p>
                            <input type="number" />
                            <button><i class="fas fa-search"></i></button>
                            <p class="link">Não sei o meu cep</p>
                        </div>
                        não calculado
                    </div>
                    <div class="infoKartSingle">
                        <h3>Total</h3>
                        <p>R$ 999,999</p>
                    </div>
                </div>
            </div>

            <div class="boxBtn">
                <button class="btnBuy" onClick="alert('Prezado cliente, lamentamos, mas desabilitamos temporariamente a opção de compras!!! Para realizar a compra nos chame pelo whatsapp +55 (33)8861-7281')">Finalizar compra</button>
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 30px;
    }
    .productSingle2:nth-child(1){
        border-top: 1px solid rgb(197, 197, 197);
    }

    .productSingle2 img{
        width: 120px;
        height: 90%;
        border-radius: 10px;
    }

    .productInfo h1{
        font-size: 22px;
    }

    .productInfo p{
        color: #777777;
        max-width: 70ch;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .boxAmount{
        display: flex;
    }

    .boxAmount button{
        padding: 3px 8px;
        border: 1px solid rgb(182, 182, 182);
        cursor: pointer;
        background: rgb(0, 152, 240);
        color: white;
    }

    .boxAmount p{
        padding: 3px 8px;
        border-top: 1px solid rgb(182, 182, 182);
        border-bottom: 1px solid rgb(182, 182, 182);
    }

    /*Info Kart*/
    .kartInfo{
        width: 100%;
        padding-top: 50px;
    }
    .infoKartSingle{
         border: 1px solid rgb(197, 197, 197);
         border-top: 0;
         padding: 20px;
         display: flex;
         justify-content: space-between;
         align-items: center;
    }
    .infoKartSingle:nth-child(1){
        border-top: 1px solid rgb(197, 197, 197);
    }

    .getCep{
        text-transform:none;
    }

    .getCep input[type=number]{
        outline: 0;
        border: 1px solid rgb(168, 168, 168);
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 5px;
    }

    .getCep button{
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
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
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
