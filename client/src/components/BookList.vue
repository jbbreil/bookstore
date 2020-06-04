<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Bok Lista
        <b-link href="#/add-book">(Add Bok)</b-link>
      </h2>
      <!--<b-alert variant="success" show dismissible fade>Uppdatering lyckades!</b-alert>
      <b-alert variant="success" show dismissible fade>Boken har skapats!</b-alert>
      <b-alert variant="danger" show dismissible fade>Ops!</b-alert>-->

        <b-table striped hover :items="books" :fields="fields">
        <template v-slot:cell(actions)="{ detailsShowing, item }" >
        <b-btn @click="toggleDetails(item)">{{ detailsShowing ? 'Hide' : 'Visa'}} info</b-btn>
        </template>
          <!--<template v-slot:row-details="{ item }">
          <b-card>
            {{ item.secret }}
          </b-card>
          </template>-->
      </b-table>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'BookList',
  data () {
    return {

fields: [
          {
            key: 'isbn',
            label: 'ISBN',
            sortable: true,
          },
          {
            key: 'title',
            label: 'Titel',
            sortable: true,
          },
          {
            key: 'actions',
            label: 'Fullständiga information',
            variant: 'primary'
          }
        ],
        books: [],
        //errors: [],
    }
  },
    created () {
    axios.get(`http://localhost:5000/book`)
    .then(response => {
      this.books = response.data
    })
    .catch(error => {
        console.log(error)
    })
  },
  
  methods: {
    toggleDetails (book) {
      this.$router.push({
        name: 'ShowBook',
        params: { id: book._id }
      })
    }
  }
}
</script>