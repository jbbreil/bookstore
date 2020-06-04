<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Redigera Bok
        <b-link href="#/">(Bok Lista)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{book.title}}
        </template>
        <template slot="lead">
        <b>ISBN: </b>{{book.isbn}}<br>
        <b>Författare: </b>{{book.author}}<br>
        <b>Beskrivning: </b>{{book.description}}<br>
        <b>Utgivare: </b>{{book.publisher}}<br>
        <b>Boken källa: </b><b-link :href="book.url" target="_blank">Länk till källan</b-link><br> 
        </template>

        <b-btn variant="success" @click.stop="editbook(book._id)">Redigera</b-btn>
        <b-btn variant="danger" @click.stop="deletebook(book._id)">Radera</b-btn>
   
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ShowBook',
  data () {
    return {
      book: [],
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
    editbook (bookid) {
      this.$router.push({
        name: 'EditBook',
        params: { id: bookid }
      })
    },
    deletebook (bookid) {
      axios.delete('http://localhost:5000/book/' + bookid)
      .then((result) => {
        this.$router.push({
          name: 'BookList'
        })
      })
      .catch(error => {
        console.log(error)
    })
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
  .btn-danger {
    margin-left: .5em;
  }
  .lead {
    padding: 20px 0 20px 0;
  }
  .jumbotron h1 {
      font-size: 3.5rem;
  }
</style>