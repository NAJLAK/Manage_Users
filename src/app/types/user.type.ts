export interface UserType {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
  
  export interface HttpUsersListResponse {
    data: UserType[];
    total: number;
    per_page: number;
    current_page: number;
  }
  
  