var app = new Vue({
  el: '#app', 
  data: {
    products: ["Socks", "pajamas", "Dingleberries"], 
    description: "Only made of the finest quality", 
    imageUrl: './assets/a-simple-bowl-cut.jpg', 
    productUrl: 'http://google.com', 
    inStock: true, 
    inventory: 2, 
    onSale: true, 
    sizes: [
      {number: 5, 
        quantity: 2
      },
      {number: 6, 
        quantity: 3},
      {number: 7, 
        quantity: 3},
      {number: 8, 
        quantity: 0},
      {number: 9, 
        quantity: 3},
      {number: 10, 
        quantity: 7},
      {number: 11, 
        quantity: 3},
      {number: 12, 
        quantity: 0}
    ]
  }
})