import {
    Flex,
    useToast,
    Spinner,
    Input,
    Box,
    FormControl,
    FormLabel,
    Heading,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import SurveyService from '../api/survey';

const SurveyEdit = () => {
    /* Hook */
    const toast = useToast();
    let { id } = useParams();

    /* State */
    const [title, setTitle] = useState<string>("");

    /* API */
    const { data, isLoading } = useQuery("GET_SURVEY", () => SurveyService.getSurvey(id!), {
        enabled: (!!id) as boolean,
        onSuccess: (data) => {
            setTitle(data.title);
        },
        onError: (err: any) => {
            toast({
                title: 'Error',
                description: err.response.data.message.toString(),
                status: 'error',
            });
        }
    });

    if (isLoading) return (<Spinner size={'lg'} m={3} />)

    return (
        <Flex justifyContent={"space-between"} alignItems={"flex-start"}>
            <Box m={2} flex="1">
                <Heading as='h2' size='md'>Editor</Heading>
                <FormControl isRequired m={4}>
                    <FormLabel>Title</FormLabel>
                    <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </FormControl>
            </Box>
            <Box m={2} flex="1">
                <Heading as='h2' size='md' m={2}>Preview</Heading>
            </Box>
        </Flex>
    );
}

export default SurveyEdit;