import { useState, useEffect } from "react";
import { ITask } from "../../app/types";
import s from "./Task.module.scss";

interface TaskProps extends ITask {
    onUpdate: (task: ITask) => void;
    onDelete: (id: string) => void;
}

export let Task = ({ id, description, done, onUpdate, onDelete }: TaskProps) => {
    let [isEditing, setIsEditing] = useState(false);
    let [editedDescription, setEditedDescription] = useState(description);
    let [error, setError] = useState<string | null>(null);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isEditing) {
            setEditedDescription(description);
        }
    }, [isEditing, description]);

    let handleToggleDone = async () => {
        setIsLoading(true);
        try {
            await onUpdate({ id, description, done: !done });
        } catch (err) {
            console.error(err);
            setError("Ошибка при обновлении задачи");
        } finally {
            setIsLoading(false);
        }
    };

    let handleEdit = () => {
        setIsEditing(true);
    };

    let handleSave = async () => {
        if (!editedDescription.trim()) {
            setError("Описание не может быть пустым");
            return;
        }

        setIsLoading(true);
        try {
            await onUpdate({ id, description: editedDescription, done });
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            setError("Ошибка при сохранении задачи");
        } finally {
            setIsLoading(false);
        }
    };

    let handleDelete = async () => {
        setIsLoading(true);
        try {
            await onDelete(id);
        } catch (err) {
            console.error(err);
            setError("Ошибка при удалении задачи");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <li className={s.task}>
            <input 
                type="checkbox" 
                checked={done} 
                onChange={handleToggleDone} 
                disabled={isLoading}
            />
            {isEditing ? (
                <input 
                    type="text" 
                    value={editedDescription} 
                    onChange={(e) => setEditedDescription(e.target.value)} 
                    disabled={isLoading}
                />
            ) : (
                <span>{description}</span>
            )}
            {error && <div className={s.error}>{error}</div>}
            <div className={s.actions}>
                {isEditing ? (
                    <button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                ) : (
                    <button onClick={handleEdit} disabled={isLoading}>
                        Edit
                    </button>
                )}
                <button onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? "Deleting..." : "Delete"}
                </button>
            </div>
        </li>
    );
};