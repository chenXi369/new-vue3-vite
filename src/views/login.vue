<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/api/index'

const username = ref('mz4.0')
const password = ref('123456')

const onSubmit = (values) => {
  const data = {
    device: "wechat",
		userType: "civil",
    password: values.password,
    username: values.username
  }
  login(data).then(res => {
    console.log(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
</script>

<style lang="scss" scoped></style>