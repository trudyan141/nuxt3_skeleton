<script setup>
  // The default locale is en-US, if you want to use other locale, just set locale in entry file globally.
import locale from 'ant-design-vue/es/date-picker/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
const value = ref(dayjs('2015-01-01', 'YYYY-MM-DD'));
onMounted(() =>{
  dayjs.locale('vi');
}) 
</script>
<template>
  <a-date-picker v-model:value="value" :locale="locale" />
</template>
