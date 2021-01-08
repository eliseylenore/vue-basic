Vue.component('product', {
  template: `
      <div class="product">
      <div class="product-image">
        <img :src="image" alt="">
      </div>
      <div class="product-info">
        <h1> 
          <a :href="productUrl" target="_blank" rel="noopener noreferrer">
            {{ title }}
          </a>
        </h1>
        <p class="red" v-show="onSale">
          On sale!
        </p>
        <p v-if="inventory > 10">In stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
        <p v-else>Out of stock</p>
        <p>User is premium: {{ premium }}</p>
        <div class="sizes">
          <h3>Choose size</h3>
          <ul>
            <li v-for="size in sizes" :key="size.number" :class="size.quantity === 0 ? 'disabled' : ''">
              <button class="list-button" @click="selectSize(size.number)">
                <div class="size-number">
                  {{ size.number }}
                </div>
                <div class="x">
                  <div>
                    {{size.quantity === 0 ? 'X' : ''}}
                  </div>
                </div>
              </button>
            </li>
          </ul>
          <h3>Choose color</h3>
          <div v-for="variant, index in variants" :key="index" class="color-box" :class="selectedVariant === index ? 'selected-variant' : '' " :style="{backgroundColor: variant.color}" @mouseover="changeImage(index)">
          </div>
        </div>
        <p>
          {{ description }}
        </p>
        <button class="add-to-cart" v-on:click="addToCart" >
          Add to cart
        </button>
      </div>
      <product-review @review-submitted="addReview"></product-review>
    </div>
  `, 
  props: {
    premium: Boolean, 
    required: true
  },
  data() {
    return {
      products: ["Socks", "pajamas", "Dingleberries"],
      description: "Only made of the finest quality",
      productUrl: 'http://google.com',
      brand: 'Vue Mastery',
      inventory: 2,
      onSale: true,
      selectedSize: null,
      selectedVariant: 0,
      variants: [{ color: 'blue', url: './assets/liam.png', id: 1 }, { color: 'green', url: './assets/a-simple-bowl-cut.jpg', id: 2 }],
      sizes: [
        {
          number: 5,
          quantity: 2
        },
        {
          number: 6,
          quantity: 3
        },
        {
          number: 7,
          quantity: 3
        },
        {
          number: 8,
          quantity: 0
        },
        {
          number: 9,
          quantity: 3
        },
        {
          number: 10,
          quantity: 7
        },
        {
          number: 11,
          quantity: 3
        },
        {
          number: 12,
          quantity: 0
        }
      ], 
      reviews: []
    }
  },
  methods: {
    selectSize(newSize) {
      this.selectedSize = newSize
    },
    changeImage(index) {
      this.selectedVariant = index
    }, 
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    addReview(productReview) {
      this.reviews.push(productReview)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.products[0]
    },
    image() {
      return this.variants[this.selectedVariant].url
    }
  }
})

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
  `,
  data() {
    return {
      name: null, 
      review: null,
      rating: null
    }
  }, 
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name, 
        review: this.review, 
        rating: this.rating
      }
      this.$emit('review-submitted', productReview)
      this.name = null;
      this.review = null;
      this.rating = null;
    }
  }
})

var app = new Vue({
  el: '#app', 
  data: {
    premium: true, 
    cart: []
  }, 
  methods: {
    updateCart(id) {
      this.cart.push(id)
    }
  }
})