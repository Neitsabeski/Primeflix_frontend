<template>
  <div class="container">
    <section>
      <ul class="path-nav">
        <li>
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li>
          > {{ $route.name }}
        </li>
        <li>
          > {{ $route.params.format }}
        </li>
      </ul>
    </section>
  </div>
</template>
