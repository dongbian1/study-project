<template>
    <div>1231</div>
</template>

<script lang="ts" setup>
import websocket from '@/utils/websocket'

const user1Ws = websocket({
    url: 'ws://localhost:3000',
})

onMounted(() => {
    user1Ws.connect()
})
</script>