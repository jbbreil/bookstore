<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Bok
        <b-link href="#/">(Bok Lista)</b-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Ange ISBN">
          <b-form-input id="isbn" :state="state" v-model.trim="book.isbn"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Ange Titel">
          <b-form-input id="title" :state="state" v-model.trim="book.title"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Ange Författare">
          <b-form-input id="author" :state="state" v-model.trim="book.author"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Ange Beskrivning">
            <b-form-textarea id="description"
                       v-model="book.description"
                       placeholder="Skriv nånting"
                       :rows="2"
                       :max-rows="6">{{book.description}}</b-form-textarea>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Ange Utgivare">
          <b-form-input id="publisher" :state="state" v-model.trim="book.publisher"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Ange URL">
          <b-form-input id="url" :state="state" v-model.trim="book.url"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Spara</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'CreateBook',
  data () {
    return {
      book: {}
    }
  },
  methods: {
    //händelsehanterare
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:5000/book`, this.book)
      .then(response => {
        this.$router.push({
          name: 'BookList',//navigeringsväg
          params: { id: response.data._id }//obejkt id
        })
      })
      .catch(error => {
        console.log(error)
    })
    }
  },
}
</script>