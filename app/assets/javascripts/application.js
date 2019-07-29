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
//= require index
//= require star-rating.min
//= require_self
$(document).ready(() => {
  function time_in_words(time){
    const SEC = 1;
    const MIN = 60 * SEC;
    const HOUR = 60 * MIN;
    const DAY = 24 * HOUR;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;
    let today = new Date().getTime()/1000;
    time = new Date(time).getTime()/1000;
    let duration = today - time;
    switch (duration) {
      case (time <= SEC):
        return "now";
      case (time > SEC && time <= MIN):
        return "a min ago"
      case (time > MIN && time <= HOUR):
        return `${parseInt(time/MIN)} mins ago`;
      case (time > HOUR && time <= DAY):
        return `${parseInt(time/HOUR)} hours ago`;
      case (time > DAY && time <= MONTH):
        return `${parseInt(time/DAY)} days ago`;
      case (time > MONTH && time <= YEAR):
        return `${parseInt(time/MONTH)} months ago`;
      default: return `${parseInt(time/YEAR)} years ago`;
    }
  }
  Vue.component('star-rating', VueStarRating.default);
  // import VueContext from "vue-context-menu.min"
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
