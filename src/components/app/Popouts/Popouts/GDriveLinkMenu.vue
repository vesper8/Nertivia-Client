<template>
  <div class="dark-background" @click="backgroundClick">
    <div class="inner">
      <div
        class="text"
      >To upload files, images or set avatars, You must link your Google Drive account with your Nertivia account.</div>
      <div class="images">
        <div class="image GDrive-img"></div>
        <div class="arrow">></div>
        <div class="image nertivia-img"></div>
      </div>
      <div class="text">If you would like to see Nertivia grow, and have its own storage CDN, donations would be appriciated.</div>
      <div class="buttons">
        <div class="button donate" @click="donateButton">Donate</div>
        <div class="button deny" @click="closeMenu">No thanks</div>
        <div class="button" @click="link">Link me</div>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "@/main";
import settingsService from "@/services/settingsService";

export default {
  methods: {
    closeMenu() {
      this.$store.dispatch("setPopoutVisibility", {
        name: "GDLinkMenu",
        visibility: false
      });
    },
    backgroundClick(e) {
      if (e.target.classList.contains("dark-background")) {
        this.closeMenu();
      }
    },
    async link() {
      const { ok, error, result } = await settingsService.GDriveURL();
      if (ok) {
        const { url } = result.data;
        //open a new window
        const left = screen.width / 2 - 400 / 2;
        const top = screen.height / 2 - 500 / 2;
        const consentWindow = window.open(
          url,
          "",
          "width=400,height=500,top=" + top + ", left=" + left
        );
        window.onmessage = async e => {
          consentWindow.close();
          if (!e.data.code) return;
          const url = new URL(e.data.code);
          const code = url.searchParams.get("code");
          await settingsService.GDriveAuth(code);
        };
      }
    },
    donateButton() {
      window.open('https://www.patreon.com/nertivia', '_blank');
    }
  }
};
</script>


<style scoped>
.dark-background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.781);
  z-index: 111111;
  display: flex;
}
.inner {
  margin: auto;
  height: 400px;
  width: 400px;
  background: rgb(32, 32, 32);
  display: flex;
  flex-direction: column;
  color: white;
  border-radius: 3px;
}
.text {
  color: white;
  text-align: center;
  margin-top: 30px;
  font-size: 17px;
  padding-left: 10px;
  padding-right: 10px;
  user-select: none;
}

.images {
  display: flex;
  margin: auto;
  margin-top: 40px;
}
.image {
  width: 120px;
  height: 120px;
  background-position: center;
  background-size: 100%;
	}
.nertivia-img {
  background-image: url(./../../../../assets/logo.png);
  border-radius: 50%;
  background-size: calc(100% + 34px);
  box-shadow: 0px 0px 66px -4px rgba(69, 212, 255, 1);
}
.arrow {
  font-size: 40px;
  margin: auto;
  padding: 20px;
  user-select: none;
}
.GDrive-img {
  background-image: url(./../../../../assets/Google_Drive_logo.png);
}
.buttons {
  margin: auto;
  display: flex;
}
.button {
  display: inline-block;
  margin: auto;
  background: rgb(32, 118, 255);
  padding: 10px;
  border-radius: 2px;
  cursor: default;
  user-select: none;
  transition: 0.3s;
  margin-left: 10px;
  margin-right: 10px;
}
.donate {
  background: rgb(218, 179, 6);
}

.button:hover {
  background: rgb(58, 134, 255);
}
.donate:hover {
  background: rgb(199, 164, 6);
}
.button.deny {
  background: rgb(255, 32, 32);
}
.button.deny:hover {
  background: rgb(255, 53, 53);
}
</style>

