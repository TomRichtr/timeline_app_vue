<template>
  <div>
    <div class="main-container">
      <div class="timeline-container">
        <div
          class="event-container"
          :id="event._id"
          :key="event._id"
          v-for="event in timeline"
        >
          <font-awesome-icon
            :style="{ color: randomizeColor() }"
            class="cicle"
            :icon="['fa', 'circle']"
            size="lg"
          />
          <div class="line"></div>
          <div class="event-container-segment">
            <h6 class="titles">Registered:</h6>
            <h5 class="text">{{ convertDate(event.registered) }}</h5>
            <h6 class="text">{{ convertTime(event.registered) }}</h6>
          </div>

          <div class="event-container-segment name">
            <h6 class="titles ">Name:</h6>
            <p class="text">{{ event.name.first }} {{ event.name.last }}</p>
          </div>

          <div class="event-container-segment">
            <h6 class="titles">About:</h6>
            <p class="text">{{ event.about }}</p>
          </div>

          <div class="event-container-segment ">
            <h6 class="titles">Tags:</h6>
            <span
              class="event-container-line text"
              :id="event._id"
              :key="tag"
              v-for="(tag, index) in event.tags"
            >
              {{ adjustTag(tag, index, event.tags) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timeline_json from "../assets/timeline.json";
import moment from "moment";

export default {
  data() {
    return { timelineJson: timeline_json };
  },
  computed: {
    timeline() {
      return this.$store.getters.timelineGetter;
    },
  },
  created() {
    this.$store.dispatch("setTimeline", this.timelineJson);
  },
  methods: {
    convertDate(date) {
      return moment(date).format("Do MMM YYYY");
    },
    convertTime(date) {
      const ampm = date.split(" ")[5];
      const time = date.split(" ")[4];
      const hours = parseInt(time.split(":")[0]);
      const minutes = time.split(":")[1];

      if (ampm === "PM") {
        return 12 + hours + ":" + (minutes === 0 ? "00" : minutes);
      } else {
        return (
          (hours.toString().length === 1
            ? `0${hours}`
            : hours === 12
            ? "00"
            : hours) +
          ":" +
          (minutes === 0 ? "00" : minutes)
        );
      }
    },
    adjustTag(tag, index, tags) {
      if (index === tags.length - 1) {
        return tag;
      } else {
        return tag + ",";
      }
    },
    randomizeColor() {
      return this.$randomColor();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";

.cicle {
  position: relative;
  display: block;
  top: 92px;
  right: 2px;
}

.line {
  border-bottom: solid 1px $color2;
  position: absolute;
  top: 131.5px;
  left: 30px;
  width: 99%;
  z-index: -1;
}
.text {
  text-align: justify;
  font-family: "Baloo Da 2", cursive;
}
.event-container {
  margin: $m-size;
  width: 100vw;
  height: 100vh;
}
.timeline-container {
  display: flex;
  flex-direction: row;
  width: 1000%;
  transform: rotate(90deg) translateY(-100vh);
  transform-origin: top left;
}
.main-container {
  width: 100vh;
  height: 100vw;
  transform: rotate(-90deg) translateX(-100vh);
  transform-origin: top left;
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: $color1;
  color: darken($color: $color1, $amount: 60%);
}
::-webkit-scrollbar {
  display: none;
}
.name {
  margin-top: $s-size;
  padding-top: $s-size;
}
.titles {
  font-size: $xs-size;
  font-weight: bold;
  margin: 0px;
  font-family: "Kufam", cursive;
}
</style>
