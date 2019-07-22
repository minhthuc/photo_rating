$(document).ready(f => {
  let home = new Vue({
    el: '#home_element',
    data: {
      rating: 3,
      photos: []
    },
    methods: {
      setRating: function (rating, index) {
        let self = this;
        let photo_id = self.photos[index].id;
        rating = Math.ceil(rating)
        self.photos[index].loading = true;
        $.post("/vote", {photo_id, rating}).done(function (respone) {
          self.photos[index].photo_score = parseInt(respone)
          self.photos[index].loading = false;
          console.log(respone)
        }).error(er => {
          console.log(er)
        })
      },
      comment: function (index) {
        let self = this;
        let photo_id = self.photos[index].id;
        let content = self.photos[index].comment_content;
        self.photos[index].comment_content = "";
        $.post("/comments", {
          comment: {
            photo_id,
            content
          }
        }).done(function (response) {
          if (response.code == 1) {
            self.photos[index].comments.push({content: content})
          } else {
            alert(response.message)
          }
        }).error(err => {
          console.log(err)
        })
      },
      photos_get: function (query, pages, limit) {
        let self = this;
        if (!pages) pages = 0;
        if (!limit) limit = 6;
        if (!query) query = null;
        $.get("/photos", {photos: {pages, limit, query}}).done(respose => {
          self.photos = respose.map(f => {
            f.loading = false;
            f.comment_content = "";
            return f
          })
        }).error(er => {

        })
      }

    },
    computed: {},
    mounted() {
      this.photos = this.photos_get()
    }
  });
})
;
