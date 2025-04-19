import React from 'react';
import { Book, BookOpen, Mic, Trophy, Brain, Sparkles, Slash as FlashCard, Repeat, GraduationCap } from 'lucide-react';
import { useStore } from '../store/useStore';
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Icon,
  Progress,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Button,
  Stack,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { Paper } from '@mantine/core';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const Dashboard = () => {
  const { currentLevel } = useStore();

  const progressCards = [
    { title: 'Vocabulary', icon: Book, count: '250', total: '1000' },
    { title: 'Grammar', icon: BookOpen, count: '15', total: '50' },
    { title: 'Speaking', icon: Mic, count: '10', total: '30' },
  ];

  const features = [
    {
      icon: FlashCard,
      title: 'Smart Flashcards',
      description: 'Adaptive spaced repetition system that optimizes your learning schedule'
    },
    {
      icon: Book,
      title: 'Comprehensive Definitions',
      description: 'Detailed explanations with usage examples and cultural context'
    },
    {
      icon: Repeat,
      title: 'Rote Practice',
      description: 'Scientifically proven repetition techniques for lasting retention'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={12} align="stretch" as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
        {/* Hero Section */}
        <MotionBox 
          variants={itemVariants}
          py={16}
          px={8}
          bg="white"
          rounded="2xl"
          shadow="xl"
          borderWidth="1px"
          borderColor="purple.100"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-10%"
            right="-5%"
            w="400px"
            h="400px"
            bg="purple.50"
            rounded="full"
            filter="blur(60px)"
            opacity={0.6}
          />
          
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            spacing={12}
            align="center"
            justify="space-between"
            position="relative"
          >
            <Box maxW={{ base: 'full', lg: '60%' }}>
              <Badge
                colorScheme="purple"
                px={3}
                py={1}
                rounded="full"
                fontSize="sm"
                mb={6}
              >
                The Smart Way to Learn Vietnamese
              </Badge>
              <Heading
                as="h1"
                fontSize={{ base: '4xl', lg: '6xl' }}
                fontFamily="Fraunces"
                lineHeight="1.1"
                mb={6}
                bgGradient="linear(to-r, purple.700, purple.500)"
                bgClip="text"
              >
                Master Vietnamese Through Proven Methods
              </Heading>
              <Text fontSize="xl" color="gray.600" mb={8} lineHeight="tall">
                Our research-backed platform combines smart flashcards, comprehensive definitions, and systematic repetition to help you achieve Vietnamese fluency with confidence.
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Button
                  size="lg"
                  colorScheme="purple"
                  leftIcon={<Icon as={Brain} />}
                  px={8}
                  height="56px"
                  fontSize="lg"
                >
                  Start Learning Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="purple"
                  leftIcon={<Icon as={GraduationCap} />}
                  px={8}
                  height="56px"
                  fontSize="lg"
                >
                  View Curriculum
                </Button>
              </Stack>
            </Box>
            <Box 
              maxW={{ base: 'full', lg: '40%' }}
              position="relative"
            >
              <SimpleGrid columns={2} spacing={6}>
                {features.map((feature, index) => (
                  <Card
                    key={feature.title}
                    gridColumn={index === features.length - 1 ? '1 / -1' : 'auto'}
                    as={motion.div}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardBody>
                      <VStack align="start" spacing={4}>
                        <Box p={3} bg="purple.50" rounded="lg">
                          <Icon as={feature.icon} boxSize={6} color="purple.500" />
                        </Box>
                        <Box>
                          <Text fontWeight="bold" fontSize="lg" mb={2}>
                            {feature.title}
                          </Text>
                          <Text color="gray.600">
                            {feature.description}
                          </Text>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </MotionBox>

        {/* Progress Overview */}
        <MotionCard variants={itemVariants}>
          <CardBody>
            <Box 
              p={6} 
              rounded="xl" 
              bg="linear-gradient(to right, purple.500, purple.600)"
              color="white"
            >
              <Flex alignItems="center" justifyContent="space-between">
                <Box>
                  <Heading as="h2" size="xl" fontFamily="Fraunces" mb={2}>
                    Welcome back!
                  </Heading>
                  <Text fontSize="lg" opacity={0.9}>
                    Current Level: <Text as="span" fontWeight="medium">{currentLevel}</Text>
                  </Text>
                </Box>
                <Icon as={Trophy} boxSize={16} color="yellow.300" />
              </Flex>
            </Box>
          </CardBody>
        </MotionCard>

        {/* Progress Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {progressCards.map((card, index) => (
            <MotionCard
              key={card.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <HStack justify="space-between">
                    <Heading size="md" fontFamily="Fraunces">{card.title}</Heading>
                    <Icon as={card.icon} boxSize={6} color="purple.600" />
                  </HStack>
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" color="gray.600">Progress</Text>
                      <Text fontSize="sm" fontWeight="medium">
                        {card.count}/{card.total}
                      </Text>
                    </HStack>
                    <Progress
                      value={(parseInt(card.count) / parseInt(card.total)) * 100}
                      colorScheme="purple"
                      rounded="full"
                      size="sm"
                    />
                  </Box>
                </VStack>
              </CardBody>
            </MotionCard>
          ))}
        </SimpleGrid>

        {/* Recent Activity and Suggestions */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <MotionCard variants={itemVariants}>
            <CardHeader>
              <Heading size="md" fontFamily="Fraunces">Recent Lessons</Heading>
            </CardHeader>
            <CardBody>
              <Paper p="md" withBorder shadow="sm">
                <Text color="gray.600">No recent lessons</Text>
              </Paper>
            </CardBody>
          </MotionCard>

          <MotionCard variants={itemVariants}>
            <CardHeader>
              <Heading size="md" fontFamily="Fraunces">Practice Suggestions</Heading>
            </CardHeader>
            <CardBody>
              <Paper p="md" withBorder shadow="sm">
                <Text color="gray.600">No suggestions available</Text>
              </Paper>
            </CardBody>
          </MotionCard>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Dashboard;
