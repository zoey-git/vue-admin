<template>
    <div>
         
    </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    this.$socket.emit('connect', 'hello')
    this.$socket.emit('msg', '哈哈哈')
    this.$socket.on('news', (msg) => {
      console.log(msg);
      
    })
    // console.log(socket);
    
    // console.log(socket);
    
    // const socket = socket.connect('http://localhost');
    // socket.on('news', (msg) => {
    //   console.log('msg: ', msg);
    //   socket.emit('msg', { my: 'data' });
    // });
  }
}
</script>

<style lang="scss">
    
</style>