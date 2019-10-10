<template>
  <div class="check-out">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input v-model="input" placeholder="check-out" :autofocus="true" />
      </el-col>
      <el-col :span="2.5">
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
          <el-checkbox label="Gender" />
          <el-checkbox label="Card Type" />
          <el-checkbox label="Membership Status" />
          <el-checkbox label="Expiry Date" />
          <el-checkbox label="Locker Key Number" />
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="margin-top: 2%;">
        <el-table :data="tableData" border style="width: 100%;" empty-text="No Data">
          <el-table-column v-for="list in checkList" :key="list" :label="list" />
          <el-table-column label="Operation" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      checkList: ['Member Number', 'Name', 'Gender', 'Card Type', 'Membership Status', 'Expiry Date', 'Locker Key Number']
    }
  }
}
</script>

<style scoped>
.check-out {
  margin: 20px;
}
</style>
