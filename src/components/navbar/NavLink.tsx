import { Link, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link as RouterLink } from 'react-router-dom';

interface IProps {
    children: React.ReactNode;
    to: string;
}

const NavLink = ({ children, to }: IProps) => (
    <Link
        as={"div"}
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
    >
        <RouterLink to={to}>{children}</RouterLink>
    </Link>
);

export default NavLink;