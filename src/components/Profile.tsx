import React from 'react';
import { useStore } from '../store/useStore';
import {
  BookOpen,
  GraduationCap,
  Settings,
  Star,
  Calendar,
  Clock,
  BarChart3,
  BookMarked
} from 'lucide-react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Avatar,
  Heading,
  Progress,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  Icon,
} from '@chakra-ui/react';
import { Switch, Paper, Group, Title, Stack } from '@mantine/core';

const Profile = () => {
  const { user, currentLevel } = useStore();

  const stats = [
    { label: 'Words Learned', value: '250', icon: BookOpen },
    { label: 'Current Level', value: currentLevel, icon: GraduationCap },
    { label: 'Study Streak', value: '7 days', icon: Star },
    { label: 'Study Time', value: '24h', icon: Clock },
  ];

  const recentVocabulary = [
    { word: 'xin chào', meaning: 'hello', lastReviewed: '2h ago' },
    { word: 'cảm ơn', meaning: 'thank you', lastReviewed: '5h ago' },
    { word: 'tạm biệt', meaning: 'goodbye', lastReviewed: '1d ago' },
    { word: 'không có chi', meaning: "you're welcome", lastReviewed: '1d ago' },
  ];

  const vocabularyLists = [
    { name: 'Greetings', words: 20, progress: 80 },
    { name: 'Food & Drinks', words: 50, progress: 45 },
    { name: 'Numbers', words: 30, progress: 90 },
    { name: 'Family', words: 40, progress: 30 },
  ];

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Profile Header */}
        <Card>
          <CardBody>
            <HStack justify="space-between">
              <HStack spacing={4}>
                <Avatar
                  size="xl"
                  name={user?.email || 'User'}
                  bg="purple.100"
                  color="purple.600"
                />
                <Box>
                  <Heading as="h1" size="lg" fontFamily="serif">
                    {user?.email?.split('@')[0] || 'User'}
                  </Heading>
                  <Text color="gray.600">
                    Joined {new Date(user?.created_at || '').toLocaleDateString()}
                  </Text>
                </Box>
              </HStack>
              <Button leftIcon={<Icon as={Settings} />} variant="outline">
                Settings
              </Button>
            </HStack>
          </CardBody>
        </Card>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardBody>
                <HStack>
                  <Box p={3} borderRadius="lg" bg="purple.50">
                    <Icon as={stat.icon} boxSize={6} color="purple.600" />
                  </Box>
                  <Stat>
                    <StatLabel>{stat.label}</StatLabel>
                    <StatNumber>{stat.value}</StatNumber>
                  </Stat>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Main Content Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md" fontFamily="serif">Recent Vocabulary</Heading>
                <Icon as={Calendar} boxSize={5} color="gray.400" />
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {recentVocabulary.map((item) => (
                  <Paper key={item.word} p="md" withBorder>
                    <Group position="apart">
                      <Box>
                        <Text fontWeight="medium">{item.word}</Text>
                        <Text size="sm" color="gray.600">{item.meaning}</Text>
                      </Box>
                      <Text size="sm" color="gray.500">{item.lastReviewed}</Text>
                    </Group>
                  </Paper>
                ))}
              </VStack>
            </CardBody>
          </Card>

          {/* Vocabulary Lists */}
          <Card>
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md" fontFamily="serif">Vocabulary Lists</Heading>
                <Icon as={BookMarked} boxSize={5} color="gray.400" />
              </HStack>
            </CardHeader>
            <CardBody>
              <Stack spacing="md">
                {vocabularyLists.map((list) => (
                  <Box key={list.name}>
                    <Group position="apart" mb={2}>
                      <Text fontWeight="medium">{list.name}</Text>
                      <Text color="gray.600">{list.words} words</Text>
                    </Group>
                    <Progress value={list.progress} size="sm" colorScheme="purple" />
                  </Box>
                ))}
              </Stack>
            </CardBody>
          </Card>

          {/* Learning Stats */}
          <Card>
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md" fontFamily="serif">Learning Statistics</Heading>
                <Icon as={BarChart3} boxSize={5} color="gray.400" />
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Text mb={2} color="gray.600">Daily Goal Progress</Text>
                  <Progress value={75} size="md" colorScheme="purple" />
                </Box>
                <SimpleGrid columns={2} spacing={4}>
                  <Paper p="md" withBorder bg="purple.50">
                    <Text size="sm" color="purple.600">Words per Day</Text>
                    <Title order={2} color="purple.700">15</Title>
                  </Paper>
                  <Paper p="md" withBorder bg="purple.50">
                    <Text size="sm" color="purple.600">Accuracy</Text>
                    <Title order={2} color="purple.700">92%</Title>
                  </Paper>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md" fontFamily="serif">Account Settings</Heading>
                <Icon as={Settings} boxSize={5} color="gray.400" />
              </HStack>
            </CardHeader>
            <CardBody>
              <Stack spacing="md">
                <Paper p="md" withBorder>
                  <Group position="apart">
                    <Box>
                      <Text fontWeight="medium">Email Notifications</Text>
                      <Text size="sm" color="gray.600">Daily reminders and updates</Text>
                    </Box>
                    <Switch defaultChecked size="md" />
                  </Group>
                </Paper>
                <Paper p="md" withBorder>
                  <Group position="apart">
                    <Box>
                      <Text fontWeight="medium">Study Reminders</Text>
                      <Text size="sm" color="gray.600">Daily practice notifications</Text>
                    </Box>
                    <Switch defaultChecked size="md" />
                  </Group>
                </Paper>
              </Stack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Profile;
