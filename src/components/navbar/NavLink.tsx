import { Link, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

const NavLink = ({ children }: { children: ReactNode }) => (
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
        {children}
    </Link>
);

export default NavLink;