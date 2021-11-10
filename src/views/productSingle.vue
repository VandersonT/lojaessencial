<template>
    <div>
        <section class="boxProdutSingle">
            <div class="showProdut">
                <div class="showProdutImages">
                    <img src="../assets/images/shoes.jpg" />
                    <div class="productGallery">
                        carrendo mais imagens aqui
                    </div>
                </div>
                <div>
                    <h1>Nome Aqui do Produto</h1>
                    
                    <div>
                        <b>Descrição:</b>
                        <p>loren ipsun dolor o uqe eu quiser falar i will say because i know it and is very userful</p>
                    </div>
                    
                    <div>
                        <b>Preço:</b><span>R$ 999,00</span>
                    </div>
                    
                    <select>
                        <option>P</option>
                        <option>M</option>
                        <option>G</option>
                        <option>GG</option>
                    </select>

                    <div>
                        <p>Calcular frete:</p>
                        <input type="number" placeholder="00000-000" />
                        <button>ok</button>
                        <p class="link">Não sei o meu cep</p>
                    </div>

                    <div>
                        <button>Adicionar ao carrinho</button>
                         <button>Comprar agora</button>
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
        width: 420px;
        height: 60vh;
        text-align: center;
        border: 1px solid gray;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-right: 10px;
    }

    .showProdutImages img{
        width: 100%;
        height: calc(100% - 100px);
    }

    .productGallery{
        width: 100%;
        height: 100px;
        padding: 10px;
        border-top: 1px solid gray;
    }

</style>
