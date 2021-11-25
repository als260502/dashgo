import { useQuery, UseQueryOptions } from "react-query"
import { api } from "../api"

interface User {
  id: string,
  name: string,
  email: string,
  createdAt: string,
}

interface GetUserResponse {
  users: User[];
  totalCount: number;
}

// export const useUsers = (page: number, options) => {
//   return useQuery(['users', page], () => getUsers(page), {
//     staleTime: 1000 * 60 * 10, //10 minutos
//     ...options,
//   })
// }

export const useUsers = (page: number) => {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, //10 minutos
  })
}

export const getUsers = async (page: number): Promise<GetUserResponse> => {
  const { data, headers } = await api.get<Omit<GetUserResponse, 'totalCount'>>('users', {
    params: {
      page,
    }
  })

  const totalCount = Number(headers['x-total-count'])


  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),

    }
  })
  return { users, totalCount };
}
