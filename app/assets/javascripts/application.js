// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require index
//= require star-rating.min

$(document).ready(() => {
  Vue.component('star-rating', VueStarRating.default);
  new Vue({
    el: '#app',
    data: {
      links: [],
      state1: '',
      state2: ''
    },
    methods: {
      querySearch(queryString, cb) {
        $.get("/photos", {photos: {query: queryString, options: "nc"}}).done(respose => {
          cb(respose.map(f => {
            f.loading = false;
            f.comment_content = "";
            return f
          }))
        }).error(er => {

        })
      },
      loadAll() {
        []
      },
      handleSelect(item) {
        window.location.replace('/photo/'+ item.id)
      }
    },
    mounted() {
      this.links = this.loadAll();
    }
  })
})
