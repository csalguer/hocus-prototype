import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { GraduationCap, Book, Mic, User, BookOpen } from 'lucide-react';
import { useStore } from '../store/useStore';
import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
} from '@chakra-ui/react';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated } = useStore();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: GraduationCap },
    { path: '/dictionary', label: 'Dictionary', icon: Book },
    { path: '/practice', label: 'Practice', icon: Mic },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <Box bg="white" borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <HStack spacing={2}>
              <Icon as={BookOpen} boxSize={8} color="purple.600" />
              <Text fontSize="xl" fontFamily="serif" fontWeight="medium" color="gray.900">
                VietLearn AI
              </Text>
            </HStack>
          </Link>

          <HStack spacing={4}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                px={3}
                py={2}
                rounded="md"
                fontSize="sm"
                fontWeight="medium"
                display="flex"
                alignItems="center"
                color={location.pathname === item.path ? 'purple.700' : 'gray.600'}
                bg={location.pathname === item.path ? 'purple.50' : 'transparent'}
                _hover={{
                  bg: 'purple.50',
                  color: 'purple.700',
                  textDecoration: 'none',
                }}
              >
                <Icon as={item.icon} boxSize={4} mr={1} />
                <Text>{item.label}</Text>
              </Link>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
