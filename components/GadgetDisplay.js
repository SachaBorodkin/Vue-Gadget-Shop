app.component("gadget-display", {
    props: ["gadget"], // 
    template:
    /*html*/`
    <div class="gadget">
        <img v-bind:src="gadget.image" alt="Gadget">
        <h2>{{ gadget.name }}</h2>
        <p>Prix : {{ gadget.prix }}UAH</p>
        <p :class="{'in-stock': gadget.inStock, 'out-of-stock': !gadget.inStock}">
            {{ gadget.inStock ? '✅ En stock' : '❌ En rupture de stock' }}
        </p>
        <button @click="addToCart" :disabled="!gadget.inStock">Ajouter au panier</button>
        <div class="reviews-container">
            <h3>Avis :</h3>
            <ul v-if="gadget.reviews.length">
                <li v-for="(review, index) in gadget.reviews" :key="index">
                    <strong>{{ review.name }}</strong> - {{ review.rating }}☆
                    <p>"{{ review.comment }}"</p>
                </li>
            </ul>
            <p v-else>Aucun avis pour ce produit.</p> </div>

        <review-form @add-review="saveReview"></review-form>
    </div>
    `,
    methods: {
        addToCart() {
 
            this.$emit("add-to-cart", this.gadget); 
        },
        addReview(review) {
            // Send the review and gadget ID to the main app
            this.$emit('add-review', { gadget: this.gadget, review: review });
        }
    }
});