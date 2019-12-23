<template>
    <div>
         
    </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    const socket = io('http://127.0.0.1:3000')
    socket.on('news', (msg) => {
      console.log(msg);
    })
    setTimeout(() => {
      socket.emit('msg', '这是msg')
    },5000)
  }
}
</script>

<style lang="scss">
    
</style>