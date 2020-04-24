<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="#43a047"
        dark
        shrink-on-scroll
        prominent
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-5"
        scroll-threshold="500"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"></v-img>
        </template>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>云音乐后台</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon @click="logout()">mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="600">
        <v-container style="height: 1px;"></v-container>
      </v-sheet>
    </v-card>
    <v-container class="box">
      <v-row>
        <v-col cols="3">
          <v-container>
            <v-card min-height="500" class="overflow-hidden">
              <v-navigation-drawer
                v-model="drawer"
                :color="color"
                :expand-on-hover="expandOnHover"
                :mini-variant="miniVariant"
                :right="right"
                :src="bg"
                absolute
                dark
              >
                <v-list dense nav class="py-0">
                  <v-list-item two-line :class="miniVariant && 'px-0'">
                    <router-link to="/profile">
                      <v-list-item-avatar>
                        <img :src="admin.avatar" />
                      </v-list-item-avatar>
                    </router-link>

                    <v-list-item-content>
                      <v-list-item-title>
                        <h3 class="gutter">Cloud Music</h3>
                      </v-list-item-title>
                      <v-list-item-subtitle class="gutter">{{ admin.name }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list>
                    <v-list-group v-for="(item, index) in items" :key="index">
                      <template v-slot:activator v-if="item.type == 1">
                        <v-list-item-icon>
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content v-if="item.subMenus.length > 0">
                          <v-list-item-title class="link">{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content v-else>
                          <router-link :to="item.path">
                            <v-list-item-title class="link">{{ item.title }}</v-list-item-title>
                          </router-link>
                        </v-list-item-content>
                      </template>

                      <v-list-item v-for="(subItem, index1) in item.subMenus" :key="index1">
                        <v-list-item-icon style="margin-left:20px;">
                          <v-icon>{{ subItem.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="link" @click="gotoSubPage(subItem.path, index, index1)">{{
                            subItem.title
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-group>
                  </v-list>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </v-container>
        </v-col>
        <v-col cols="9">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      admin: JSON.parse(localStorage.getItem('admin')),
      drawer: true,
      items: [],
      color: 'primary',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: true
    }
  },
  components: {},
  created() {
    //取得前一个页面传过来的roleId
    let roleId = this.$route.query.roleId
    console.log(roleId)
    //携带roleId和token（全局拦截器已经设置）向后端请求菜单
    this.axios.get(this.GLOBAL.baseUrl + '/sysRole?roleId=' + roleId).then((res) => {
      this.$store.commit('setMenuList', JSON.stringify(res.data.data.menus))
      localStorage.setItem('menuList', JSON.stringify(res.data.data.menus))
      this.items = res.data.data.menus
    })
  },
  mounted() {},
  methods: {
    logout() {
      alert('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      localStorage.removeItem('menuList')
      this.$router.push('/login')
    },
    gotoSubPage(path, index, index1) {
      console.log(path, index, index1)
      this.$router.push({
        path: path,
        query: {
          index: index,
          index1: index1
        }
      })
    }
  },
  computed: {
    bg() {
      return this.background ? 'https://picsum.photos/1920/1080?random' : undefined
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  margin-top: 90px;
  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
