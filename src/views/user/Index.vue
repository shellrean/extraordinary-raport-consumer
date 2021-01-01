<template>
  <div class="c-body">
    <main class="c-main">
      <div class="container-fluid">
        <div class="row">
    	    <div class="col-md-12">
    	    	<div class="card">
    			    <div class="card-header">
                <button class="btn btn-primary btn-sm mr-1" v-b-modal.modal-user>Tambah user</button>
                <button class="btn btn-light btn-sm">Import user</button>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-5">
                    <h4 class="card-title mb-0">Manajemen User</h4>
                    <div class="small text-muted">Buat edit dan hapus user</div>
                  </div>
                </div>
                <br>
                <div class="row ">
                  <div class="col-md-4">
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="flaticon-search"></i></span>
                      </div>
                      <input type="text" class="form-control" v-model="search" placeholder="Cari user">
                        <div class="input-group-append">
                        <button class="btn btn-secondary" :disabled="!search" @click="search = ''" type="button">Clear</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row ">
                  <div class="col-md-4">
                    <div class="input-group input-group-sm mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="flaticon-browser"></i></span>
                      </div>
                      <select class="custom-select" v-model="perPage">
                        <option :value.int="10" selected>10 /halaman</option>
                        <option :value.int="30">30 /halaman</option>
                        <option :value.int="50">50 /halaman</option>
                        <option :value.int="100">100 /halaman</option>
                      </select>
                    </div>
                  </div>
                </div>
                <hr style="border-top: 1.9px dashed #ccc" />
                <b-table 
                  id="table-transition-example"
                  :tbody-transition-props="transProps"
                  striped hover bordered small show-empty
                  :fields="fields" 
                  :items="users" 
                  @row-clicked="myRowClickHandler"
                  >
                  <template v-slot:cell(selected)="row">
                    <input type="checkbox" :checked="selected.includes(row.item.id)" @input="onPreviewClick($event, row.index, row.item)"/>
                  </template>
                </b-table>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <div class="btn-group">
                      <b-button variant="outline-info" size="sm" :disabled="selected.length == users.length" @click="selectAllRows">
                        <i class="flaticon-list-3"></i>
                      </b-button>
                      <b-button variant="outline-info" size="sm" :disabled="selected.length == 0" @click="clearSelected">
                        <i class="flaticon2-reload"></i>
                      </b-button>
                      <b-button variant="outline-danger" :disabled="selected.length == 0" size="sm" @click="bulkRemove">
                        <i class="flaticon2-trash"></i>
                      </b-button>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="float-right">
                      <div class="btn-group">
                        <b-button variant="secondary" size="sm" :disabled="isLoading || cursor.prev.length == 1" @click="prevPage">
                          <i class="flaticon2-back"></i>
                        </b-button>
                        <b-button variant="secondary" size="sm" :disabled="isLoading || typeof cursor.next == 'undefined'" @click="nextPage">
                          <i class="flaticon2-next"></i>
                        </b-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-modal id="modal-user" title="Buat user baru" hide-footer no-close-on-backdrop>
        <form-user />
      </b-modal>
    </main>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import FormUser from './Form'
export default {
  components: {
    FormUser
  },
  data() {
    return {
      transProps: {
        name: 'flip-list'
      },
      search: '',
      perPage: 10,
      selected: [],
      fields: [
        { key: 'selected', label: 'Aksi' },
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Nama', sortable: true},
        { key: 'email', label: 'Email', sortable: true},
      ],
      page: {
        get() {
        },
        set(val) {
        }
      }
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('user', ['users','cursor']),
  },
  methods: {
    ...mapActions('user',['fetchUsers']),
    selectAllRows() {
      this.selected = this.users.map((item) => item.id)
    },
    clearSelected() {
      this.selected = []
    },
    bulkRemove() {
    },
    myRowClickHandler(record, index) {
      console.log(record)
    },
    prevPage() {
      (async () => {
        await this.fetchUsers(true)
      })()
    },
    nextPage() {
      (async () => {
        await this.fetchUsers()
      })()
    },
    onPreviewClick(value, index, item) {
      if(value.target.checked) {
        this.selected.push(item.id)
      } else {
        var idx = this.selected.indexOf(item.id);
        if (idx !== -1) {
          this.selected.splice(idx, 1)
        }
      }
      
    }
  },
  created() {
    try {
      (async () => {
        await this.fetchUsers()
      })()
    } catch (err) {
      this.$bvToast.toast(`Error: ${error.message}`, {
        title: "Terjadi kesalahan",
        variant: "danger",
        solid: true
      })
    }
  }
}
</script>