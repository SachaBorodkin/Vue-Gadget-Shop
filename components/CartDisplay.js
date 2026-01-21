app.component("cart-display", {
    props: {
        cart: { type: Array, required: true },
        cartTotal: { type: Number, required: true },
        discountedTotal: { required: true }
    },
    template: 
    /*html*/`
    <div class="cart">
       <h2>🛒 Mon Panier ({{ cart.length }})</h2>
        <ul v-if="cart.length > 0">
            <li v-for="(item, index) in cart" :key="item.id">
                {{ item.nom }} - {{ item.prix }}UAH
                <div class="quantity-controls">
                    <button @click="changeQty(index, -1)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="changeQty(index, 1)">+</button>
                    <button class="remove-btn" @click="$emit('remove-from-cart', index)">❌</button>
                </div>
            </li>
        </ul>
        <p v-else>Votre panier est vide.</p>

        <h3 v-if="cart.length > 0">
            💰 Total : 
            <span v-if="cartTotal < 1000">{{ cartTotal }}UAH</span>
            <span v-else>
                <s>{{ cartTotal }}UAH</s> ➝ 
                <strong>{{ discountedTotal }}UAH (-10%)</strong>
            </span>
        </h3>
    </div>
    `,
    methods: {
        removeItem(index) {
            // Emit an event to the parent to handle the data change [cite: 248]
            this.$emit("remove-from-cart", index);
        },
        changeQty(index, change) {
            // Inform parent to update the quantity [cite: 375]
            this.$emit('update-quantity', index, change);
        }
    }
});