import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-como-funciona',
  templateUrl: './como-funciona.component.html',
  styleUrls: ['./como-funciona.component.css']
})
export class ComoFuncionaComponent implements OnInit {

  items = [{
    title: 'Compre online nas farmácias mais próximas',
    desc: 'Você pode pesquisar os produtos mais baratos da sua região. O FarmáciaAí é o novo jeito de se pedir medicamentos e produtos de perfumaria nas farmácias perto de você.',
    img: '0-encontre-farmacia.jpg'
  }, {
    title: 'Busque seus produtos e monte seu carrinho',
    desc: `Faça seu pedido com poucos cliques. Monte seu carrinho buscando por medicamentos e produtos de perfumaria sem esperar por cotação de preços.
    Os estoques e preços são atualizados em tempo real, mostrando os valores dos produtos praticados na loja da rede escolhida mais próxima da sua região. O total da compra é calculado na medida em que um produto é adicionado ao carrinho.`,
    img: '1-busque-produtos.jpg'
  }, {
    title: 'Envie seu pedido à farmácia',
    desc: `As farmácias recebem seu pedido em tempo real, evitando filas e sem necessidade de você sair de casa. 
    Ao enviar seu pedido, a farmácia já sabe os produtos escolhidos, seu endereço, telefone e a forma de pagamento escolhida.`,
    img: '2-envie-pedido.jpg'
  }, {
    title: 'Aguarde a confirmação do seu pedido',
    desc: `O balconista confirmará seu pedido em segundos. Para evitar algum transtorno, o balconista faz uma última verificação de estoque e você receberá uma notificação em tempo real confirmando seu pedido. Caso algum dos itens tenha acabado no estoque, você ainda poderá confirmar se deseja receber os outros itens escolhidos do pedido.`,
    img: '3-aguarde-confirmacao.jpg'
  }, {
    title: 'Receba seus produtos aonde quiser',
    desc: `O FarmáciaAí permite que você cadastre diversos endereços e já se encarrega de mostrar apenas as farmácias por perto.
    Gostaria de fazer o pedido para outra pessoa? Não tem problema, cadastre quantos endereços você quiser, monte seu carrinho e faça seu pedido.`,
    img: '4-receba-pedido.jpg'
  }, {
    title: 'Pague diretamente à farmácia',
    desc: `O FarmáciaAí não intermedia o pagamento com a farmácia. 
    Ao efetuar o pedido você escolhe a forma de pagamento que será informada diretamente para a farmácia, sem necessidade de qualquer pagamento antecipado em nosso site.`,
    img: '5-pague-farmacia.jpg'
  }]

  constructor() { }

  ngOnInit() {
  }

}
