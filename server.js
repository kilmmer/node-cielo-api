var cielo = require('./cielo')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

//para produção remova production ou altere para true

app.get('/', function(request, response){
    //console.log(request.body)      // your JSON
    response.send("<br><p align=center>MultiAPI</p>")    // echo the result back
})

app.get('/cielo', function(req, res){
    res.send("Acesso não permitido")
})

app.post('/cielo/', function(req, response){
    //console.log(request.body)      // your JSON
    //response.send(req.body)    // echo the result back
    $dados = req.body

    plan = $dados.Recurrent

    //response.send(plan)
    //console.log(plan)

    //console.log($dados)
    var headers = {
        'MerchantId': $dados.User.MerchantId,
        'MerchantKey': $dados.User.MerchantKey
    }

    var form = {
        'MerchantOrderId': plan.MerchantOrderId,
        'Customer': { Name: plan.Customer } || undefined,
        'Payment': {
            'Type': plan.Payment.Type,
            'Amount': plan.Payment.Amount,
            'Installments': plan.Payment.Installments,
            'SoftDescriptor': plan.Payment.SoftDescriptor || undefined,
            'RecurrentPayment':{
                'AuthorizeNow': plan.Payment.RecurrentPayment.AuthorizeNow || true,
                'Interval': plan.Payment.RecurrentPayment.Interval || undefined,
                'EndDate': plan.Payment.RecurrentPayment.EndDate || undefined
            },
            'CreditCard': {
                'CardNumber': plan.Payment.CreditCard.CardNumber,
                'Holder': plan.Payment.CreditCard.Holder || undefined,
                'ExpirationDate': plan.Payment.CreditCard.ExpirationDate,
                'SecurityCode': plan.Payment.CreditCard.SecurityCode,
                'SaveCard': plan.Payment.CreditCard.SaveCard,
                'Brand': plan.Payment.CreditCard.Brand
            }
        }
    }

    var rp = require('request-promise')

    var options = {
        method: 'POST',
        uri: 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales',
        headers: headers,
        body: plan,
        json: true // Automatically stringifies the body to JSON
    };
    
    rp(options)
        .then(function (parsedBody) {
            reponse.send(parsedBody)
        })
        .catch(function (err) {
            response.send(err)
        });


    /*$json = JSON.stringify(plan)


    requests({url: 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/',method: 'POST', json: {plan}, json : true, headers: headers}, function(error, res, body) {

        console.log(body)
        if(error){
            response.send(error)
        }else{
            response.send(res)
        }
    })*/

    /*requests.post({ url: 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', body: { plan }, json:true, headers: headers}, function(error, res, body) {
        console.log(body)    
        if(error){
            response.send(error)
        }else{
            response.send(res)
        }
    })*/
    
    
})

app.listen(3000)
//console.log("Servidor Express rodando na porta 1818...")