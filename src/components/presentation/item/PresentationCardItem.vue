<script setup>
defineProps({ attraction: Object });
</script>

<template>
    <div class="card m-3" style="width: 400px"> 
        <div style="height: 380px; background-color: #f8f8f8; 
                    display: flex; align-items: center;">
            <img style="object-fit: cover; max-height: 380px;"
            class="card-img-top"
            :src="attraction.firstImage
                    ? attraction.firstImage
                    : `src/assets/img/mytripcard00.jpg`
                    "
            alt="Card image"
            />
        </div> 
        
        <div class="card-body" style="position: relative;">
            <h5 class="card-title">{{ attraction.title }}</h5>
            <p class="card-text">
                {{ attraction.addr1 }}
            </p>
            <div>
                <router-link
                :to="{ name: 'attraction-name-search' }"
                class="btn btn-primary">
                    자세히
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
