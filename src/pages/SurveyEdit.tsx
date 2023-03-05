import {
    Flex,
    useToast,
    Spinner,
    Input,
    Box,
    FormControl,
    FormLabel,
    Heading,
    RadioGroup,
    Stack,
    Radio,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import SurveyService from '../api/survey';
import { SurveyStatus } from '../interface/survey';
import { useEditorState } from '../store/editorStore';
import { STATUS_CONFIG } from '../utils/constants';

const SurveyEdit = () => {
    /* Hook */
    const toast = useToast();
    let { id } = useParams();

    /* Store getters */
    const title = useEditorState(state => state.title);
    const status = useEditorState(state => state.status);
    const questions = useEditorState(state => state.questions);

    /* Store setters */
    const setTitle = useEditorState(state => state.setTitle);
    const setStatus = useEditorState(state => state.setStatus);

    /* API */
    const { data, isLoading } = useQuery("GET_SURVEY", () => SurveyService.getSurvey(id!), {
        enabled: (!!id) as boolean,
        onSuccess: (data) => {
            setTitle(data.title);
            setStatus(data.status as SurveyStatus);
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
                <Heading as='h2' size='md' textAlign={'center'}>Editor</Heading>
                <FormControl isRequired m={4}>
                    <FormLabel>Title</FormLabel>
                    <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </FormControl>
                <FormControl isRequired m={4}>
                    <FormLabel>Status</FormLabel>
                    <RadioGroup defaultValue={STATUS_CONFIG[0].status} value={status}>
                        <Stack spacing={5} direction='row'>
                            {STATUS_CONFIG.map(sc => {
                                return <Radio
                                    key={sc.status}
                                    onChange={() => setStatus(sc.status)}
                                    value={sc.status}
                                    colorScheme={sc.color}>
                                    {sc.status}
                                </Radio>
                            })}
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <FormControl isRequired m={4}>
                    <FormLabel>Questions</FormLabel>
                </FormControl>
            </Box>
            <Box m={2} flex="1">
                <Heading as='h2' size='md' m={2} textAlign={'center'}>Preview</Heading>
            </Box>
        </Flex>
    );
}

export default SurveyEdit;