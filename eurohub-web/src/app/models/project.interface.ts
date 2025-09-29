export interface Project {
  id: number;
  name: string;
  description: string;
  objective: string;
  category: string;
  status: 'Em andamento' | 'Concluído' | 'Pausado' | 'Cancelado';
  priority?: 'Baixa' | 'Média' | 'Alta';
  cost?: number;
  budget?: number;
  createdDate: string;
  deliveryDate: string;
  lastUpdate: string;
  progress: number;
  members: Member[];
  supportedBy?: Member;
  activities: Activity[];
  tags?: string[];
  isArchived?: boolean;
}

export interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  email?: string;
  department?: string;
  isActive?: boolean;
}

export interface Activity {
  id: number;
  description: string;
  date: string;
  user: string;
  type?: 'created' | 'updated' | 'member_added' | 'status_changed' | 'comment';
}

export interface Category {
  id: number;
  name: string;
  color?: string;
  icon?: string;
  description?: string;
  isActive?: boolean;
}

export interface ProjectStats {
  total: number;
  active: number;
  completed: number;
  paused: number;
  cancelled: number;
  overdue: number;
  totalBudget: number;
  spentBudget: number;
}