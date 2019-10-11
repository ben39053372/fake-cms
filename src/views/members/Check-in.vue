<template>
  <div class="check-in">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input v-model="input" placeholder="Check-In" autofocus />
      </el-col>
      <el-col :span="2.5">
        <el-button type="info">Search</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" disabled>Clear Filter</el-button>
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
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="margin-top: 2%;">
        <el-table :data="requestList" border fit style="width: 100%;" empty-text="No Data">
          <el-table-column
            v-if="checkList.indexOf('Member Number') >= 0"
            label="Member Number"
            prop="memberNumber"
          />
          <el-table-column v-if="checkList.indexOf('Name') >= 0" label="Name" prop="userName" />
          <el-table-column v-if="checkList.indexOf('Gender') >= 0" label="Gender" prop="userGender">
            <template slot-scope="scope">
              <p
                :style="[scope.row.userGender === 'Male' ? {color: 'blue'} : { color: 'red' }]"
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
            prop="expiryDate"
          >
            <template slot-scope="scope">
              <p>{{scope.row.expiryDate? scope.row.expiryDate : '--' }}</p>
            </template>
          </el-table-column>
          <el-table-column label="Operation" prop="requestId" width="272px" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" @click="confirm(scope.$index)">Confirm check-in</el-button>
              <el-button type="danger" @click="cancel(scope.$index)">Cancel</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 確認登入 -->
    <el-dialog title="會員資料" :visible.sync="formVisible" width='50%'>
      <h1 slot='title' style="color:'#606266'">會員資料</h1>
      <el-form label-position="left" label-width="40%" style="padding: 20px">
        <el-form-item v-for='(item,key,index) in checkListProp' :key="index" :label="key">
          {{ requestList.length > 0 ? ( requestList[openedIndex][item] ? requestList[openedIndex][item] : '-' ) : ( '' )}}
        </el-form-item>
        <h1>Check-In</h1>
        <el-form-item label="Locker Key Number">
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
          <el-button @click="formVisible = false">cancel</el-button>
          <el-button type='primary' @click="dialogConfirm()">confirm</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { confirmCheckIn, cancelCheckIn } from '@/api/check-in'
import { getStaffNumber, getTokenFromLocal } from '../../utils/auth'
export default {
  data() {
    return {
      input: "",
      checkListProp: {
        "Member Number": "memberNumber",
        "Name": "userName",
        "Gender": "userGender",
        "Card Type": "cardType",
        "Membership Status": "membershipStatus",
        "Expiry Date": "expiryDate"
      },
      checkList: [
        "Member Number",
        "Name",
        "Gender",
        "Card Type",
        "Membership Status",
        "Expiry Date"
      ],
      tableData: this.requestList,
      formVisible: false,
      openedIndex: 0,
      checkInForm: {
        keyNum: '',
        towel: 0,
        oneTowelPerDay: 1,
        physicalCard: 1
      }
    };
  },
  computed: {
    ...mapGetters(["requestList"])
  },
  mounted() {
    this.fetchReqList();
  },
  methods: {
    ...mapActions(["checkIn/getReqList"]),
    fetchReqList() {
      this["checkIn/getReqList"]().then(() => {
        console.log(this.requestList);
      });
    },
    confirm(id) {
      this.openedIndex = id;
      this.formVisible = true;
      console.log("confirm:", id);
    },
    cancel(id) {
      console.log('cancel',id)
      cancelCheckIn(this.requestList[this.openedIndex].requestId, getStaffNumber(), getTokenFromLocal()).then(() => {
        console.log(res)
      })
      this.formVisible = false
    },
    dialogConfirm() {
      console.log('send confirm')
      confirmCheckIn(this.requestList[this.openedIndex].requestId, this.checkInForm.keyNum, this.checkInForm.towel, this.checkInForm.physicalCard, this.checkInForm.oneTowelPerDay, getStaffNumber(), getTokenFromLocal()).then((res) => {
        console.log('send confirm',res)
        
      })
      this["checkIn/getReqList"]()
      this.formVisible = false
    }
  }
};
</script>
<style scoped>
.check-in {
  margin: 20px;
}
</style>
