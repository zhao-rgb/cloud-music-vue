<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-card>
          <v-card-title class="cyan darken-1">
            <span class="headline white--text">About us</span>

            <v-spacer></v-spacer>

            <v-btn dark icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <v-btn dark icon>
              <v-icon @click="show = !show">mdi-pencil</v-icon>
            </v-btn>

            <v-btn dark icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>

          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-message-text</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>(备用)18851861839</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon>mdi-message-text</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-email</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>1019916061@qq.com</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-map-marker</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>WuXi,Jiangsu</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-img :src="avatar" height="200px" @click="handleClick()"></v-img>
          <input type="file" @change="changeAvatar($event)" style="display: none;" id="fileBox" />
        </v-card>
      </v-col>
    </v-row>
    <!--遮罩-->
    <div class="mask" v-if="show">
      <div class="dialog">
        <mu-container>
          <mu-form class="login-form">
            <mu-form-item label="用户名">
              <mu-text-field v-model="updateuser.newname"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="密码" prop="password">
              <mu-text-field type="password" v-model="updateuser.password"></mu-text-field>
            </mu-form-item>
            <mu-form-item>
              <mu-button color="primary" @click="update()">重置</mu-button>
              <mu-button color="blue" class="right" @click="show = !show">Cancel</mu-button>
            </mu-form-item>
          </mu-form>
        </mu-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      admin: this.$store.state.admin,
      show: false,
      updateuser: {
        id: '',
        newname: '',
        password: ''
      }
    }
  },
  components: {},
  computed: {
    avatar: {
      get: function() {
        return this.$store.state.avatar
      },
      set: function(newValue) {
        this.$store.commit('setAvatar', newValue)
      }
    },
    name: {
      get: function() {
        return this.$store.state.name
      },
      set: function(newValue) {
        this.$store.commit('setName', newValue)
      }
    }
  },
  created() {
    this.axios.get(this.GLOBAL.baseUrl + '/sysAdmin/' + this.admin.id).then((res) => {
      this.$store.commit('setAvatar', res.data.data.avatar)
      console.log(res.data.data.name)
      this.$store.commit('setName', res.data.data.name)
    })
  },
  mounted() {},
  methods: {
    //点击头像，即模拟点击文件选择组件
    handleClick: function() {
      document.getElementById('fileBox').click()
    },
    changeAvatar: function() {
      var _this = this
      let formData = new FormData()
      alert(event.target.files[0].name)
      formData.append('file', event.target.files[0])
      this.$http({
        method: 'post',
        url: this.GLOBAL.baseUrl + '/sysAdmin/upload',
        params: {
          id: this.admin.id
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData,
        processData: false,
        contentType: false
      }).then((uploadFileRes) => {
        console.log(uploadFileRes.data.data)
        _this.avatar = uploadFileRes.data.data
        this.$store.commit('setAvatar', uploadFileRes.data.data)
      })
    },
    update() {
      this.updateuser.id = this.admin.id
      alert(this.admin.id)
      this.axios.post(this.GLOBAL.baseUrl + '/sysAdmin/profile', this.updateuser).then((res) => {
        console.log(res.data.data)
        this.$store.commit('setName', this.updateuser.newname)
      })
      this.show = !this.show
    }
  }
}
</script>
<style scoped lang="scss">
.bottom-gradient {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
.repeating-gradient {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 0, 0, 0.25),
    rgba(255, 0, 0, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 10px
  );
}
.mask {
  z-index: 900;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog {
    z-index: 1000;
    width: 400px;
    height: 300px;
    line-height: 100px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    padding-top: 50px;
    .right {
      position: absolute;
      top: 1px;
      left: 280px;
    }
  }
}
</style>
