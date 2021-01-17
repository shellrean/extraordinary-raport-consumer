<template>
	<div>		
		<div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">NIS</label>
			<div class="flex">
				<input v-model="student.srn" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}" >
			</div>
		</div>
		<div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">NISN</label>
			<div class="flex">
				<input v-model="student.nsrn" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
			</div>
		</div>
		<div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">Nama Lengkap</label>
			<div class="flex">
				<input v-model="student.name" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Lengkap Siswa" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
			</div>
		</div>
		<div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">Jenis Kelamin</label>
			<div class="flex">
				<select v-model="student.gender" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
					<option value="M">Laki laki</option>
					<option value="F">Perempuan</option>
				</select> 
			</div>
		</div>
		<div class="flex space-x-4 mb-4">
			<div class="w-1/2">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Kota lahir</label>
				<div class="flex">
					<input v-model="student.birth_place" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Jakarta" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
			<div class="w-1/2">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Tanggal lahir</label>
				<div class="flex">
					<input v-model="student.birth_date" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="17 Desember 2000" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
		</div>
		<div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">Agama</label>
			<div class="flex">
				<select v-model="student.religion_id" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
					<option :value.int="1">Islam</option>
					<option :value.int="2">Kristen</option>
				</select> 
			</div>
		</div>
		<div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">Alamat Siswa</label>
			<div class="flex">
				<textarea v-model="student.address" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Alamat Siswa" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}"></textarea>
			</div>
		</div>
		<div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">Tep Siswa</label>
			<div class="flex">
				<input v-model="student.telp" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Telp Siswa" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
			</div>
		</div>
		<div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">Sekolah Sebelumnya</label>
			<div class="flex">
				<input v-model="student.school_before" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Sekolah sebelumnya" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
			</div>
		</div>
		<div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">Diterima Di Kelas</label>
			<div class="flex">
				<input v-model="student.accepted_grade" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Diterima Di Kelas" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
			</div>
		</div>
		<div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">Tanggal Diterima</label>
			<div class="flex">
				<input v-model="student.accepted_date" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Tanggal Diterima di Sekolah" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
			</div>
		</div>
		<div class="flex space-x-4 mb-4">
			<div class="w-1/2">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Status Keluarga</label>
				<div class="flex">
					<select v-model="student.familly_status" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
						<option value="1">Anak Kandung</option>
					</select> 
				</div>
			</div>
			<div class="w-1/2">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Anak Ke</label>
				<div class="flex">
					<input v-model.int="student.familly_order" type="number" min="1" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Anak ke" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
		</div>
		<div class="p-2 border-dashed rounded-lg border-2 border-blue-300 mb-4">
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Nama Ayah</label>
				<div class="flex">
					<input v-model="student.father_name" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Ayah" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Alamat Ayah</label>
				<div class="flex">
					<input v-model="student.father_address" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Alamat Ayah" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Pekerjaan Ayah</label>
				<div class="flex">
					<input v-model="student.father_profession" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Pekerjaan Ayah" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Telp Ayah</label>
				<div class="flex">
					<input v-model="student.father_telp" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Telp Ayah" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
		</div>
		<div class="p-2 border-dashed rounded-lg border-2 border-blue-300 mb-4">
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Nama Ibu</label>
				<div class="flex">
					<input v-model="student.mother_name" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Ibu" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Alamat Ibu</label>
				<div class="flex">
					<input v-model="student.mother_address" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Alamat Ibu" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Pekerjaan Ibu</label>
				<div class="flex">
					<input v-model="student.mother_profession" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Pekerjaan Ibu" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Telp Ibu</label>
				<div class="flex">
					<input v-model="student.mother_telp" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Telp Ibu" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
		</div>
		<div class="p-2 border-dashed rounded-lg border-2 border-blue-300 mb-4">
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Nama Wali</label>
				<div class="flex">
					<input v-model="student.grd_name" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Wali" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Alamat Wali</label>
				<div class="flex">
					<input v-model="student.grd_address" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Alamat Wali" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Pekerjaan Wali</label>
				<div class="flex">
					<input v-model="student.grd_profession" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Pekerjaan Wali" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
			<div class="mb-4">
				<label for="" class="text-xs font-semibold text-gray-500 px-1">Telp Wali</label>
				<div class="flex">
					<input v-model="student.grd_telp" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Telp Wali" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'CreateForm',
  computed: {
  	...mapState(['isLoading']),
    ...mapState('student', ['student']),
  }
};
</script>