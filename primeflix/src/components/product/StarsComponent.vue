<template>
    <div class="rating">
        <font-awesome-icon v-for="s in stars()" v-bind:key="s" icon="star" />
        <font-awesome-icon v-if="isOdd()" icon="fa-solid fa-star-half-stroke" />
        <font-awesome-icon v-for="s in emptyStars()" v-bind:key="s" icon="fa-regular fa-star" />
    </div>
</template>

<script>
    export default {
        name: 'Stars',
        props: ['ratingP'],
        data(){
            return{
                rating: 0
            }
        },
        created(){
            this.rating = Math.round(this.ratingP*2)/2;
            if(0 > this.rating) this.rating = 0;
            if(5 < this.rating) this.rating = 5;
        },
        methods: {
            stars: function () {
                if (this.isOdd()) return this.rating - 0.5;
                else return this.rating;
            },
            emptyStars: function(){
                if (this.isOdd()) return 5 - this.rating - 0.5;
                else return 5 - this.rating;
            },
            isOdd: function () {
                return (this.rating * 2) % 2;
            },
        }
    }
</script>