// import axiosInstance from './axiosInstance';

// // All HTTP requests related to POSH Acts
// const poshService = {
//   fetchAllPoshActs: async () => {
//     const res = await axiosInstance.get('/posh/all');
//     return res.data;
//   },

//   fetchAllUserPoshActs: async () => {
//     const res = await axiosInstance.get('/posh/user');
//     return res.data;
//   },

//   fetchPoshActById: async (id) => {
//     const res = await axiosInstance.get(`/posh/${id}`);
//     return res.data;
//   },

//   updateStatus: async (id, status) => {
//     const res = await axiosInstance.put(`/posh/${id}/status`, { status });
//     return res.data;
//   },

//   addComment: async (id, message) => {
//     const res = await axiosInstance.post(`/posh/${id}/comments`, { message });
//     return res.data;
//   },

//   deletePoshAct: async (id) => {
//     await axiosInstance.delete(`/posh/${id}`);
//   },

//     // 1) CREATE a new POSH Act
//     createPoshAct: async (formData) => {
//         // formData includes "accusedId", "type", "description", "dateOfIncident", "attachments"
//         const res = await axiosInstance.post('/posh', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         return res.data; // This is the newly created POSH Act
//       },
    
//       // 2) UPDATE a POSH Act
//       updatePoshAct: async (id, formData) => {
//         const res = await axiosInstance.put(`/posh/${id}`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         return res.data; // This is the updated POSH Act
//       },
    
// };

// export default poshService;
