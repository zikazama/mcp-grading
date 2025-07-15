 import axios from "axios";

const BASE_URL = "http://localhost:3000";

export class BackendGradingService {
  // Siswa
  static async getAllSiswa() {
    const res = await axios.get(`${BASE_URL}/siswa`);
    return res.data;
  }
  static async getSiswaById(id: number) {
    const res = await axios.get(`${BASE_URL}/siswa/${id}`);
    return res.data;
  }
  static async createSiswa(nama: string) {
    const res = await axios.post(`${BASE_URL}/siswa`, { nama });
    return res.data;
  }
  static async updateSiswa(id: number, nama: string) {
    const res = await axios.put(`${BASE_URL}/siswa/${id}`, { nama });
    return res.data;
  }
  static async deleteSiswa(id: number) {
    await axios.delete(`${BASE_URL}/siswa/${id}`);
    return { success: true };
  }

  // Mapel
  static async getAllMapel() {
    const res = await axios.get(`${BASE_URL}/mapel`);
    return res.data;
  }
  static async getMapelById(id: number) {
    const res = await axios.get(`${BASE_URL}/mapel/${id}`);
    return res.data;
  }
  static async createMapel(nama: string) {
    const res = await axios.post(`${BASE_URL}/mapel`, { nama });
    return res.data;
  }
  static async updateMapel(id: number, nama: string) {
    const res = await axios.put(`${BASE_URL}/mapel/${id}`, { nama });
    return res.data;
  }
  static async deleteMapel(id: number) {
    await axios.delete(`${BASE_URL}/mapel/${id}`);
    return { success: true };
  }

  // Penilaian
  static async getAllPenilaian() {
    const res = await axios.get(`${BASE_URL}/penilaian`);
    return res.data;
  }
  static async getPenilaianById(id: number) {
    const res = await axios.get(`${BASE_URL}/penilaian/${id}`);
    return res.data;
  }
  static async createPenilaian(siswaId: number, mapelId: number, nilai: number) {
    const res = await axios.post(`${BASE_URL}/penilaian`, { siswaId, mapelId, nilai });
    return res.data;
  }
  static async updatePenilaian(id: number, siswaId: number, mapelId: number, nilai: number) {
    const res = await axios.put(`${BASE_URL}/penilaian/${id}`, { siswaId, mapelId, nilai });
    return res.data;
  }
  static async deletePenilaian(id: number) {
    await axios.delete(`${BASE_URL}/penilaian/${id}`);
    return { success: true };
  }
} 