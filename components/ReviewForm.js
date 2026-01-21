app.component('review-form', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <label for="name">Nom</label>
      <input id="name" v-model="name"> <label for="rating">Note</label>
      <select id="rating" v-model.number="rating"> <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
      </select>

      <label for="review">Commentaire :</label>
      <textarea id="review" v-model="review"></textarea> <button type="submit" value="Envoyer l'avis">Envoyer l'avis</button>  </form>`,
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