import httpService from "./http.service";
const tasksEndpoint = "tasks/";

const tasksService = {
    fetchAll: async (page) => {
        const { data } = await httpService.get(`${tasksEndpoint}?page=${page}`);
        return data;
    },
    important: async (id) => {
        await httpService.post(`${tasksEndpoint}${id}/important`);
    },
    notImportant: async (id) => {
        await httpService.post(`${tasksEndpoint}${id}/not-important`);
    },
    urgent: async (id) => {
        await httpService.post(`${tasksEndpoint}${id}/urgent`);
    },
    notUrgent: async (id) => {
        await httpService.post(`${tasksEndpoint}${id}/not-urgent`);
    },
    deleteTask: async (id) => {
        await httpService.delete(`${tasksEndpoint}${id}`);
    },
    restoreTask: async (id) => {
        await httpService.post(`${tasksEndpoint}${id}/restore`);
    },
    completeTask: async (id) => {
        await httpService.post(`${tasksEndpoint}${id}/complete`);
    },
    notCompleteTask: async (id) => {
        await httpService.post(`${tasksEndpoint}${id}/not-complete`);
    },
    sendTask: async (payload) => {
        const temp = await httpService.post("tasks", { description: payload });
        return temp.data;
    }
};
export default tasksService;
