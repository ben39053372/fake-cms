<template>
  <div class="check-in">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input placeholder="Check-In" v-modal="input"></el-input>
      </el-col>
      <el-col :span="2.5">
        <el-button type="info">Search</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger">Clear Filter</el-button>
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
          <el-checkbox label="Member Number"></el-checkbox>
          <el-checkbox label="Name"></el-checkbox>
          <el-checkbox label="Gender"></el-checkbox>
          <el-checkbox label="Card Type"></el-checkbox>
          <el-checkbox label="Membership Status"></el-checkbox>
          <el-checkbox label="Expiry Date"></el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="margin-top: 2%">
        <el-table :data="tableData" border style="width: 100%" empty-text='No data'>
          <el-table-column prop="MemberNumber" label="Member Number" width="180"></el-table-column>
          <el-table-column prop="Name" label="Name" width="180"></el-table-column>
          <el-table-column prop="Gender" label="Gender"></el-table-column>
          <el-table-column prop="Card Type" label="Card Type"></el-table-column>
          <el-table-column prop="Membership Status" label="Membership Status"></el-table-column>
          <el-table-column prop="Expiry Date" label="Expiry Date"></el-table-column>
          <el-table-column prop="Operation" label="Operation"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      checkList: []
    };
  }
};
</script>

<style scoped>
.check-in {
  margin: 20px;
}
</style>
