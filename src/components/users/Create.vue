<template>
  <div>
    <div id="createUser" ref="modal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <span class="modal-header__title">
              Tạo mới người dùng
            </span>
            <button type="button" class="close" data-dismiss="modal">&times;</button>  
          </div>
          <div class="modal-body">   
              <form v-on:submit.prevent="createUser" class="create-user" style="padding: 0px">
                <div class="form-group">
                  <label class="control-label" for="name">{{ $t('users.nameMsg') }}</label>
                  <input class="form-control" ref="name" v-model="name" name="name" v-validate="'required'" type="text">
                  <span v-if="errors.has('name')">{{ errors.first('name') }}</span>
                </div>
                <div class="form-group">
                  <label class="control-label" for="comment">{{ $t('commentMsg') }}</label>
                  <input class="form-control" v-model="comment" name="comment" type="text">
                </div>
                <div class="form-group">
                  <label class="control-label" for='password'>{{ $t('users.passwordMsg') }}</label>
                  <input v-validate="'required|min:6'" v-model='password' name="password" type="password" class="form-control" ref="password">
                  <span v-if="errors.has('password')">{{ errors.first('password') }}</span>
                </div>
                <!-- <div class="form-group">
                  <label class="control-label" for="confirm_password">{{ $t('users.confirmPassword') }}</label>
                  <input v-model='confirm_password' name="confirm_password" v-validate="'required|confirmed:password'" type="password" class="form-control" data-vv-as="password">
                  <span  v-if="errors.has('confirm_password')">{{ errors.first('confirm_password') }}</span>
                </div> -->
                <div class="form-group">
                  <label for="role">{{ $t('users.roleMsg') }}</label>
                  <select class="form-control" v-model="role_ids">
                    <option v-for="r in roles" :key="r['-id']" v-bind:value="r['-id']">{{r.name}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="control-label" for="host_allow_number">{{ $t('users.hostAccessMsg') }}</label>
                  <div class="contentt">
                  <div class="optionn">
                  <input type="radio" name="host_allow_number" v-model="hosts_allow" value="true">{{ $t('users.allowanddeny') }}<br>
                  <input type="radio" name="host_allow_number" v-model="hosts_allow" value="false" style="margin-left: 20px">{{ $t('users.denyandallow') }}<br>
                  </div>
                  <div class="inputcontent">
                  <input v-model='hosts' type="text" name="hosts" class="form-control">
                  </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label" for="iface_allow_number">{{ $t('users.interface') }}</label>
                  <div class="contentt">
                  <div class="optionn">
                  <input type="radio" name="ifaces_allow_number" v-model="ifaces_allow" value="true">{{ $t('users.allowanddeny') }}<br>
                  <input type="radio" name="ifaces_allow_number" v-model="ifaces_allow" value="false" style="margin-left: 20px">{{ $t('users.denyandallow') }}<br>
                  </div>
                  <div class="inputcontent">
                  <input v-model='ifaces' type="text" name="ifaces" class="form-control">
                  </div>
                  </div>
                </div>
                
              </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger" v-if="message">{{message}}</button>
            <button class="btn btn-success" v-if="messageCreate">{{messageCreate}}</button>
            <button type="submit" @click="createUser()" class="btn btn-primary">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import $ from 'jquery'
  import axios from 'axios'
  import config from '../../config'
  export default {
    name: 'Tables',
    data() {
      return {
        name: '',
        comment: '',
        password: '',
        // comfirm_password: '',
        role_ids: '',
        hosts_allow: 'true',
        hosts: [],
        ifaces_allow: 'true',
        ifaces: [],
        roles: [],
        message: '',
        messageCreate: ''
      }
    },
    created() {
      axios({
        method: 'get',
        url: config.apiUrl + '/roles'
      })
      .then(response => {
        this.roles = response.data.get_roles_response.role
        // if (this.message !== 'User already exists') {
        //   this.$router.push('/users')
        // }
      })
    },
    // mounted() {
    //   $(this.$refs.modal).on('hidden.bs.modal', () => {
    //     this.name = ''
    //     this.$refs.name.value = null
    //   })
    // },
    methods: {
      createUser() {
        this.$validator.validateAll().then(res => {
          if (res) {
            axios({
              method: 'post',
              url: this.apiUrl + '/users',
              data: {
                name: this.name,
                comment: this.comment,
                password: this.password,
                role_ids: this.role_ids,
                hosts_allow: this.hosts_allow,
                hosts: this.hosts,
                ifaces_allow: this.ifaces_allow,
                ifaces: this.ifaces
              }
            })
            .then(response => {
              if (response.data.create_user_response['-status'] === '201') {
                this.messageCreate = 'Tạo người dùng thành công!'
                this.message = ''
                location.reload()
              }
            })
            .catch((error) => {
              if (error.response.data.Error === 'User already exists') {
                this.messageCreate = 'Tên người dùng đã tồn tại!'
              }
            })
          }
        })
      },
      closeForm() {
        this.message = ''
        this.messageCreate = ''
      }
    }
  }
</script>
<style>
#createUser label{
    min-width: 125px;
}
#createUser .form-group{
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.optionn {
  display: flex;
}
.optionn input{
  margin-right: 6px;
}
</style>
