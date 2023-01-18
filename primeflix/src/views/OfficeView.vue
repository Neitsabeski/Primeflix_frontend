<template>
    <div>
      <HeaderOfficeComp/>
      <router-view/>
    </div>
  </template>
  
  <script>
  
    import HeaderOfficeComp from '@/components/layout/HeaderOfficeComponent'
  
    export default {
        data:{
            status: ''
        },
        components: {
            HeaderOfficeComp
        }
    }
  
  </script>