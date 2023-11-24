<script setup>
defineProps({ article: Object });
</script>

<template>
  <tr class="text-center justify-content-center align-items-center">
    <th class="col-1" scope="row">{{ article.articleNo }}</th>
    <td class="col-3 text-start align-items-center">
      <router-link
        :to="{ name: 'article-view', params: { articleno: article.articleNo } }"
        class="article-title link-dark align-items-center"
      >
        {{ article.subject }}
      </router-link>
    </td>
    <td class="col-2 align-items-center">
      {{ article.memberName ? article.memberName : "익명" }}
    </td>
    <td class="col-1 align-items-center">{{ article.hit }}</td>
    <td class="col-1 align-self-center">{{ article.memoCount }}</td>
    <td class="col-1 align-self-center">{{ article.likeCount }}</td>
    <td class="col-3 text-grey">{{ article.registerTime }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
