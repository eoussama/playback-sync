<script>
export default {
  data() {
    return {
      url: '',
      min: 0,
      max: 100,
      volume: 0.5,
      timeline: 0,
      playing: false,
      videos: [
        {
          id: 'video-1',
          title: 'Party! Hallelujah!',
          url: 'https://v.animethemes.moe/SKETDance-ED7.webm'
        },
        {
          id: 'video-2',
          title: 'Break the Blue!!',
          url: 'https://v.animethemes.moe/GirlyAirForce-OP1-NCBD1080.webm'
        }
      ]
    }
  },
  methods: {
    addVideo() {
      if (this.url) {
        this.videos.push({
          url: this.url,
          title: `Video ${this.videos.length + 1}`
        });
        this.url = '';
      }
    },
    runCmd(cmd) {
      for (const video of this.videos) {
        const videoPlayer = document.getElementById(video.id);
        cmd(videoPlayer);
      }
    },
    toggle() {
      this.playing = !this.playing;

      if (this.playing) {
        this.runCmd(e => e.play());
        this.runCmd(e => e.addEventListener('timeupdate', this.updateProgressBar));
      } else {
        this.runCmd(e => e.pause());
      }
    },
    seek(seconds) {
      this.runCmd(e => e.currentTime += seconds);
    },
    volumeChange() {
      this.runCmd(e => e.volume = this.volume);
    },
    updateProgressBar(e) {
      this.timeline = e.target.currentTime;
    },
    timelineChange(e) {
      this.runCmd(v => v.currentTime = e.target.value);
    }
  },
  updated() {
    this.min = 0;
    this.max = 90;
  }
}
</script>

<template>
  {{ max }}
  <div class="add">
    <input
      type="url"
      v-model="url"
    >

    <button @click="addVideo">Add video</button>
  </div>

  <hr>

  <div class="controls"></div>
  <div class="playback">
    <button @click="seek(-10)">-10</button>
    <button @click="toggle">{{ playing ? 'Pause' : 'Play' }}</button>
    <button @click="seek(10)">+10</button>
    <input
      type="range"
      min="0"
      max="1"
      step="0.05"
      v-model="volume"
      @input="volumeChange"
    >
  </div>
  <div class="range">
    <input
      :min="min"
      :max="max"
      v-model="timeline"
      type="range"
      @input="timelineChange"
    >
  </div>
  <hr>

  <div class="videos">
    <div
      class="video"
      v-for="video in videos"
    >
      <h3><a :href="video.url">{{ video.title }}</a></h3>
      <video
        controls
        width="320"
        preload="auto"
        :id="video.id"
        data-setup="{}"
      >
        <source :src="video.url">
      </video>
    </div>
  </div>
</template>

<style scoped>
.add,
.videos,
.controls {
  margin: 20px;
}

h3 {
  margin: 0;
  padding: 0;
}

.range input {
  width: 100%;
}
</style>