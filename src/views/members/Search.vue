<template>
  <div class="search">
    <el-row :gutter="0">
      <el-col :span="2.5">
        <el-select v-model="type">
          <el-option v-for="opt in options" :key="opt.value" :label="opt.label" :value="opt.value" />
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-input v-model="keyWord" placeholder="Keyword" :autofocus="true" />
      </el-col>
      <el-col :span="3">
        <el-input v-model="centreCode" placeholder="Center Code" :autofocus="true" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary">Search</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col>
        <h3>Columns</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="Member Number" />
          <el-checkbox label="Name" />
          <el-checkbox label="Identity" />
          <el-checkbox label="Locker Key Number" />
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="margin-top: 2%;">
        <el-table :data="tableData" border style="width: 100%;" empty-text="No Data">
          <el-table-column label="Member Number" prop="memberNumber"/>
          <el-table-column label="Name" prop="userName"/>
          <el-table-column label="Identity" prop="userIdentity"/>
          <el-table-column label="Locker Key Number" prop="lockerKeyNumber" />
          <el-table-column label="Operation" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      input: '',
      checkList: [
        'Member Number',
        'Name',
        'Identity',
        'Locker Key Number'
      ],
      options: [
        {
          value: 'HKID',
          label: 'HKID'
        },
        {
          value: 'Name',
          label: 'Name'
        },
        {
          value: 'MemberNumber',
          label: 'MemberNumber'
        },
        {
          value: 'LockerKeyNumber',
          label: 'LockerKeyNumber'
        }
      ],
      value: 'Name'
    }
  },
  computed: {
    ...mapGetters(['searchRequestList'])
  },
  methods: {
    ...mapActions(['search/getSearchRequestList']),
    getSearchRequestList() {
      this['search/getSearchRequestList'](data)
    }
  }
}
</script>

<style scoped>
.search {
  margin: 20px;
}
</style>
