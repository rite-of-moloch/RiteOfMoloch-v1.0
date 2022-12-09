import Link from "next/link";
import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
} from "@chakra-ui/react";
import { React, useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ethers, Contract, utils, BigNumber } from "ethers";
import { CONTRACT_ADDRESSES } from "../utils/constants";
import { HeaderOne } from "../shared/Header0ne";
import { DeployCohortButton } from "../shared/DeployCohortButton";

export default function deployCohort() {
  const [membershipCriteria, setMembershipCriteria] = useState("");
  const [duration, setDuration] = useState("");
  const [stakingAsset, setStakingAsset] = useState("");
  const [name, setName] = useState("");
  const [treasury, setTreasury] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [threshold, setThreshold] = useState("");
  const [assetAmount, setAssetAmount] = useState("");
  const [baseUri, setBaseUri] = useState("");

  const context = useContext(AppContext);
  const [userSignedIn, setUserSignedIn] = useState(false);

  const [txHash, setTxHash] = useState();

  const createCohort = async (data) => {
    const provider = context.ethersProvider;
    const address =
      CONTRACT_ADDRESSES[context.chainId].riteOfMolochFactoryAddress;
    const ABI_INTERFACE = [
      "function createCohort(tuple(address membershipCriteria, address stakingAsset, address treasury, uint256 threshold, uint256 assetAmount, uint256 duration, string name, string symbol, string baseUri), uint implementationSelector) external returns (address)",
    ];
    const signer = provider.getSigner();
    const contract = new Contract(address, ABI_INTERFACE, signer);

    try {
      const tx = await contract.createCohort(data, 1);
      await tx.wait();
      if (tx) {
        console.log(tx);
        setTxHash(tx);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearForm = () => {
    setMembershipCriteria("");
    setDuration("");
    setStakingAsset("");
    setName("");
    setTreasury("");
    setTokenName("");
    setThreshold("");
    setAssetAmount("");
    setBaseUri("");
  };

  const handleDeployCohort = async (e) => {
    e.preventDefault();
    const data = [
      membershipCriteria,
      stakingAsset,
      treasury,
      threshold,
      utils.parseEther(assetAmount),
      duration,
      name,
      tokenName,
      baseUri,
    ];
    createCohort(data);
    setTxHash();
    txHash ? clearForm() : null;
  };

  useEffect(() => {
    if (context.signerAddress) setUserSignedIn(() => true);
    else if (context.signerAddress === null) setUserSignedIn(() => false);
  }, [context.signerAddress]);

  return (
    <Flex
      minH="350px"
      minW="80%"
      direction="column"
      alignItems="center"
      fontFamily="spaceMono"
      px="2rem"
    >
      <HeaderOne />
      <Text
        w={{ md: "90%", sm: "100%" }}
        bg="purple"
        p="15px"
        fontFamily="rubik"
        fontSize={{ lg: "1.2rem", sm: "1rem" }}
        mb="2rem"
        textAlign="center"
      >
        Deploy Your Own Cohort
      </Text>

      {!context.signerAddress ? (
        <Text color="red" mt="2rem" mb="4rem" fontSize="lg">
          Connect your wallet to get started, soldier...
        </Text>
      ) : null}
      <FormControl display={!!userSignedIn ? "" : "none"}>
        <Flex alignItems="center" justifyContent="center">
          <SimpleGrid
            columns={2}
            spacingX={20}
            spacingY={6}
            width="75%"
            mb="4rem"
          >
            <Box>
              <FormLabel color="red" fontSize="md">
                The contract address used to ascertain cohort completion
              </FormLabel>
              <Input
                value={membershipCriteria}
                onChange={(e) => setMembershipCriteria(e.target.value)}
                type="text"
                id="membershipCriteria"
                isRequired={true}
                placeholder="Input daoAddress"
                _placeholder={{ color: "white", fontSize: "sm" }}
                bg="#741739"
                color="white"
                rounded="none"
                border="2px"
                borderColor="darkgrey"
                p="1.5rem"
                mt="0.5rem"
                fontSize="sm"
              />
            </Box>
            <Box>
              <FormLabel color="red" fontSize="md">
                Duration before cohort can be slashed
              </FormLabel>
              <Input
                value={duration}
                id="duration"
                onChange={(e) => setDuration(e.target.value)}
                type="number"
                isRequired={true}
                placeholder="Input duration in seconds"
                _placeholder={{ color: "white", fontSize: "sm" }}
                bg="#741739"
                color="white"
                rounded="none"
                border="2px"
                borderColor="darkgrey"
                p="1.5rem"
                mt="0.5rem"
                fontSize="sm"
              />
            </Box>
            <Box>
              <FormLabel color="red" fontSize="md">
                Contract address for the asset which is staked into the cohort
                contract
              </FormLabel>
              <Input
                value={stakingAsset}
                id="stakingAsset"
                onChange={(e) => setStakingAsset(e.target.value)}
                placeholder="Input stakingAsset Address"
                _placeholder={{ color: "white", fontSize: "sm" }}
                isRequired={true}
                bg="#741739"
                color="white"
                rounded="none"
                border="2px"
                borderColor="darkgrey"
                p="1.5rem"
                mt="0.5rem"
                fontSize="sm"
              />
            </Box>
            <Box>
              <FormLabel color="red" fontSize="md">
                The name for the cohort's soul bound token (SBT)
              </FormLabel>
              <Input
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value.toUpperCase())}
                placeholder="Input name for SBT"
                _placeholder={{ color: "white", fontSize: "sm" }}
                isRequired={true}
                bg="#741739"
                color="white"
                rounded="none"
                border="2px"
                borderColor="darkgrey"
                p="1.5rem"
                mt="0.5rem"
                fontSize="sm"
              />
            </Box>
            <Box>
              <FormLabel color="red" fontSize="md">
                The address which received tokens when initiates are slashed
              </FormLabel>
              <Input
                value={treasury}
                id="treasury"
                onChange={(e) => setTreasury(e.target.value)}
                placeholder="Input treasury Address"
                _placeholder={{ color: "white", fontSize: "sm" }}
                isRequired={true}
                bg="#741739"
                color="white"
                rounded="none"
                border="2px"
                borderColor="darkgrey"
                p="1.5rem"
                mt="0.5rem"
                fontSize="sm"
              />
            </Box>
            <Box>
              <FormLabel color="red" fontSize="md">
                The ticker symbol for cohort's soul bound token
              </FormLabel>
              <Input
                value={tokenName}
                id="tokenName"
                onChange={(e) => setTokenName(e.target.value.toUpperCase())}
                placeholder="Input token name"
                _placeholder={{ color: "white", fontSize: "sm" }}
                isRequired={true}
                bg="#741739"
                color="white"
                rounded="none"
                border="2px"
                borderColor="darkgrey"
                p="1.5rem"
                mt="0.5rem"
                fontSize="sm"
              />
            </Box>
            <Box>
              <FormLabel color="red" fontSize="md">
                The minimum amount of criteria which constitues DAO membership
              </FormLabel>
              <Input
                type="number"
                value={threshold}
                id="threshold"
                onChange={(e) => setThreshold(e.target.value)}
                placeholder="Input threshold or shares required"
                _placeholder={{ color: "white", fontSize: "sm" }}
                isRequired={true}
                bg="#741739"
                color="white"
                rounded="none"
                border="2px"
                borderColor="darkgrey"
                p="1.5rem"
                mt="0.5rem"
                fontSize="sm"
              />
            </Box>
            <Box>
              <FormLabel color="red" fontSize="md">
                The minimum amount of staking asset required to join the cohort
              </FormLabel>
              <Input
                type="number"
                value={assetAmount}
                id="assetAmount"
                onChange={(e) => setAssetAmount(e.target.value)}
                placeholder="Input the minimum staked asset to join"
                _placeholder={{ color: "white", fontSize: "sm" }}
                isRequired={true}
                bg="#741739"
                color="white"
                rounded="none"
                border="2px"
                borderColor="darkgrey"
                p="1.5rem"
                mt="0.5rem"
                fontSize="sm"
              />
            </Box>
            <Box>
              <FormLabel color="red" fontSize="md">
                The uniform resource identifier (URI) for accessing soul bould
                token metadata
              </FormLabel>
              <Input
                value={baseUri}
                id="baseUri"
                onChange={(e) => setBaseUri(e.target.value)}
                placeholder="Input the baseuri for soul bound token metadata"
                _placeholder={{ color: "white", fontSize: "sm" }}
                isRequired={true}
                bg="#741739"
                color="white"
                rounded="none"
                border="2px"
                borderColor="darkgrey"
                p="1.5rem"
                mt="0.5rem"
                fontSize="sm"
              />
            </Box>
          </SimpleGrid>
        </Flex>

        <Button
          onClick={handleDeployCohort}
          display="flex"
          bg="black"
          color="red"
          border="2px"
          borderColor="red"
          width="50%"
          p="1.75rem"
          m="auto"
          mb="4rem"
          alignItems="center"
          _hover={{ cursor: "pointer" }}
        >
          DEPLOY
        </Button>
      </FormControl>

      <Flex
        color="white"
        mb="4rem"
        mx="auto"
        p="0.5rem"
        textDecoration="underline"
        textUnderlineOffset="4px"
        _hover={{ cursor: "pointer" }}
      >
        <Link href="/">
          <Text>Click here to stake & commit to our cohort at Raid Guild!</Text>
        </Link>
      </Flex>
    </Flex>
  );
}
