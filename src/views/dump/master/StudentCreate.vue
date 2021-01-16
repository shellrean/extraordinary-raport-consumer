<template>
  <div class="container md:mx-auto flex flex-col justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
    <div class="bg-white w-full lg:w-1/2 py-4 px-4 rounded-lg shadow border border-gray-300">
      <p class="text-gray-500 text-2xl mb-2 font-medium">Biodata Siswa</p>
      <hr>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">NIS</label>
        <div class="flex">
          <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa">
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">NISN</label>
        <div class="flex">
          <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional">
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Nama Lengkap</label>
        <div class="flex">
          <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Lengkap Siswa">
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Jenis Kelamin</label>
        <div class="flex">
          <select class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional">
            <option>Laki laki</option>
            <option>Perempuan</option>
          </select> 
        </div>
      </div>
      <div class="flex space-x-4 mb-4">
        <div class="w-1/2">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Kota lahir</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Jakarta">
          </div>
        </div>
        <div class="w-1/2">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Tanggal lahir</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="17 Desember 2000">
          </div>
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Agama</label>
        <div class="flex">
          <select class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional">
            <option>Islam</option>
            <option>Kristen</option>
          </select> 
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Alamat Siswa</label>
        <div class="flex">
          <textarea type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Alamat Siswa"></textarea>
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Tep Siswa</label>
        <div class="flex">
          <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Telp Siswa">
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Sekolah Sebelumnya</label>
        <div class="flex">
          <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Sekolah sebelumnya">
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Diterima Di Kelas</label>
        <div class="flex">
          <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Diterima Di Kelas">
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Tanggal Diterima</label>
        <div class="flex">
          <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Tanggal Diterima di Sekolah">
        </div>
      </div>
      <div class="flex space-x-4 mb-4">
        <div class="w-1/2">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Status Keluarga</label>
          <div class="flex">
            <select class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional">
              <option>Anak Kandung</option>
              <option>Kristen</option>
            </select> 
          </div>
        </div>
        <div class="w-1/2">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Anak Ke</label>
          <div class="flex">
            <input type="number" min="1" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Anak ke ">
          </div>
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Status Keluarga</label>
        <div class="flex">
          <select class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nomor Induk Siswa Nasional">
            <option>Anak Kandung</option>
            <option>Kristen</option>
          </select> 
        </div>
      </div>
      <div class="mb-4">
        <label for="" class="text-xs font-semibold text-gray-500 px-1">Anak ke</label>
        <div class="flex">
          <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Tanggal Diterima di Sekolah">
        </div>
      </div>
      <div class="p-2 border-dashed rounded-lg border-2 border-blue-300 mb-4">
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Nama Ayah</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Ayah">
          </div>
        </div>
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Alamat Ayah</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Alamat Ayah">
          </div>
        </div>
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Pekerjaan Ayah</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Pekerjaan Ayah">
          </div>
        </div>
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Telp Ayah</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Telp Ayah">
          </div>
        </div>
      </div>
      <div class="p-2 border-dashed rounded-lg border-2 border-blue-300 mb-4">
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Nama Ibu</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Ibu">
          </div>
        </div>
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Alamat Ibu</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Alamat Ibu">
          </div>
        </div>
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Pekerjaan Ibu</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Pekerjaan Ibu">
          </div>
        </div>
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Telp Ibu</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Telp Ibu">
          </div>
        </div>
      </div>
      <div class="p-2 border-dashed rounded-lg border-2 border-blue-300 mb-4">
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Nama Wali</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Nama Wali">
          </div>
        </div>
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Alamat Wali</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Alamat Wali">
          </div>
        </div>
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Pekerjaan Wali</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Pekerjaan Wali">
          </div>
        </div>
        <div class="mb-4">
          <label for="" class="text-xs font-semibold text-gray-500 px-1">Telp Wali</label>
          <div class="flex">
            <input type="text" class="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-300" placeholder="Telp Wali">
          </div>
        </div>
      </div>
      <button class="py-1 px-4 hover:shadow-xl bg-gray-200 text-gray-500 font-semibold mb-2 text-white rounded-l-lg border-2 border-gray-300 ">Batal</button>
      <button class="py-1 px-4 hover:shadow-xl bg-green-200 text-green-500 font-semibold mb-2 text-white rounded-r-lg border-2 border-green-300 ">Simpan</button>
    </div>
  </div>
</template>