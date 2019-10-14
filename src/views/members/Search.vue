<template>
  <div class="search">
    <el-row :gutter="0">
      <el-col :span="2.5">
        <el-select v-model="type">
          <el-option v-for="opt in options" :key="opt.value" :label="opt.label" :value="opt.value" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input v-model="keyWord" placeholder="Keyword" :autofocus="true" />
      </el-col>
      <el-col :span="4">
        <el-input v-model="centreCode" placeholder="Center Code" :autofocus="true" />
      </el-col>
      <el-col :span="3">
        <el-button
          :disabled="(type == 'LockerKeyNumber' && (keyWord === '' || centreCode === ''))"
          type="primary"
          @click="getSearchRequestList()"
        >Search</el-button>
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
        <el-table :data="searchRequestList" border style="width: 100%;" empty-text="No Data">
          <el-table-column label="Member Number" prop="memberNumber" v-if="checkList.indexOf('Member Number') >= 0"/>
          <el-table-column label="Name" prop="userName" v-if="checkList.indexOf('Name') >= 0"/>
          <el-table-column label="Identity" prop="userIdentity" v-if="checkList.indexOf('Identity') >= 0"/>
          <el-table-column label="Locker Key Number" prop="lockerKeyNumber" v-if="checkList.indexOf('Locker Key Number') >= 0"/>
          <el-table-column label="Operation" width="240px" prop="lockerKeyNumber" >
            <template slot-scope="scope">
              <el-button type="success" :disabled="scope.row.lockerKeyNumber" @click="loginConfirm(scope.$index)">Check In</el-button>
              <el-button type="primary" :disabled="!scope.row.lockerKeyNumber" @click="logoutConfirm(scope.$index)">Check out</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 確認登入 -->
    <el-dialog title="會員資料" :visible.sync="loginFormVisible" width='50%'>
      <h1 slot='title' style="color:'#606266'">會員資料</h1>
      <el-form label-position="left" label-width="40%" style="padding: 20px" :rules="rules">
        <el-form-item v-for='(item,key,index) in checkListProp' :key="index" :label="key">
          {{ requestList.length > 0 ? ( requestList[openedIndex][item] ? requestList[openedIndex][item] : '-' ) : ( '' )}}
        </el-form-item>
        <h1>Check-In</h1>
        <el-form-item label="Locker Key Number" prop="keyNum">
          <el-input v-model="checkInForm.keyNum"></el-input>
        </el-form-item>
        <el-form-item label="Towel Coupon Used">
          <el-input-number v-model="checkInForm.towel" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="One Towel Per Day">
          <el-radio v-model="checkInForm.oneTowelPerDay" :label="0">YES</el-radio>
          <el-radio v-model="checkInForm.oneTowelPerDay" :label="1">NO</el-radio>
        </el-form-item>
        <el-form-item label="Physical Card">
          <el-radio v-model="checkInForm.physicalCard" :label="0">YES</el-radio>
          <el-radio v-model="checkInForm.physicalCard" :label="1">NO</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginFormVisible = false">cancel</el-button>
          <el-button type='primary' @click="loginDialogConfirm()" :disabled="checkInForm.keyNum? false : true">confirm</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 確認登出 -->
    <el-dialog title="會員資料" :visible.sync="logoutFormVisible" width='50%'>
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
import { mapGetters, mapActions } from "vuex";
import {confirmCheckIn} from '@/api/check-in'
export default {
  data() {
    return {
      input: "",
      loginFormVisible: false,
      logoutFormVisible: false,
      keyWord: "",
      centreCode: localStorage["centre"],
      pageNumber: 1,
      openedIndex: 0,
      checkList: ["Member Number", "Name", "Identity", "Locker Key Number"],
      options: [
        {
          value: "HKID",
          label: "HKID"
        },
        {
          value: "Name",
          label: "Name"
        },
        {
          value: "MemberNumber",
          label: "MemberNumber"
        },
        {
          value: "LockerKeyNumber",
          label: "LockerKeyNumber"
        }
      ],
      type: "Name",
      checkInForm: {
        keyNum: '',
        towel: 0,
        oneTowelPerDay: 1,
        physicalCard: 1
      },
      checkListProp: {
        "Member Number": "memberNumber",
        "Name": "userName",
        "Gender": "userGender",
        "Card Type": "cardType",
        "Membership Status": "membershipStatus",
        "Expiry Date": "expiryDate"
      },
      rules: {
        keyNum: [
          {required: true, message: '請輸入Key Number', trigger: 'blur'}
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["searchRequestList"]),
    ...mapGetters(["requestList"]),
    ...mapGetters(["checkedInList"])
  },
  methods: {
    ...mapActions(["search/getSearchRequestList"]),
    getSearchRequestList() {
      if (this.centreCode === "" && this.keyWord === "") {
      } else {
        this["search/getSearchRequestList"]({
          keywordType: this.type,
          keyword: this.keyWord,
          pageNumber: this.pageNumber,
          centre: this.centreCode
        });
      }
    },
    loginDialogConfirm() {
      console.log('send confirm')
      confirmCheckIn(this.requestList[this.openedIndex].requestId, this.checkInForm.keyNum, this.checkInForm.towel, this.checkInForm.physicalCard, this.checkInForm.oneTowelPerDay, getStaffNumber(), getTokenFromLocal()).then((res) => {
        console.log('send confirm',res)
      })
      //this["checkIn/getReqList"]()
      this.loginFormVisible = false
    },
    loginConfirm(id) {
      this.openedIndex = id;
      this.loginFormVisible = true;
      console.log("confirm:", id);
    },
    logoutConfirm(id) {
      this.openedIndex = id;
      this.logoutFormVisible = true;
      console.log("confirm:", id);
    },
    checkOut() {
      console.log('check out: ',this.checkedInList[this.openedIndex].memberNumber)
      confirmCheckOut(localStorage['centre'], this.checkedInList[this.openedIndex].lockerKeyNum, getStaffNumber(), getTokenFromLocal()).then(() => {
        console.log('send checkout')
      })
      //this["checkOut/getCheckedInList"]()
      this.logoutFormVisible = false
    },
  }
};
</script>

<style scoped>
.search {
  margin: 20px;
}
</style>
