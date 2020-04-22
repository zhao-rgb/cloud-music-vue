<template>
  <div class="bg">
    <mu-container>
      <mu-form ref="form" :model="validateForm" class="login-form">
        <mu-form-item label="用户名" prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-auto-complete label="提示输入内容" v-model="verifyCode"></mu-auto-complete>
        <mu-button color="info" @click="getVerify()" v-if="vailiable">获取验证码</mu-button>
        <img ref="image" alt="" v-if="!vailiable" @click="getVerify()" />
        <mu-form-item prop="isAgree" :rules="argeeRules">
          <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">提交</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
      </mu-form>
      <mu-dialog title="Dialog" width="360" :open.sync="openSimple">
        登录成功
        <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">Close</mu-button>
      </mu-dialog>
    </mu-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名' },
        { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10' }
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议' }],
      validateForm: {
        username: '',
        password: '',
        isAgree: false
      },
      verifyCode: '',
      vailiable: true,
      menuList: [],
      openSimple: false
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    //获取验证码
    getVerify() {
      this.vailiable = false
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/captcha',
        // 2、将请求数据转换为form-data格式
        params: {
          name: this.validateForm.username
        },
        // 3、设置请求头Content-Type
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'blob'
      }).then((res) => {
        let img = this.$refs.image
        let url = window.URL.createObjectURL(res.data)
        img.src = url
      })
    },
    //登录
    submit() {
      this.$refs.form.validate().then((result) => {
        console.log('form valid: ', result)
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/sysAdmin/login',
          data: {
            name: this.validateForm.username,
            password: this.validateForm.password,
            verifyCode: this.verifyCode
          }
        }).then((res) => {
          if (res.data.msg === '成功') {
            alert('登录成功')
            localStorage.setItem('user', JSON.stringify(res.data.data))
            localStorage.setItem('token', 'EcIHTAWoGrmMVvTu2LPvuL-siq6hAfieVeehl-HTe_M')
            localStorage.setItem('menuList', JSON.stringify(this.menuList))
            this.$store.commit('setToken', 'EcIHTAWoGrmMVvTu2LPvuL-siq6hAfieVeehl-HTe_M')
            this.$store.commit('setUser', res.data.data)
            this.$store.commit('setMenuList', this.menuList)
            this.$router.push('/')
            this.openSimpleDialog()
          } else {
            alert(res.data.msg)
            this.validateForm.code = ''
          }
        })
        //模拟后端接口数据
        // let user = {
        //   userId: '2000100193',
        //   username: 'taoranran',
        //   userRole: 'admin',
        //   avatar: 'https://avatars1.githubusercontent.com/u/42235689?s=60&u=b25100f60b66465b78fe97e36b2788715c216a6d&v=4'
        // }
        this.menuList = [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard', subMenus: [] },
          {
            title: '音乐管理',
            icon: 'mdi-music',
            url: '',
            subMenus: [
              {
                title: '歌单管理',
                icon: 'mdi-domain',
                url: '/music-list',
                permissions: []
              },
              {
                title: '歌曲管理',
                icon: 'mdi-text',
                url: '/music',
                permissions: ['music:add', 'music:edit', 'music:delete']
              }
            ]
          },
          { title: 'About', icon: 'mdi-help-box', url: '/about', subMenus: [] }
        ]
      })
    },

    openSimpleDialog() {
      this.openSimple = true
    },
    closeSimpleDialog() {
      this.openSimple = false
    },
    clear() {
      this.$refs.form.clear()
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      }
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.bg {
  background-image: url('http://attachments.gfan.com/forum/attachments2/day_110619/1106190158ebe07267f75886d4.jpg');
  opacity: 0.8;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form {
  max-width: 500px;
  margin-left: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
</style>
