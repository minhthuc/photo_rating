$(document).ready(function(){
  let home = new Vue({
    el: '#element',
    data: {
      photo: {},
      current_photo_id: 0,
      comment_content: ""
    },
    methods: {
      setRating: function (rating, index) {
        let self = this;
        let photo_id = current_photo_id;
        rating = Math.ceil(rating)
        self.photos[index].loading = true;
        $.post("/vote", {photo_id, rating}).done(function (respone) {
          self.photo.photo_score = parseInt(respone)
          self.photo.loading = false;
          console.log(respone)
        }).error(er => {
          console.log(er)
        })
      },
      comment: function () {
        let self = this;
        if (self.comment_content.length === 0){
          return self.$notify({
            title: "error",
            message: "nothing to comment"
          })
        }
        let photo_id = self.current_photo_id;
        let content = self.comment_content;
        $.post("/comments", {
          comment: {
            photo_id,
            content
          }
        }).done(function (response) {
          if (response.code == 1) {
            self.photo.comments.unshift({content: content, owned: true})
            self.comment_content = "";
            self.$notify({
              title: "success",
              message: "Commented"
            })
          } else {
            alert(response.message)
          }
        }).error(err => {
          console.log(err)
        })
      },
      photo_get: function () {
        return new Promise((resolve, reject)=>{
          $.get("/photo", {id: this.current_photo_id}).done(respose => {
            respose.loading = false;
            return resolve(respose);
          }).error(er => {
            console.log(er)
            return reject(er)
          })
        })
      },
      get_current_photo_id: function () {
        let current_url = window.location.href;
        let url_splited = current_url.split("/");
        let leng = url_splited.length;
        let photoId = url_splited[leng - 1];
        try {
          photoId = parseInt(photoId);
          this.current_photo_id = photoId;
          return photoId
        } catch (e) {
          this.$notify({
              title: "Error",
              message: "Can not find that photo",
              duration: 0
            }
          )
          return 0
        }
      }
    },
    computed: {},
    async mounted() {
      this.current_photo_id = this.get_current_photo_id();
      this.photo = await this.photo_get();
    }
  });
})
;
