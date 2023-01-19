import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import NavLink from './navbar/NavLink';
import Hamburger from './navbar/Hamburger';

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box>QckSurvey</Box>
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}>
                        <NavLink key={"my-surveys"}>My surveys</NavLink>
                        <NavLink key={"explore-surveys"}>Explore Surveys</NavLink>
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <Button onClick={toggleColorMode} mr={4} size={'sm'}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                    <Button colorScheme='teal' variant='solid' size={'sm'} mr={4}>
                        Login
                    </Button>
                    {/*<Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar size={'sm'} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>My Profile</MenuItem>
                                <MenuDivider />
                                <MenuItem>Logout</MenuItem>
                            </MenuList>
                        </Menu> */}
                </Flex>
            </Flex>
            {isOpen ? <Hamburger /> : null}
        </Box>
    );
}

export default Navbar;