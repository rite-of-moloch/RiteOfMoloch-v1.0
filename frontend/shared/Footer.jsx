import { Flex, Link, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex
      direction={{ base: 'column-reverse', md: 'row', lg: 'row' }}
      alignItems='flex-start'
      justifyContent='space-between'
      w='100%'
    >
      <Text
        mb='1rem'
        fontSize='sm'
        fontFamily='jetbrains'
        color='greyLight'
        mx='auto'
      >
        Built by{' '}
        <Link
          href='https://raidguild.org'
          isExternal
          textDecoration='underline'
        >
          RaidGuild
        </Link>
      </Text>
    </Flex>
  );
};
