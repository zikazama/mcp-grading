import { FastMCP } from "fastmcp";
import { z } from "zod";
import * as services from "./services/index.js";

/**
 * Register all tools with the MCP server
 * 
 * @param server The FastMCP server instance
 */
export function registerTools(server: FastMCP) {
  // Greeting tool
  server.addTool({
    name: "hello_world",
    description: "A simple hello world tool",
    parameters: z.object({
      name: z.string().describe("Name to greet")
    }),
    execute: async (params) => {
      const greeting = services.GreetingService.generateGreeting(params.name);
      return greeting;
    }
  });

  // Farewell tool
  server.addTool({
    name: "goodbye",
    description: "A simple goodbye tool",
    parameters: z.object({
      name: z.string().describe("Name to bid farewell to")
    }),
    execute: async (params) => {
      const farewell = services.GreetingService.generateFarewell(params.name);
      return farewell;
    }
  });

  // Siswa tools
  server.addTool({
    name: "get_all_siswa",
    description: "Ambil semua data siswa dari backend-grading",
    parameters: z.object({}),
    execute: async () => {
      const result = await services.BackendGradingService.getAllSiswa();
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "get_siswa_by_id",
    description: "Ambil detail siswa berdasarkan ID dari backend-grading",
    parameters: z.object({ id: z.number() }),
    execute: async ({ id }) => {
      const result = await services.BackendGradingService.getSiswaById(id);
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "create_siswa",
    description: "Tambah siswa baru ke backend-grading",
    parameters: z.object({ nama: z.string() }),
    execute: async ({ nama }) => {
      const result = await services.BackendGradingService.createSiswa(nama);
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "update_siswa",
    description: "Update data siswa di backend-grading",
    parameters: z.object({ id: z.number(), nama: z.string() }),
    execute: async ({ id, nama }) => {
      const result = await services.BackendGradingService.updateSiswa(id, nama);
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "delete_siswa",
    description: "Hapus siswa dari backend-grading",
    parameters: z.object({ id: z.number() }),
    execute: async ({ id }) => {
      await services.BackendGradingService.deleteSiswa(id);
      return JSON.stringify({ success: true });
    }
  });

  // Mapel tools
  server.addTool({
    name: "get_all_mapel",
    description: "Ambil semua data mata pelajaran dari backend-grading",
    parameters: z.object({}),
    execute: async () => {
      const result = await services.BackendGradingService.getAllMapel();
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "get_mapel_by_id",
    description: "Ambil detail mata pelajaran berdasarkan ID dari backend-grading",
    parameters: z.object({ id: z.number() }),
    execute: async ({ id }) => {
      const result = await services.BackendGradingService.getMapelById(id);
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "create_mapel",
    description: "Tambah mata pelajaran baru ke backend-grading",
    parameters: z.object({ nama: z.string() }),
    execute: async ({ nama }) => {
      const result = await services.BackendGradingService.createMapel(nama);
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "update_mapel",
    description: "Update data mata pelajaran di backend-grading",
    parameters: z.object({ id: z.number(), nama: z.string() }),
    execute: async ({ id, nama }) => {
      const result = await services.BackendGradingService.updateMapel(id, nama);
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "delete_mapel",
    description: "Hapus mata pelajaran dari backend-grading",
    parameters: z.object({ id: z.number() }),
    execute: async ({ id }) => {
      await services.BackendGradingService.deleteMapel(id);
      return JSON.stringify({ success: true });
    }
  });

  // Penilaian tools
  server.addTool({
    name: "get_all_penilaian",
    description: "Ambil semua data penilaian dari backend-grading",
    parameters: z.object({}),
    execute: async () => {
      const result = await services.BackendGradingService.getAllPenilaian();
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "get_penilaian_by_id",
    description: "Ambil detail penilaian berdasarkan ID dari backend-grading",
    parameters: z.object({ id: z.number() }),
    execute: async ({ id }) => {
      const result = await services.BackendGradingService.getPenilaianById(id);
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "create_penilaian",
    description: "Tambah penilaian baru ke backend-grading",
    parameters: z.object({ siswaId: z.number(), mapelId: z.number(), nilai: z.number() }),
    execute: async ({ siswaId, mapelId, nilai }) => {
      const result = await services.BackendGradingService.createPenilaian(siswaId, mapelId, nilai);
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "update_penilaian",
    description: "Update data penilaian di backend-grading",
    parameters: z.object({ id: z.number(), siswaId: z.number(), mapelId: z.number(), nilai: z.number() }),
    execute: async ({ id, siswaId, mapelId, nilai }) => {
      const result = await services.BackendGradingService.updatePenilaian(id, siswaId, mapelId, nilai);
      return JSON.stringify({ data: result });
    }
  });
  server.addTool({
    name: "delete_penilaian",
    description: "Hapus penilaian dari backend-grading",
    parameters: z.object({ id: z.number() }),
    execute: async ({ id }) => {
      await services.BackendGradingService.deletePenilaian(id);
      return JSON.stringify({ success: true });
    }
  });
}