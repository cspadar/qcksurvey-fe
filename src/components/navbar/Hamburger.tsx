import { Box, Stack } from "@chakra-ui/react";
import NavLink from "./NavLink";

const Hamburger = () => {
    return <Box pb={4} display={{ md: 'none' }}>
        <Stack as={'nav'} spacing={4}>
            <NavLink to={'/my-survey'}>My Surveys</NavLink>
            <NavLink to={'/explore'}>Explore Surveys</NavLink>
        </Stack>
    </Box>
}

export default Hamburger;