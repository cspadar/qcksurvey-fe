import { Box, Stack } from "@chakra-ui/react";
import NavLink from "./NavLink";

const Hamburger = () => {
    return <Box pb={4} display={{ md: 'none' }}>
        <Stack as={'nav'} spacing={4}>
            <NavLink key={"my-surveys"}>My Surveys</NavLink>
            <NavLink key={"explore-surveys"}>Explore Surveys</NavLink>
        </Stack>
    </Box>
}

export default Hamburger;