<template>
  <div>
    <div class="nav">
      <button @click="goOut" class="goOut">
        <svg-icon type="mdi" :path="path" style="color: white"></svg-icon>
      </button>

      <div class="search-box">
        <GMapAutocomplete placeholder="Search for a location" @place_changed="setPlace" style="font-size: medium"
          class="searchLocation">
        </GMapAutocomplete>
      </div>
      <div class="user">
        <p>{{ user }}</p>
      </div>
    </div>

    <GMapMap :center="coords" :zoom="10" map-type-id="terrain" style="width: 90vw; height: 90vh">
      <GMapMarker :key="markerDetails.id" :position="markerDetails.position" :clickable="true" :draggable="false"
        @click="openMarker(markerDetails.id)">
        <GMapInfoWindow v-if="locationDetails.address != ''" :closeclick="true" @closeclick="openMarker(null)"
          :opened="openedMarkerID === markerDetails.id" :options="{
        pixelOffset: {
          width: 10,
          height: 0
        },
        maxWidth: 320,
        maxHeight: 320
      }">
          <div class="location-details">
            <h3>Location Details</h3>
            <p>Address: {{ locationDetails.address }}</p>
          </div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiExitToApp } from '@mdi/js';

export default {
  name: 'MapView',
  data() {
    return {
      path: mdiExitToApp,
      user: localStorage.getItem('user')
    };
  },
  components: {
    SvgIcon
  },
  setup() {
    const coords = ref({ lat: 51.5072, lng: 0.1276 });
    const markerDetails = ref({
      id: 1,
      position: coords.value,
    });
    const openedMarkerID = ref(null);
    const locationDetails = ref({
      address: '',
      url: ''
    });
    const getUserLocation = () => {
      const isSupported = 'navigator' in window && 'geolocation' in navigator;
      if (isSupported) {
        navigator.geolocation.getCurrentPosition((position) => {
          coords.value.lat = position.coords.latitude;
          coords.value.lng = position.coords.longitude;
        });
      }
    };
    const setPlace = (place) => {
      coords.value.lat = place.geometry.location.lat();
      coords.value.lng = place.geometry.location.lng();
      locationDetails.value.address = place.formatted_address;
      locationDetails.value.url = place.url;
    };
    const openMarker = (id) => {
      openedMarkerID.value = id;
    };

    onMounted(() => {
      getUserLocation();
    });
    return {
      coords,
      markerDetails,
      openedMarkerID,
      openMarker,
      getUserLocation,
      setPlace,
      locationDetails
    };
  },
  methods: {
    goOut() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
};
</script>
<style scoped>
.search-box {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-box p {
  color: #fff;
}

.location-details {
  color: black;
  font-size: 15px;
  font-weight: 500;
  overflow: hidden;
}

.searchLocation {
  width: 12vw;
  height: 4vh;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.4);
}

.iconDiv {
  position: relative;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

p {
  font-size: 20px;
  color: #fff;
}

.goOut {
  background: none;
  border: none;
}
</style>
