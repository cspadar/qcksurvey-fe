import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    useColorMode,
    Menu,
    MenuButton,
    MenuItem,
    Avatar,
    MenuList,
    Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import NavLink from './NavLink';
import Hamburger from './Hamburger';
import { useContext } from 'react';
import { IUserContext, UserContext } from '../../context/UserContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    /* Hook */
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const { email, onLogout } = useContext(UserContext) as IUserContext;

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
                        <NavLink to="my-surveys">My surveys</NavLink>
                        <NavLink to="explore">Explore Surveys</NavLink>
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <Button onClick={toggleColorMode} mr={4} size={'sm'}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                    {email ? null : <Button colorScheme='teal' variant='solid' size={'sm'} mr={4}>
                        <RouterLink to="login">Login</RouterLink>
                    </Button>}
                    {email ? <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar size={'sm'} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => {
                                onLogout();
                                navigate("/login");
                            }}>Logout</MenuItem>
                        </MenuList>
                    </Menu> : null}
                    {email ? <Text ml={2} size={'sm'}> {email} </Text> : null}
                </Flex>
            </Flex>
            {isOpen ? <Hamburger /> : null}
        </Box>
    );
}

export default Navbar;