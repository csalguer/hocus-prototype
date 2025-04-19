import React, { useState } from 'react';
import { Search, Volume2 } from 'lucide-react';
import {
  Box,
  Container,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Text,
  Button,
  Flex,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { Paper } from '@mantine/core';

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Paper p={8} radius="xl" withBorder>
          <Heading as="h1" size="lg" fontFamily="serif" mb={6}>
            Vietnamese Dictionary
          </Heading>
          
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={Search} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search for a word..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              variant="filled"
              _focus={{
                borderColor: 'purple.500',
                bg: 'white',
              }}
            />
          </InputGroup>
        </Paper>

        <Paper p={8} radius="xl" withBorder>
          <Flex justify="space-between" align="flex-start" mb={6}>
            <Box>
              <Heading as="h2" size="lg" fontFamily="serif">
                xin chào
              </Heading>
              <Text fontSize="lg" color="gray.600" mt={1}>
                sin chow
              </Text>
            </Box>
            <Button
              variant="ghost"
              p={3}
              borderRadius="full"
              _hover={{ bg: 'gray.100' }}
            >
              <Icon as={Volume2} boxSize={6} color="purple.600" />
            </Button>
          </Flex>
          
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading as="h3" size="md" fontFamily="serif" mb={2}>
                Definition
              </Heading>
              <Text fontSize="lg" color="gray.600">
                hello; hi (greeting)
              </Text>
            </Box>
            
            <Divider />
            
            <Box>
              <Heading as="h3" size="md" fontFamily="serif" mb={2}>
                Example
              </Heading>
              <Text fontSize="lg" color="gray.800" mb={1}>
                Xin chào, bạn khỏe không?
              </Text>
              <Text fontSize="lg" color="gray.600">
                Hello, how are you?
              </Text>
            </Box>
          </VStack>
        </Paper>
      </VStack>
    </Container>
  );
};

export default Dictionary;
