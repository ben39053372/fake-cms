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
        <el-table :data="checkedInList" border fit style="width: 100%;" empty-text="No Data">
          <el-table-column
            v-if="checkList.indexOf('Member Number') >= 0"
            label="Member Number"
            prop="memberNumber"
          />
          <el-table-column v-if="checkList.indexOf('Name') >= 0" label="Name" prop="userName" />
          <el-table-column v-if="checkList.indexOf('Gender') >= 0" label="Gender" prop="userGender">
            <template slot-scope="scope">
              <p
                :style="[scope.row.userGender === 'M' ? {color: 'blue'} : { color: 'red' }]"
              >{{ scope.row.userGender }}</p>
            </template>
          </el-table-column>
          <el-table-column
            v-if="checkList.indexOf('Card Type') >= 0"
            label="Card Type"
            prop="cardType"
          >
            <template slot-scope="scope">
              <p>{{scope.row.cardType? scope.row.cardType : '--' }}</p>
            </template>
          </el-table-column>
          <el-table-column
            v-if="checkList.indexOf('Membership Status') >= 0"
            label="Membership Status"
            prop="membershipStatus"
          >
            <template slot-scope="scope">
              <p
                :style="[scope.row.membershipStatus === 'Active' ? { color: 'green' } : { color: 'red' }]"
              >{{ scope.row.membershipStatus }}</p>
            </template>
          </el-table-column>
          <el-table-column
            v-if="checkList.indexOf('Expiry Date') >= 0"
            label="Expiry Date"
            prop="cardExpiryDate"
          >
            <template slot-scope="scope">
              <p>{{scope.row.cardExpiryDate? scope.row.cardExpiryDate : '--' }}</p>
            </template>
          </el-table-column>
          <el-table-column label="Operation" prop="requestId" width="272px" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" @click="confirm(scope.$index)">Check Out</el-button>
              <el-button type="info" @click="profile(scope.$index)">Profile</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 確認登入 -->
    <el-dialog title="會員資料" :visible.sync="formVisible" width='50%'>
      <h1 slot='title' style="color:'#606266'">會員資料</h1>
      <el-form label-position="left" label-width="40%" style="padding: 20px" >
        <el-form-item v-for='(item,key,index) in checkListProp' :key="index" :label="key">
          {{ checkedInList.length > 0 ? ( checkedInList[openedIndex][item] ? checkedInList[openedIndex][item] : '-' ) : ( '' )}}
        </el-form-item>
        <el-form-item>
          <el-button @click="formVisible = false">cancel</el-button>
          <el-button type='primary' @click="checkOut()">Check Out</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { confirmCheckOut } from "@/api/check-out";
import { mapGetters, mapActions } from "vuex";
import { getStaffNumber, getTokenFromLocal } from '../../utils/auth';
export default {
  data() {
    return {
      input: "",
      formVisible: false,
      openedIndex: 0,
      checkList: [
        "Member Number",
        "Name",
        "Gender",
        "Card Type",
        "Membership Status",
        "Expiry Date",
        "Locker Key Number"
      ],
      checkListProp: {
        "Member Number":"memberNumber",
        "Name": 'userName',
        "Gender": 'userGender',
        "Card Type": 'cardType',
        "Membership Status": 'membershipStatus',
        "Expiry Date": 'cardExpiryDate',
        "Locker Key Number": 'lockerKeyNum'
      }
    };
  },
  mounted() {
    // this.fetchCheckedInList();
    this["checkOut/getCheckedInList"]()
  },
  computed: {
    ...mapGetters(["checkedInList"])
  },
  methods: {
    ...mapActions(["checkOut/getCheckedInList"]),
    fetchCheckedInList() {
      this["checkOut/getCheckedInList"]().then(() => {
        console.log(this.checkedInList);
      });
    },
    confirm(id) {
      this.openedIndex = id;
      this.formVisible = true;
      console.log("confirm:", id);
    },
    checkOut() {
      console.log('check out: ',this.checkedInList[this.openedIndex].memberNumber)
      confirmCheckOut(localStorage['centre'], this.checkedInList[this.openedIndex].lockerKeyNum, getStaffNumber(), getTokenFromLocal()).then(() => {
        console.log('send checkout')
      })
      this["checkOut/getCheckedInList"]()
      this.formVisible = false
    },
    profile(id) {
      this.openedIndex = id;
      this.formVisible = true;
      console.log("confirm:", id);
    },
  }
};
</script>

<style scoped>
.check-out {
  margin: 20px;
}
</style>
