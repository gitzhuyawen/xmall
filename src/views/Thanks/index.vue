<template>
  <div>
      
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      banner:[],
      homeList:[]
    }
  },
  
}
axios(
  "/mz/goods/home"
).then((req) => {
//   console.log(res.data.result[0].panelContents);
//  console.log(res.data.result)
console.log(req.data.result)
});
</script>

<style>

</style>