export interface Task {
    id: number ;
    title: string;
    description: string;
    state: string; // Puede ser 'pendiente', 'en progreso' o 'terminada'
    create_date: Date | null;
    update_date: Date | null;
    user_id: number;
}