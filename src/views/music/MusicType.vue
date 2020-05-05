<template>
  <div>
    <h3>歌曲类型管理</h3>
    <span v-for="(item, index) in menus" :key="index" class="gutter">
      <mu-button :color="item.icon">{{ item.title }}</mu-button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'MusicType',
  data() {
    return {
      menus: [],
      menuList: this.$store.state.menuList
    }
  },
  created() {
    console.log(this.$options.name)
    for (let i = 0; i < this.menuList.length; i++) {
      let parent = this.menuList[i]
      console.log(parent)
      for (let j = 0; j < parent.subMenus.length; j++) {
        let child = this.menuList[i]
        if (child.subMenus[j].path === this.$options.name) {
          this.menus = child.subMenus[j].subMenus
          console.log(JSON.stringify(this.menus))
        }
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
