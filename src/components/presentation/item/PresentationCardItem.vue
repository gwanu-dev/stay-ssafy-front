<script setup>
defineProps({ attraction: Object });
</script>

<template>
    <div class="card m-3" style="width: 400px">  
        <img
            class="card-img-top"
            :src="attraction.firstImage
                    ? attraction.firstImage
                    : `src/assets/img/mytripcard00.jpg`
                    "
            alt="Card image"
        />
        
        <div class="card-body">
            <h5 class="card-title">{{ attraction.title }}</h5>
            <br>
            <p class="card-text">{{ attraction.addr1 }}</p>
            <a href="#" class="btn btn-primary">자세히</a>
        </div>
    </div>
</template>

<style scoped>

</style>
