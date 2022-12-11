import { Flex, Heading, Image } from '@chakra-ui/react';

export const Page404 = () => {
  return (
    <Flex
      w='100%'
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <Image src='/assets/illustrations/404.svg' alt='raid-banner' w='200px' />
      <Heading fontFamily='spaceMono' mt='2rem'>
        Page not found
      </Heading>
    </Flex>
  );
};
