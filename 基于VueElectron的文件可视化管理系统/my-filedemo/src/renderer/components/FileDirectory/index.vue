<template>
    <div>
        <ul v-for="item in this.dbFile" >
            <li>
                {{item.fileName}}
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import Directorydb from './directorydb'
export default {
    computed:{
        ...mapState({
            dbFile:state=>state.staticFileName.dbFile
        })
    },
    mounted(){
        this.Directorydb = new Directorydb
        this.Directorydb.init(this.dbFile,this.changeDbFile)
        console.log(this.dbFile)
    },
    methods:{
        ...mapActions([
            'changeDbFile'
        ])
    }
}
</script>

<style scoped>

</style>


