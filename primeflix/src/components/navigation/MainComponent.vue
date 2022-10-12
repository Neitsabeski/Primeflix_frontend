<template>
    <section class="py-5 text-center container">
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light title">{{ $route.name }}</h1>
                <p class="lead text-muted description">{{ $route.path }}<br/>{{ $route.params }}</p>
            </div>
        </div>
    </section>
</template>

<script>

</script>

<style scoped>
  h1{
    text-transform:uppercase;
  }
</style>