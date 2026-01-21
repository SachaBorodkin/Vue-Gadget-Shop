const app = Vue.createApp({
    data() {
        return {
        name: "Vue Gadget Shop",
        description : "Décuovrez les derniers gadgets électroniques de haute technologie !",
        cart: [],
        gadgets: [
            {
                
                id : 0,
                nom: "YoptaMobile ONB",
                prix: 500,
                image: "./assets/phone.jpg",
                inStock: true,
                reviews: []
            },
             {
              
                id: 1,
                nom: "Laptop Super Puper Hui Pro Max",
                prix: 1500,
                image: "./assets/laptop.jpg",
                inStock: false,
                reviews: []
            },
            {
               
                id: 2,
                nom: "YoptaPods",
                prix: 200,
                image: "./assets/earbuds.jpg",
                inStock: true,
                reviews: []
            },
        ]
    }
    },
    computed:{

        cartTotal() {
            return this.cart.reduce((total, item) => total + (item.prix * item.quantity), 0);
        }, 
        discountedTotal() {
            if (this.cartTotal >= 1000) {
                return (this.cartTotal * 0.9).toFixed(2);
            }
            return this.cartTotal;
        }
    },
    methods:{
addToCart(gadget) {
   const item = this.cart.find(i => i.id === gadget.id);
            if (item) {
                item.quantity++; 
            } else {
                this.cart.push({ ...gadget, quantity: 1 });
            }
            
        }, 
        updateQuantity(index, change) {
            this.cart[index].quantity += change;
            // Remove product if quantity reaches 0 [cite: 274, 366]
            if (this.cart[index].quantity <= 0) {
                this.removeFromCart(index);
            }
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
        },
        addReview(payload) {
            const gadget = this.gadgets.find(g => g.id === payload.gadget.id);
            if (gadget) {
                gadget.reviews.push(payload.review);
            }
        }
    }
   
  })
  

