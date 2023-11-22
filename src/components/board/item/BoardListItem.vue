<script setup>
defineProps({ article: Object });
</script>

<template>
    <tr class="text-center">
        <th class="col-2" scope="row">{{ article.articleNo }}</th>
        <td class="col-3 text-start">
            <router-link
                :to="{ name: 'article-view', params: { articleno: article.articleNo } }"
                class="article-title link-dark"
            >
                {{ article.subject }}
            </router-link>
        </td>
        <td class="col-2">{{ article.memberName }}</td>
        <td class="col-1">{{ article.hit }}</td>
        <td class="col-1">{{ article.memos ? article.memos.length : 0 }}</td>
        <td class="col-1">{{ article.likeCount }}</td>
        <td class="col-5 text-grey">{{ article.registerTime }}</td>
    </tr>
</template>

<style scoped>
a {
    text-decoration: none;
}
</style>
