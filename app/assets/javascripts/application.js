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
//= require_tree .
$(document).ready(f => {
  Vue.component('star-rating', VueStarRating.default);
  new Vue({
    el: '#home_element',
    data: {
      rating: 3,
      photos:[]
    },
    methods: {
      setRating: function(rating, index){
        let self = this;
        let photo_id = self.photos[index].id;
        rating = Math.ceil(rating)
        self.photos[index].loading = true;
        $.post("/vote", {photo_id, rating}).done(function(respone){
          self.photos[index].photo_score = parseInt(respone)
          self.photos[index].loading = false;
          console.log(respone)
        }).error(er=>{
          console.log(er)
        })
      },
      comment: function (index) {
        let self = this;
        let photo_id = self.photos[index].id;
        let content = self.photos[index].comment_content;
        self.photos[index].comment_content = "";
        console.log("u just have comment", content);
        $.post("/comments", {comment:{photo_id, content}}).done(function (response) {
          if (response.code == 1){
            self.photos[index].comments.push({content: content})
          }else {
            alert(response.message)
          }
        }).error(err=>{
          console.log(err)
        })
      }
    },
    computed:{
      photos_get:function (){
        let self = this;
        $.get("/photos").done(respose=>{
          self.photos = respose.map(f=>{
            f.loading = false;
            f.comment_content = "";
            return f
          })
        }).error(er=>{

        })
      }
    },

  });
})
