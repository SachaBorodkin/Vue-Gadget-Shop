app.component('review-form', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
  <label for="name">Votre nom :</label>
  <input id="name" v-model="name" placeholder=""> 
  
  <label for="rating">Note :</label>
  <select id="rating" v-model.number="rating">
    <option value="5">5 ☆ - Excellent</option>
    <option value="4">4 ☆ - Très bien</option>
    <option value="3">3 ☆ - Moyen</option>
    <option value="2">2 ☆ - Médiocre</option>
    <option value="1">1 ☆ - Mauvais</option>
  </select>

  <label for="review">Commentaire :</label>
  <textarea id="review" v-model="review" rows="4"></textarea> 
  
  <button type="submit">Envoyer l'avis</button>  
</form>`,
  data() {
    return { name: '', review: '', rating: null }
  },
  methods: {
    onSubmit() {
      let productReview = { name: this.name, review: this.review, rating: this.rating };
      this.$emit('add-review', productReview); // [cite: 85]
      this.name = ''; this.review = ''; this.rating = null;
    }
  }
})