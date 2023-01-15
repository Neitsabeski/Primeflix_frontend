<template>
    <div class="productItem col-md-2 card ">
        <RouterLink v-bind:to="'/products/' + product.id">
        <div class="cropped">
            <img v-if="!product.pictureUrl" class="card-img-top"
                src="../../assets/img/product/noimage.png" alt="noimage" />
            <img v-else class="card-img-top" :src="product.pictureUrl"
                :alt="product.pictureUrl" />
        </div>
        <div class="card-body">
            
            <StarsComp :ratingP="product.rating"/>
            
        </div>
        <div class="card-title">
                {{ product.title }}
        </div>
        </RouterLink>
        <div class="card-body">
            {{ product.format.name }}
            <button v-if="product.stock > 0" v-on:click="addToCart(product)"
                class="btn btn-primary">
                <font-awesome-icon icon="shopping-cart" /> {{ product.price }}€
            </button>
            <button v-else
                class="btn btn-primary disabled">
                <font-awesome-icon icon="shopping-cart" />
            </button>
        </div>
    </div>
</template>

<script>

    import StarsComp from '@/components/product/StarsComponent.vue'

    export default {
        name: 'ProductCard',
        props: ['product'],
        components:{
            StarsComp
        },
    }

</script>