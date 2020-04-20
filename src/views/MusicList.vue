<template>
  <v-card max-width="700" class="mx-auto">
    <span class="tui">推荐歌单</span>
    <v-container class="pa-1">
      <v-item-group v-model="selected" multiple>
        <v-row>
          <v-col v-for="(item, i) in items" :key="i" cols="12" md="6">
            <v-img :src="item.src" height="200px"></v-img>

            <v-card-title>{{ item.title }}</v-card-title>

            <v-card-actions>
              <v-btn text>Share</v-btn>

              <v-btn color="purple" text>Explore</v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="item.show = !item.show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="item.show">
                <v-divider></v-divider>

                <v-card-text>{{ item.content }}</v-card-text>
              </div>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'MusicList',
  data: () => ({
    items: [
      {
        src: 'https://kkkksslls.oss-cn-beijing.aliyuncs.com/avatar/20200315185035.png',
        title: '一个双鱼座男孩的歌单',
        show: false,
        content: '星河滚烫，你是人间理想.皓月清凉，你是人间曙光.'
      },
      {
        src: 'https://kkkksslls.oss-cn-beijing.aliyuncs.com/avatar/20200420202118.png',
        title: '我听见海浪和我的孤单',
        show: false,
        content:
          '是否有这样一个夜晚，我和你依偎在海边，听着夹着沙子的风，指缝里是蓝色的海浪。你的头发被吹到蓬松。我们一起研究着月亮潮汐，祈祷天这样一直暗下去，不要亮起。有没有这么一个夜晚，哪怕是梦里面。'
      },
      {
        src: 'https://kkkksslls.oss-cn-beijing.aliyuncs.com/avatar/20200420202138.png',
        title: '那些神仙声音',
        show: false,
        content: '你信不信一定会有一个人离开会让你很多年都不碰感情也不变渣两袖清风希望你听不懂也不会经历.'
      },
      {
        src: 'https://kkkksslls.oss-cn-beijing.aliyuncs.com/avatar/20200420202237.png',
        title: '你会爱上这个流行华语歌单',
        show: false,
        content: '要多深情,才能唱进你心里循环那些好听的华语情歌你会爱上这个流行华语歌单'
      }
    ],
    selected: []
  })
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
</style>
