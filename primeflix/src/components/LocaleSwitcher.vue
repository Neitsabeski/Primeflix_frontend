<template>
    <select class="form-control" @change="onChange($event)" data-width="fit" v-model="$i18n.locale">
      <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
        {{ locale }}
      </option>
    </select>
  </template>
  
<script>
    export default {
      name: "LocaleSwitcher",
      data() {
        return { locales: ["fr", "en", "nl"] };
      },
      methods: {
        onChange(event){
          this.$store.commit('setLang');
        }
      }
    };
</script>