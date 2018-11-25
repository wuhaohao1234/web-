# electron中vuex的使用(假设已经掌握vuex)

## 创建User.js

* renderer/store/modules/User.js

```
    const state = {
        bucketId: '我是默认值'    // 默认值
    }

    const getters = {
        bucketId: state => state.bucketId
    }

    const mutations = {
        updateBucketId(state, bucketId) {
            state.bucketId = bucketId
        }
    }

    export default {
        state,
        mutations
    }
```

* LandingPage.vue中使用

```
computed:{
    bucketId() {
        return this.$store.state.User.bucketId
    }
}
```