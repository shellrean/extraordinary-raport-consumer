<template>
  <div>
    <div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">Tipe</label>
			<div class="flex">
				<select v-model="plan.type" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
					<option value="task">Tugas</option>
					<option value="evms">Evaluasi Tengah Semester</option>
          <option value="evls">Evaluasi Akhir Semester</option>
          <option value="exam">Ulangan</option>
				</select> 
			</div>
		</div>
    <div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">Kelas</label>
			<div class="flex">
				<select v-model="plan.classroomAcademicID" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
					<option v-for="(classroom, index) in filteredClassroom" :value="classroom.classroomAcademicID">{{ classroom.classroomName}}</option>
				</select> 
			</div>
		</div>
    <div class="mb-4">
			<label for="" class="text-xs font-semibold text-gray-500 px-1">Matpel</label>
			<div class="flex">
				<select v-model="plan.classroomSubjectID" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
					<option v-for="(subject, index) in filteredSubject" :value="subject.id">{{ subject.subjectName}}</option>
				</select> 
			</div>
		</div>
    <div class="mb-4">
      <label for="" class="text-xs font-semibold text-gray-500 px-1">Nama</label>
      <div class="flex">
        <input v-model="plan.name" type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
      </div>
    </div>
    <div class="mb-4">
      <label for="" class="text-xs font-semibold text-gray-500 px-1">Deskripsi</label>
      <div class="flex">
        <textarea v-model="plan.desc" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Deskripsi" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}"></textarea>
      </div>
    </div>
    <div class="mb-4">
      <label for="" class="text-xs font-semibold text-gray-500 px-1">Jumlah penilaian</label>
      <div class="flex">
        <input v-model.number="plan.countPlan" type="number" min="1" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Jumlah penilaian" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
      </div>
    </div>
    <div class="mb-4">
      <label for="" class="text-xs font-semibold text-gray-500 px-1">Point maksimal</label>
      <div class="flex">
        <input v-model.number="plan.maxPoint" type="number" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Point maksimal" required="" :readonly="isLoading" :class="{'bg-gray-200' : isLoading}">
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SubjectPlanForm',
  computed: {
    ...mapState(['isLoading']),
    ...mapState('subject_plan', ['plan']),
    ...mapState('academic_classroom', ['classrooms']),
    ...mapState('academic_subject', ['subjects']),
    filteredClassroom() {
      if (this.subjects == null || this.subjects == undefined) {
        return []
      }
      const result = []
      const map = new Map()
      for (const item of this.subjects) {
        if(!map.has(item.classroomAcademicID)) {
          map.set(item.classroomAcademicID, true);
          result.push(item)
        }
      }
      return result;
    },
    filteredSubject() {
      if (this.subjects == null || this.subjects == undefined) {
        return []
      }
      let result = []
      result = this.subjects.filter((item) => item.classroomAcademicID == this.plan.classroomAcademicID)

      return result
    }
  }
};
</script>