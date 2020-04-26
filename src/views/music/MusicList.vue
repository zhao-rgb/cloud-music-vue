<template>
  <div>
    <!-- <span v-for="(item, index) in menus" :key="index" class="gutter">
      <mu-button :color="item.icon">{{ item.title }}</mu-button>
    </span>-->
    <span>
      <mu-button color="success" class="gutter">查询</mu-button>
      <mu-button color="warning" class="gutter" @click="operation()">导出</mu-button>
      <mu-button color="error" class="gutter">删除</mu-button>
    </span>
    <span>
      <mu-text-field v-model="keywords" placeholder="输入关键词搜索"></mu-text-field>
      <mu-button color="success" @click="search()">搜索</mu-button>
    </span>
    <template>
      <v-row justify="space-around">
        <v-col cols="12" sm="18" md="15" lg="30">
          <v-sheet elevation="10" class="pa-4" style="padding:15px">
            <h2 class="title mb-2">All Type</h2>
            <v-chip v-for="(type, index) in types" :key="index" :value="index" @click="showList(index)">{{ type.type }}</v-chip>
          </v-sheet>
        </v-col>
      </v-row>
    </template>
    <mu-row v-if="show">
      <mu-col span="4" v-for="(child, index) in types[typeId].child" :key="index">
        <div class="grid-cell">
          <template>
            <v-card class="mx-auto" max-width="400">
              <v-img class="white--text align-end" height="200px" :src="child.thumbnail"></v-img>

              <v-card-subtitle class="pb-0">{{ child.song_list_name }}</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>歌曲数：{{ child.song_count }}</div>
                <div>收藏数：{{ child.like_count }}</div>
                <div>创建时间：{{ child.create_time }}</div>
              </v-card-text>

              <v-card-actions>
                <mu-button flat color="primary">Enter</mu-button>
                <mu-button flat color="secondary">Explore</mu-button>
                <mu-button flat color="success">Delete</mu-button>
              </v-card-actions>
            </v-card>
          </template>
        </div>
      </mu-col>
    </mu-row>
    <mu-row v-else>
      <mu-col span="4" v-for="(item, index) in songList" :key="index">
        <div class="grid-cell">
          <template>
            <v-card class="mx-auto" max-width="400">
              <v-img class="white--text align-end" height="200px" :src="item.thumbnail"></v-img>

              <v-card-subtitle class="pb-0">{{ item.songListName }}</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>歌曲数：{{ item.songCount }}</div>
                <div>收藏数：{{ item.likeCount }}</div>
                <!-- <div>创建时间：{{ child.create_time }}</div> -->
              </v-card-text>

              <v-card-actions>
                <mu-button flat color="primary">Enter</mu-button>
                <mu-button flat color="secondary">Explore</mu-button>
                <mu-button flat color="success">Delete</mu-button>
              </v-card-actions>
            </v-card>
          </template>
        </div>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
export default {
  name: 'MusicList',
  data() {
    return {
      selected: [],
      menus: [],
      types: [],
      typeId: 0,
      songList: [],
      keywords: '',
      show: true
    }
  },
  created() {
    let index = this.$route.query.index
    let index1 = this.$route.query.index1
    this.menus = JSON.parse(localStorage.getItem('menuList'))[index].subMenus[index1].subMenus
    //获取所有歌曲
    this.axios.get(this.GLOBAL.baseUrl + '/songList/type').then((res) => {
      this.types = res.data.data
      console.log(this.types)
    })
  },
  methods: {
    showList(Id) {
      this.show = !this.show
      this.typeId = Id
    },
    //模糊查询歌单
    search() {
      this.axios({
        method: 'get',
        url: this.GLOBAL.baseUrl + '/songList/select',
        // 问号带参，表单提交
        params: {
          field: this.keywords
        }
      }).then((res) => {
        this.songList = res.data.data
      })
      this.show = !this.show
    }
    // operation() {
    //   alert(1)
    //   this.axios({
    //     method: 'get',
    //     url: this.GLOBAL.baseUrl + '/resources/songList',
    //     responseType: 'blob'
    //   }).then((res) => {
    //     //指定类型位excel表类型
    //     const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
    //     //创建a标签节点
    //     const download = document.createElement('a')
    //     //与获取验证码url方法一样
    //     const href = window.URL.createObjectURL(blob)
    //     //给超链接的href属性赋url值
    //     download.href = href
    //     //设置下载的文件名
    //     download.download = '歌单数据表.xls'
    //     //将a标签放在body中
    //     document.body.appendChild(download)
    //     //给a标签生成一个点击事件
    //     download.click()
    //     //移除a标签，为了下次点击时创建
    //     document.body.removeChild(download)
    //     //移除url
    //     window.URL.revokeObjectURL(href)
    //     alert(2)
    //   })
    // }
  }
}
</script>

<style scoped lang="scss">
.tui {
  color: #1a1a1a;
  font-size: 18px;
  line-height: 28px;
  max-height: 56px;
  font-weight: 600;
  margin-left: 5px;
}
.gutter {
  margin-right: 10px;
  margin-top: 13px;
}
</style>
