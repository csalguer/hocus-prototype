import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, GraduationCap, Slash as FlashCard, Book, Repeat, CheckCircle, Volume2 } from 'lucide-react';
import {
  Box,
  Container,
  VStack,
  Text,
  Icon,
  Card,
  CardBody,
  Heading,
  Button,
  Stack,
  SimpleGrid,
  Badge,
  Flex,
  Image,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Landing = () => {
  const navigate = useNavigate();
  
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

  const examples = [
    {
      type: 'flashcard',
      title: 'Vocabulary Flashcard',
      content: {
        front: 'xin chào',
        back: {
          translation: 'hello',
          pronunciation: 'sin chow',
          usage: 'Formal greeting, can be used any time of day'
        }
      }
    },
    {
      type: 'definition',
      title: 'Detailed Definition',
      word: 'cảm ơn',
      content: {
        translation: 'thank you',
        pronunciation: 'kahm un',
        usage: 'Expressing gratitude',
        examples: [
          'Cảm ơn bạn nhiều! - Thank you very much!',
          'Không có gì - You\'re welcome'
        ]
      }
    },
    {
      type: 'quiz',
      title: 'Practice Question',
      content: {
        question: 'What is the correct meaning of "xin chào"?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
        correct: 0
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
    <Box bg="gray.50">
      <Container maxW="container.xl" py={16}>
        <VStack spacing={20} as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
          {/* Hero Section */}
          <MotionBox
            w="full"
            variants={itemVariants}
            position="relative"
            overflow="hidden"
          >
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              spacing={12}
              align="center"
              justify="space-between"
            >
              <Box maxW={{ base: 'full', lg: '50%' }}>
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
                  Master Vietnamese Through Science-Backed Methods
                </Heading>
                <Text fontSize="xl" color="gray.600" mb={8} lineHeight="tall">
                  Our research-backed platform combines smart flashcards, comprehensive definitions, and systematic repetition to help you achieve Vietnamese fluency with confidence.
                </Text>
                <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                  <Button
                    size="lg"
                    colorScheme="purple"
                    leftIcon={<Icon as={Brain} />}
                    px={8}
                    height="56px"
                    fontSize="lg"
                    onClick={() => navigate('/dashboard')}
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
                maxW={{ base: 'full', lg: '45%' }}
                position="relative"
              >
                <Image
                  src="https://images.unsplash.com/photo-1606791405792-1004f1fa9e85?auto=format&fit=crop&w=800&q=80"
                  alt="Learning Vietnamese"
                  rounded="2xl"
                  shadow="2xl"
                />
              </Box>
            </Stack>
          </MotionBox>

          {/* New ProductFeature Container */}
          <MotionBox
            variants={itemVariants}
            w="full"
            bg="white"
            rounded="3xl"
            shadow="xl"
            overflow="hidden"
            borderWidth="1px"
            borderColor="purple.100"
          >
            <SimpleGrid columns={{ base: 1, lg: 2 }}>
              <Box p={{ base: 8, lg: 16 }}>
                <VStack align="start" spacing={8}>
                  <Badge
                    colorScheme="purple"
                    px={3}
                    py={1}
                    rounded="full"
                    fontSize="sm"
                  >
                    Featured Word
                  </Badge>
                  
                  <Box>
                    <HStack spacing={4} mb={4}>
                      <Heading
                        as="h2"
                        fontSize="5xl"
                        fontFamily="Fraunces"
                        bgGradient="linear(to-r, purple.700, purple.500)"
                        bgClip="text"
                      >
                        phở
                      </Heading>
                      <Button
                        variant="ghost"
                        colorScheme="purple"
                        rounded="full"
                        size="sm"
                        leftIcon={<Icon as={Volume2} />}
                      >
                        fuh
                      </Button>
                    </HStack>
                    <Text fontSize="xl" color="gray.600" mb={6}>
                      Vietnamese noodle soup
                    </Text>
                  </Box>

                  <Box 
                    p={6}
                    bg="purple.50"
                    rounded="xl"
                    w="full"
                  >
                    <Text fontSize="lg" color="purple.900" mb={4}>
                      <Text as="span" fontWeight="bold">Example:</Text>
                    </Text>
                    <VStack align="start" spacing={2}>
                      <Text fontSize="lg" color="purple.900">
                        Tôi thích ăn phở bò.
                      </Text>
                      <Text fontSize="md" color="purple.700">
                        I like eating beef pho.
                      </Text>
                    </VStack>
                  </Box>

                  <Button
                    size="lg"
                    colorScheme="purple"
                    px={8}
                    height="56px"
                    fontSize="lg"
                    onClick={() => navigate('/dictionary')}
                  >
                    Explore Dictionary
                  </Button>
                </VStack>
              </Box>
              
              <Box position="relative" h={{ base: '300px', lg: 'auto' }}>
                <Image
                  src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1000&q=80"
                  alt="Bowl of Phở"
                  objectFit="cover"
                  w="full"
                  h="full"
                />
              </Box>
            </SimpleGrid>
          </MotionBox>

          {/* Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {features.map((feature) => (
              <MotionCard
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                bg="white"
                shadow="xl"
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
              </MotionCard>
            ))}
          </SimpleGrid>

          {/* Example Cards */}
          <Box w="full">
            <Heading
              as="h2"
              fontSize="4xl"
              fontFamily="Fraunces"
              textAlign="center"
              mb={12}
            >
              How You'll Learn
            </Heading>
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
              {examples.map((example) => (
                <MotionCard
                  key={example.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  bg="white"
                  shadow="xl"
                  h="full"
                >
                  <CardBody>
                    <VStack align="start" spacing={6}>
                      <Heading size="md" fontFamily="Fraunces">
                        {example.title}
                      </Heading>
                      {example.type === 'flashcard' && (
                        <Box w="full" p={6} bg="gray.50" rounded="xl">
                          <Box mb={6}>
                            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                              {example.content.front}
                            </Text>
                          </Box>
                          <Box pt={6} borderTop="1px" borderColor="gray.200">
                            <Text fontWeight="medium" mb={2}>Translation: {example.content.back.translation}</Text>
                            <Text color="gray.600" mb={2}>Pronunciation: {example.content.back.pronunciation}</Text>
                            <Text color="gray.600">Usage: {example.content.back.usage}</Text>
                          </Box>
                        </Box>
                      )}
                      {example.type === 'definition' && (
                        <Box w="full">
                          <Text fontSize="2xl" fontWeight="bold" mb={4}>
                            {example.word}
                          </Text>
                          <VStack align="start" spacing={3}>
                            <Text><strong>Translation:</strong> {example.content.translation}</Text>
                            <Text><strong>Pronunciation:</strong> {example.content.pronunciation}</Text>
                            <Text><strong>Usage:</strong> {example.content.usage}</Text>
                            <Box>
                              <Text fontWeight="medium" mb={2}>Examples:</Text>
                              <VStack align="start" spacing={2}>
                                {example.content.examples.map((ex, i) => (
                                  <Text key={i} color="gray.600">{ex}</Text>
                                ))}
                              </VStack>
                            </Box>
                          </VStack>
                        </Box>
                      )}
                      {example.type === 'quiz' && (
                        <Box w="full">
                          <Text fontSize="lg" fontWeight="medium" mb={4}>
                            {example.content.question}
                          </Text>
                          <VStack align="stretch" spacing={3}>
                            {example.content.options.map((option, i) => (
                              <Flex
                                key={i}
                                p={3}
                                bg={i === example.content.correct ? 'green.50' : 'gray.50'}
                                rounded="lg"
                                align="center"
                                justify="space-between"
                              >
                                <Text>{option}</Text>
                                {i === example.content.correct && (
                                  <Icon as={CheckCircle} color="green.500" />
                                )}
                              </Flex>
                            ))}
                          </VStack>
                        </Box>
                      )}
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Landing;
