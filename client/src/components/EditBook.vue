<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Redigera Bok
        <router-link :to="{ name: 'ShowBook', params: { id: book._id } }">(Visa Bok)</router-link>
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
        <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'EditBook',
  data () {
    return {
      book: {},
    }
  },
  created () {
    axios.get(`http://localhost:5000/book/` + this.$route.params.id)
    .then(response => {
      this.book = response.data
    })
    .catch(error => {
        console.log(error)
    })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.patch(`http://localhost:5000/book/` + this.$route.params.id, this.book)
      .then(response => {
        this.$router.push({
          name: 'BookList',
          params: { id: this.$route.params.id }
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>