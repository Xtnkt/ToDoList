import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '3fdc7600-2a32-4ea4-863f-5d53cc3a76c7',
    },
})

type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseType<T = {}> = {
    data: T,
    fieldsErrors: string[],
    messages: string[],
    resultCode: number,
}
type GetTasksResponse = {
    items: TasksType[],
    totalCount: number,
    error: string
}
type TasksType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number
    addedDate: string,
}
type UpdateTaskType = {
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
}

export const todolistAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todo-lists')
            .then((res) => res.data)
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title})
            .then((res) => res.data)
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
            .then((res) => res.data)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
            .then((res) => res.data)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
            .then((res) => res.data)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<TasksType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
            .then((res) => res.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then((res) => res.data)
    },
    updateTaskTitle(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType<TasksType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
            .then((res) => res.data)
    }
}
