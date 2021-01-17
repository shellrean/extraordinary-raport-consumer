<template>
  <div>
  <div class="border-dashed w-full border border-green-500 p-2 mb-4">
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium text-sm">NIS</div>
      <div class="flex-1 text-sm">{{ detail.srn }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">NISN</div>
      <div class="flex-1 text-xs">{{detail.nsrn }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">NAMA</div>
      <div class="flex-1 text-xs">{{ detail.name }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">JK</div>
      <div class="flex-1 text-xs">{{ genderText(detail.gender) }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Kota Lahir</div>
      <div class="flex-1 text-xs">{{ detail.birth_place }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Tanggal Lahir</div>
      <div class="flex-1 text-xs">{{ detail.birth_date }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Agama</div>
      <div class="flex-1 text-xs">{{ religionText(detail.religion_id) }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Alamat</div>
      <div class="flex-1 text-xs">{{ detail.address }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Telp</div>
      <div class="flex-1 text-xs">{{ detail.telp }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Sekolah Sebelumnya</div>
      <div class="flex-1 text-xs">{{ detail.school_before }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Diterima Di Kelas</div>
      <div class="flex-1 text-xs">{{ detail.accepted_grade }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Tanggal Diterima</div>
      <div class="flex-1 text-xs">{{ detail.accepted_date }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Status Keluarga</div>
      <div class="flex-1 text-xs">{{ famillyText(detail.familly_status) }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Anak Ke</div>
      <div class="flex-1 text-xs">{{ detail.familly_order }}</div>
    </div>
  </div>
  <div class="border-dashed border border-blue-500 p-2 mb-4">
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Nama Ayah</div>
      <div class="flex-1 text-xs">{{ detail.father_name }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Alamat Ayah</div>
      <div class="flex-1 text-xs">{{ detail.father_address }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Pekerjaan Ayah</div>
      <div class="flex-1 text-xs">{{ detail.father_profession }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Telp Ayah</div>
      <div class="flex-1 text-xs">{{ detail.father_telp }}</div>
    </div>
  </div>
  <div class="border-dashed border border-blue-500 p-2 mb-4">
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Nama Ibu</div>
      <div class="flex-1 text-xs">{{ detail.mother_name }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Alamat Ibu</div>
      <div class="flex-1 text-xs">{{ detail.mother_address }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Pekerjaan Ibu</div>
      <div class="flex-1 text-xs">{{ detail.mother_profession }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Telp Ibu</div>
      <div class="flex-1 text-xs">{{ detail.mother_telp }}</div>
    </div>
  </div>
  <div class="border-dashed border border-blue-500 p-2">
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Nama Wali</div>
      <div class="flex-1 text-xs">{{ detail.grd_name }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Alamat Wali</div>
      <div class="flex-1 text-xs">{{ detail.grd_address }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Pekerjaan Wali</div>
      <div class="flex-1 text-xs">{{ detail.grd_profession }}</div>
    </div>
    <div class="flex space-x-4 mb-2 ">
      <div class="w-28 text-sm font-medium">Telp Wali</div>
      <div class="flex-1 text-xs">{{ detail.grd_telp }}</div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'StudentDetail',
  props: {
    detail: {
      type: Object
    }
  },
  data() {
    return {
      religions: [
        'No Religion',
        'Islam',
        'Kristen',
        'Katolik',
        'Hindu',
        'Budha',
        'Konghucu',
      ],
      famillyStatus: [
        'No Status',
        'Anak Kandung',
        'Saudara',
        'Anak Angkat',
        'Familly Lain',
      ]
    }
  },
  methods: {
    religionText(id) {
      return this.religions[id]
    },
    famillyText(id) {
      return this.famillyStatus[id]
    },
    genderText(gender) {
      switch (gender) {
        case 'M':
          return 'Laki-Laki'
        case 'F':
          return 'Perempuan'
        default:
          return 'Not Found'
      }
    }
  }
};
</script>