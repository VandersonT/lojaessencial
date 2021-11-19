<template>
    <div>
        <section class="boxKart">
            <h1><i class="fas fa-shopping-cart"></i> Seu Carrinho</h1>
            <div class="boxProducts2">
                <div v-show="product.length > 0 && !loading" v-for="(info, index) in product" v-bind:key="info.id" class="productSingle2">
                    <img v-on:click="openProdcut(info.productId)" :src="info.cover" />
                    <div class="productInfo">
                        <h1>Casaco de couro de boiadeiro</h1>
                        <p>loren ipsun dolor amet ipsun de test and i don't know want i estou falandoloren ipsun dolor amet ipsun de test and i don't know want i estou falando</p>
                    </div>
                    <div class="boxAmount">
                        <button v-on:click="less(info.id, index)">-</button>
                        <p>{{info.amountWanted}}</p>
                        <button v-on:click="more(info.id, index)">+</button>
                    </div>
                    <div class="priceSingle">
                        R$ {{info.price}},00
                    </div>
                </div>

                <p v-show="product.length < 1 && !loading" class="empty center">
                    Seu carrinho esta vazio.
                </p>

                <p v-show="loading" class="loadingProducts center">
                    Carregando...
                </p>

            </div>
            
            <div class="kartInfo">
                <h1>Informações:</h1>
                <div class="boxKartInfo">
                    <div class="infoKartSingle">
                        <h3>Total</h3>
                        <p>R$ {{total}},00</p>
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
    import axios from 'axios'

    export default {
        components: {
            
        },
        data(){
            return {
                logged: false,
                loggedUser: [],
                product: [],
                loading: true,
                timer: null,
                prices: [],
                total: 0
            }
        },
        methods:{
            openProdcut: function(productId){
                this.$router.push('/produto/'+productId);
            },
            more: function(id, index){
                this.product[index].amountWanted = this.product[index].amountWanted + 1;

                axios
                    .put('https://api.lojaessencial.ga/api/kart',{
                        'id': id,
                        'newAmount': this.product[index].amountWanted,
                    });

                this.product[index].price += parseInt(this.prices[index]);
                this.total = 0;
                for(let i = 0; i < this.product.length; i++){
                    this.total +=  this.product[i].price;
                }

            },
            less: function(id, index){
                this.product[index].amountWanted = this.product[index].amountWanted - 1;

                if(this.product[index].amountWanted < 1){
                    this.product.splice(index, 1);
                    axios
                        .delete('https://api.lojaessencial.ga/api/kart/'+id);
                }else{
                    this.product[index].price -= parseInt(this.prices[index]);
                    axios
                        .put('https://api.lojaessencial.ga/api/kart',{
                            'id': id,
                            'newAmount': this.product[index].amountWanted,
                        });
                    this.total = 0;
                    for(let i = 0; i < this.product.length; i++){
                        this.total +=  this.product[i].price;
                    }
                }
            },
        },
        beforeCreate(){
            /*Get user*/
            axios
                .post('https://api.lojaessencial.ga/api/userAuth',{
                    'currentToken': localStorage.getItem('token')
                })
                .then((r)=>{
                    //Se o usuário estiver logado o sistema pega os dados da conta
                    this.logged = r.data.logged;
                    if(this.logged){
                        this.loggedUser = r.data.loggedUser;
                    }else{
                        this.$router.push('/login')
                    }

                })
                .finally(()=>{
                    axios
                        .get('https://api.lojaessencial.ga/api/kart/'+this.loggedUser.id)
                        .then((r)=>{
                            this.product = r.data.kart;
                            
                            for(let i = 0; i < this.product.length; i++){
                                this.prices[i] = this.product[i].price;

                                if(this.product[i].amountWanted > 1){
                                    for(let j = 0; j < this.product[i].amountWanted-1; j++){
                                        this.product[i].price += this.prices[i];
                                    }
                                }

                            }

                        })
                        .finally(()=>{
                            this.loading = false;

                            for(let i = 0; i < this.product.length; i++){
                                this.total +=  this.product[i].price;
                            }

                        });
                });
        }
    }
</script>

<style>
    .center{
        text-align: center;
    }
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
        border: 1px solid rgb(165, 165, 165);
        border-top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 30px;
    }
    .productSingle2:nth-child(1){
        border-top: 1px solid rgb(165, 165, 165);
    }

    .productSingle2 img{
        width: 120px;
        height: 90%;
        border-radius: 10px;
        cursor: pointer;
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
        background: rgb(8, 8, 8);
        color: white;
    }
    .boxAmount button:active{
        background: rgb(19, 19, 19);
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
         border: 1px solid rgb(165, 165, 165);
         border-top: 0;
         padding: 20px;
         display: flex;
         justify-content: space-between;
         align-items: center;
    }
    .infoKartSingle:nth-child(1){
        border-top: 1px solid rgb(165, 165, 165);
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
    @media screen and (max-width: 1050px) {
        .productSingle2{
            padding: 10px 10px;
        }
        .productSingle2 img{
            width: 90px;
            height: 80px;
        }
        .productInfo h1{
            font-size: 19px;
        }
        .productInfo p{
            font-size: 13px;
        }
    }
    @media screen and (max-width: 830px) {
        .boxKart h1{
            font-size: 19px;
        }
        .productInfo h1{
            font-size: 16px;
        }
        .productInfo p{
            max-width: 45ch;
        }
    }

    @media screen and (max-width: 620px) {
        .boxKart h1{
            font-size: 16px;
            margin-top: 30px;
        }
        .productSingle2 img{
            width: 60px;
            height: 50px;
        }
        .productInfo h1{
            font-size: 16px;
        }
        .productInfo p{
            max-width: 45ch;
        }
        .productSingle2{
            height: 70px;
        }
        .boxAmount p{
            height: auto;
            padding: 0 8px;
        }
        .boxAmount button{
            background: transparent;
            color: black;
        }
        .productInfo h1{
            width: max-content;
            font-size: 13px;
        }
        .productInfo p{
            display: none;
        }
        .priceSingle{
            font-size: 10px;
        }
        .infoKartSingle h3{
            font-size: 15px;
        }
        .infoKartSingle p{
            font-size: 12px;
        }
        .kartInfo{
            padding-top: 0;
        }
        .btnBuy{
            margin-top: 20px;
            padding: 10px 8px;
            font-size: 10px;
        }
    }
    @media screen and (max-width: 470px) {
        .productInfo h1{
            display: none;
        }
        .productSingle2{
            height: 60px;
        }
        .productSingle2 img{
            width: 40px;
            height: 35px;
        } 
        .boxAmount p{
            padding: 0 4px;
        }
    }
</style>
