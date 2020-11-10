<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view v-cloak></router-view>
    </transition>
  </div>
</template>