<template>
  <div style="padding-top:10px;">
    <span v-for="(item, index) in menus" :key="index" class="gutter">
      <mu-button :color="item.icon">{{ item.title }}</mu-button>
    </span>
    <v-card>
      <v-card-title>
        Nutrition
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          @keyup.enter="cha()"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Music',
  data() {
    return {
      menus: [],
      search: '',
      headers: [
        {
          text: '歌曲',
          align: 'start',
          sortable: false,
          value: 'song_name'
        },
        { text: '歌手', value: 'singer' },
        { text: '喜欢数(w)', value: 'like_count' },
        { text: '评论数(w)', value: 'comment_count' },
        { text: '创建时间', value: 'create_time' },
        { text: '时长', value: 'duration' }
      ],
      desserts: []
    }
  },
  created() {
    let index = this.$route.query.index
    let index1 = this.$route.query.index1
    console.log(index, index1)
    this.menus = JSON.parse(localStorage.getItem('menuList'))[index].subMenus[index1].subMenus
    console.log(this.menus)
    this.axios.get(this.GLOBAL.baseUrl + '/song/list').then((res) => {
      this.desserts = res.data.data
      console.log(this.desserts)
    })
  },
  methods: {
    //模糊查询歌曲
    cha() {
      this.axios({
        method: 'get',
        url: this.GLOBAL.baseUrl + '/songList/select',
        // 问号带参，表单提交
        params: {
          field: this.search
        }
      }).then((res) => {
        this.desserts = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
