import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ITask {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    imgUrl?: string;
}

interface IStoreState {
    tasks: ITask[];
    editingTask: ITask | null;
    addTask: (name: string, description: string) => void;
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
    updateTask: (task: ITask) => void;
    setEditingTask: (task: ITask | null) => void;
    deleteTask: (id: number) => void;
}

const useStore = create<IStoreState>()(
    devtools(
        persist(
            (set) => ({
                tasks: [],
                editingTask: null,
                addTask: (name: string, description: string) =>
                    set((state) => {
                        const task = {
                            id: state.tasks.length + 1,
                            name: name,
                            description: description,
                            completed: false,
                        };
                        console.log(task);
                        return { tasks: [...state.tasks, task] };
                    }),
                removeTask: (id: number) =>
                    set((state) => ({
                        tasks: state.tasks.filter((task) => task.id !== id),
                    })),
                toggleTask: (id: number) =>
                    set((state) => ({
                        tasks: state.tasks.map((task) =>
                            task.id === id
                                ? { ...task, completed: !task.completed }
                                : task
                        ),
                    })),
                updateTask: (updatedTask: ITask) => {
                    set((state) => ({
                        tasks: state.tasks.map((task) =>
                            task.id === updatedTask.id
                                ? {
                                      ...task,
                                      name: updatedTask.name,
                                      description: updatedTask.description,
                                  }
                                : task
                        ),
                    }));
                },
                setEditingTask: (task: ITask | null) => {
                    set((state) => ({
                        editingTask: task,
                    }));
                },
                deleteTask: (id: number) =>
                    set((state) => ({
                        tasks: state.tasks.filter((task) => task.id !== id),
                    })),
            }),
            {
                name: "task-store",
                getStorage: () => localStorage,
            }
        )
    )
);

export default useStore;
