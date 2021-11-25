import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useState } from "react";

import { Link, Box, Th, Text, Td, Thead, Checkbox, Tbody, Table, Tr, Button, Spinner, Flex, Heading, Icon, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from '../../components/Pagination'

import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

type User = {
  id: string,
  email: string,
  createdAt: string,
}
interface UserListProps {
  users: User[];
}

//export default function UserList({ users }: UserListProps) {
export default function UserList() {
  const [page, setPage] = useState(1);

  // const { data, isLoading, isFetching, error } = useUsers(page, {
  //   initialData: users,
  // })

  const { data, isLoading, isFetching, error } = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handlePrefetchUser = async (userId: string) => {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`);
      return response.data;
    }, {
      staleTime: 1000 * 60 * 10 //10 minutos
    })
  }

  return (
    <Box>
      <Header />
      <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6' >
        <Sidebar />

        <Box flex='1' borderRadius={8} bg="gray.800" p='8' >
          <Flex mb='8' justify="space-between" align="center">
            <Heading size='lg' fontWeight='normal'>
              Usuários
              {!isLoading && isFetching && <Spinner
                size='sm'
                color='gray.500'
                ml='4'
              />}
            </Heading>

            <NextLink href='/users/create' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
              >
                Criar novo
              </Button>
            </NextLink>


          </Flex>
          {isLoading ? (
            <Flex justify="center" ><Spinner /></Flex>
          ) : error ? (
            <Flex justify="center" ><Text>Falha ao obter dados dos usuários</Text></Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha" >
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color='gray.300' w='8' >
                      <Checkbox colorScheme="pink" />

                    </Th>
                    <Th>Usuários</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th w='8'></Th>
                  </Tr>

                </Thead>

                <Tbody>
                  {data.users.map(user => (
                    <>
                      <Tr key={user.id}>
                        <Td px={['4', '4', '6']} >
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link color='purple.400' onMouseEnter={() => handlePrefetchUser(user.id)}>
                              <Text fontWeight='bold'>{user.name}</Text>
                            </Link>
                            <Text fontSize='sm' color="gray.300" >{user.email}</Text>
                          </Box>
                        </Td>

                        {isWideVersion && <Td>{user.createdAt}</Td>}

                        {!!isWideVersion && (
                          <Td>
                            <Button
                              as='a'
                              size='sm'
                              fontSize='sm'
                              colorScheme='purple'
                              leftIcon={<Icon as={RiPencilLine} fontSize='16' />}
                            >
                              Editar
                            </Button>
                          </Td>
                        )}

                      </Tr>
                    </>
                  ))}
                </Tbody>

              </Table >

              <Pagination
                currentPage={page}
                totalCountOfRegisters={data.totalCount}
                onPageChange={setPage}
              />
            </>
          )
          }


        </Box >
      </Flex >
    </Box >
  )

}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1);

//   return {
//     props: {
//       users,
//     }
//   }
// }