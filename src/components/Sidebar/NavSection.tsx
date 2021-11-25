import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";


interface NavProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }) {
  return (
    <Box>
      <Text fontWeight='bold' color='gray.400' fontSize='small' >{title}</Text>
      <Stack spacing='4' align='stretch' mt='8'>

        {children}

      </Stack>
    </Box>
  )
}