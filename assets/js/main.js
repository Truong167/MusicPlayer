/** 
 *  1. Render songs
    2. Scroll top
    3. Play/ pause / seek
    4. CD rotate
    5. Next/ Prev
    6. Random
    7. Next/ Repeat when ended
    8. Active song
    9. Scroll active song into view
    10. Play song when click
*/  
  
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

    const app = {
      currentIndex: 0,
      isPlaying: false,
      isRandom: false,
      isRepeat: false,
        songs: [
        {
          name: "Có như không có",
          singer: "Trần Phương Anh",
          path: "./assets/radio/cnkc.mp3",
          image: "./assets/img/Panh2.jpg"
        },
        {
          name: "Phai dấu cuộc tình",
          singer: "Trần Phương Anh",
          path: "./assets/radio/pdct.mp3",
          image:"./assets/img/Panh3.jpg"
        },
        {
          name: "Đừng như thói quen",
          singer: "Trần Phương Anh",
          path:"./assets/radio/dntq.mp3",
          image: "./assets/img/Panh35.jpeg"
        },
        {
          name: "Đường 1 chiều",
          singer: "Trần Phương Anh",
          path: "./assets/radio/d1c.mp3",
          image:"./assets/img/Panh60.jpeg"
        },
        {
          name: "Gió vẫn hát",
          singer: "Trần Phương Anh",
          path: "./assets/radio/gvh.mp3",
          image:"./assets/img/Panh4.jpg"
        },
        {
          name: "Nơi mình dừng chân",
          singer: "Trần Phương Anh",
          path:"./assets/radio/nmdc.mp3",
          image:"./assets/img/Panh9.jpg"
        },
        {
          name: "Đau để trưởng thành",
          singer: "Trần Phương Anh",
          path: "./assets/radio/ddtt.mp3",
          image:"./assets/img/Panh61.jpeg"
        },
        {
          name: "Chỉ là không cùng nhau",
          singer: "Trần Phương Anh",
          path:"./assets/radio/clkcn.mp3",
          image:"./assets/img/Panh67.jpeg"
        },
        {
          name: "Đi rồi mới thương",
          singer: "Trần Phương Anh",
          path:"./assets/radio/drmt.mp3",
          image:"./assets/img/Panh731.jpeg"
        },
        {
          name: "Đừng ai nhắc",
          singer: "Trần Phương Anh",
          path:"./assets/radio/dan.mp3",
          image:"./assets/img/Panh75.jpeg"
        },
        {
          name: "Đúng cũng thành sai",
          singer: "Trần Phương Anh",
          path:"./assets/radio/dcts.mp3",
          image:"./assets/img/Panh161.jpg"
        },
        {
          name: "Một chút",
          singer: "Trần Phương Anh",
          path:"./assets/radio/mc.mp3",
          image:"./assets/img/Panh741.jpeg"
        },
        {
          name: "Hẹn tháng 5",
          singer: "Trần Phương Anh",
          path:"./assets/radio/ht5.mp3",
          image:"./assets/img/Panh801.jpeg"
        },
        {
          name: "Quen với cô đơn",
          singer: "Trần Phương Anh",
          path:"./assets/radio/qvcd.mp3",
          image:"./assets/img/Panh691.jpeg"
        },
        {
          name: "Tự nhiên buồn",
          singer: "Trần Phương Anh",
          path:"./assets/radio/tnb.mp3",
          image:"./assets/img/Panh811.jpeg"
        },
      ],

        render: function(){
            const htmls = this.songs.map((song, index) => {
              return `
              <div class="song ${index===this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                </div>
              </div>
              `
            })
            playlist.innerHTML = htmls.join('');
        },
        defineProperties: function(){
            Object.defineProperty(this,'currentSong',{
              get: function(){
                return this.songs[this.currentIndex];
              }
            })

        },
        HandleEvents: function (){
            const _this = this;
            const cdWidth = cd.offsetWidth;

            // Xử lý animation
            const cdRotate = cdThumb.animate ([
              { transform: 'rotate(360deg)'}
            ], {
                duration: 10000,
                iterations: Infinity
            });
            cdRotate.pause();

            // xử lý phóng to/ thu nhỏ
            document.onscroll = function() {
                const newCdWidth = cdWidth - scrollY;
                cd.style.width = newCdWidth > 0 ? newCdWidth +'px' : 0;
                cd.style.opacity = newCdWidth / cdWidth;
            };

            // xử lý khi click play
            playBtn.onclick = function(){
              console.log(_this.isPlaying)
              if(_this.isPlaying){
                  audio.pause();
              }else{
                  audio.play();
              }
            };
              //Khi song được play
              audio.onplay = function(){
                  _this.isPlaying = true;
                player.classList.add('playing') ;
                cdRotate.play();
              };
              //Khi song bị pause
              audio.onpause = function() {
                _this.isPlaying = false;
                player.classList.remove('playing');
                cdRotate.pause();
              };
              //Khi tiến độ bị thay đổi
              audio.ontimeupdate = function() {
                if(audio.duration){
                  const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                  progress.value = progressPercent;
                }
                
              };

              // Xử lý khi tua  
              progress.onchange = function(e) {
                const seekTime = audio.duration / 100 * e.target.value;
                audio.currentTime = seekTime;
              };

            //Khi next song
            nextBtn.onclick = function(){
              if(_this.isRandom){
                _this.playRandomSong();
              }else{
                _this.nextSong();
              }
              audio.play();
              _this.render();
              _this.scrollToActiveSong();
            };
            //khi pre song
            prevBtn.onclick = function(){
              if(_this.isRandom){
                _this.playRandomSong();
              }else{
                _this.prevSong();
              }
              audio.play();
              _this.render();
              _this.scrollToActiveSong();
            };

            //Xử lý random
            randomBtn.onclick = function() {
              _this.isRandom = !_this.isRandom;
              randomBtn.classList.toggle('active', _this.isRandom);
            };
            // Xử lý lặp lại bài hát 
            repeatBtn.onclick = function(){
              _this.isRepeat = !_this.isRandom;
              repeatBtn.classList.toggle('active', _this.isRepeat)
            };
            //Xử lý khi next song khi ended
            audio.onended = function() {
              if(_this.isRepeat){
                audio.play();
              }else{
                nextBtn.click();
              }
              
            };
            playlist.onclick = function(e){
              const songNode = e.target.closest('.song:not(.active)');
                if(songNode || e.target.closest('.option')){
                  if(songNode){
                      _this.currentIndex = Number(songNode.dataset.index);
                      _this.loadCurrentSong();
                      _this.render();
                      audio.play();
                  }
                }
            };

            
        },
        scrollToActiveSong: function() {
              setTimeout(function(){
                $('.song.active').scrollIntoView({
                  behaviour: 'smooth',
                  block: 'nearest',
                });
              },400)
        },
        loadCurrentSong: function(){
            heading.textContent = this.currentSong.name;
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
            audio.src = this.currentSong.path;
        },
        nextSong: function() {
          this.currentIndex++;
          if(this.currentIndex >= this.songs.length){
              this.currentIndex = 0;
          }
          this.loadCurrentSong();
        },
        prevSong: function() {
          this.currentIndex--;
          if(this.currentIndex < 0){
              this.currentIndex = this.songs.length -1;
          }
          this.loadCurrentSong();
        },
        playRandomSong: function(){
          let newIndex;
          do{
            newIndex = Math.floor(Math.random()*this.songs.length);
          }while(newIndex === this.currentIndex);
          this.currentIndex = newIndex;
          this.loadCurrentSong();
        },

        start: function(){
          //Định nghĩa các thuộc tính cho Object
            this.defineProperties();
          //Lắng nghe /xử lý sự kiện
            this.HandleEvents();
          //Tải thông tin bài hát đầu tiên
            this.loadCurrentSong();
            
          //Playlist
            this.render();
        }

}

app.start();