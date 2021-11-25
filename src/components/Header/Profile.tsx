import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}
export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr='4' textAlign='right'>
          <Text>André Souza</Text>
          <Text
            color='gray.300'
            fontSize='small'
          >
            andresouza@predialnet.com.br
          </Text>
        </Box>
      )}


      <Avatar size='md' name='André Souza' src='https://github.com/als260502.png' />

    </Flex>
  )
}