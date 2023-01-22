import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import AuthService from '../api/auth';
import { IUserContext, UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { onLogin } = useContext(UserContext) as IUserContext;
    const navigate = useNavigate();

    const isSubmitDisabled = email.length <= 0 || password.length <= 0;

    const onSubmit = async () => {
        try {
            const loginResponse = await AuthService.signIn(email, password);
            onLogin(loginResponse.email, loginResponse.access_token);
            navigate("/");
        } catch (error) {
            console.log("TODO")
        }
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Link color={'blue.400'}>Forgot password?</Link>
                            <Button
                                disabled={isSubmitDisabled}
                                onClick={onSubmit}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default LoginPage;