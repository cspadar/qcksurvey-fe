import { ArrowDownIcon, ArrowUpIcon, DeleteIcon } from '@chakra-ui/icons';
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
    Button,
    Checkbox,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Select,
    IconButton,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import SurveyService from '../api/survey';
import { QuestionType, SurveyStatus } from '../interface/survey';
import { useEditorState } from '../store/editorStore';
import { STATUS_CONFIG } from '../utils/constants';
import { getToastOptionError } from '../utils/helper';

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
    const addQuestion = useEditorState(state => state.addQuestion);
    const deleteQuestion = useEditorState(state => state.deleteQuestion);
    const updateQuestion = useEditorState(state => state.updateQuestion);
    const changeQuestionType = useEditorState(state => state.changeQuestionType);
    const setQuestions = useEditorState(state => state.setQuestions);

    const upsertAnswer = useEditorState(state => state.upsertAnswer);
    const deleteAnswer = useEditorState(state => state.deleteAnswer);


    /* API */
    const { data, isLoading } = useQuery("GET_SURVEY", () => SurveyService.getSurvey(id!), {
        enabled: (!!id) as boolean,
        onSuccess: (data) => {
            setTitle(data.title);
            setStatus(data.status as SurveyStatus);
            setQuestions(data.questions);
        },
        onError: (error) => toast(getToastOptionError(error))
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
                    <Accordion>
                        {questions.map((q, index: number) => {
                            return <AccordionItem key={q.id}>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            {`${index + 1}. question`}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Flex>
                                        <Box flex="2" m="2">
                                            <FormLabel>Title</FormLabel>
                                            <Input type="text" value={q.title} onChange={(e) => updateQuestion(q.id, "title", e.target.value)} />
                                        </Box>
                                        <Box flex="1" m="2">
                                            <FormLabel>Type</FormLabel>
                                            <Select value={q.type} onChange={(e) => changeQuestionType(q.id, e.target.value as QuestionType)}>
                                                {/* <option value='TEXT'>Text</option> */}
                                                <option value='SCALE'>Scale</option>
                                                <option value='MULTIPLE_CHOICE'>Multiple choice</option>
                                                <option value='SINGLE_CHOICE'>Single choice</option>
                                            </Select>
                                        </Box>
                                        <Box flex="1" m="2">
                                            <FormLabel>Optional</FormLabel>
                                            <Checkbox checked={q.optional} onChange={(e) => updateQuestion(q.id, "optional", e.target.checked)}>Optional</Checkbox>
                                        </Box>
                                    </Flex>
                                    <Heading as='h3' size='sm' m={2}>Answers</Heading>
                                    <Flex wrap={'wrap'} gap={2}>
                                        {q.answer_options.map(a => <Flex key={a.id} m="2">
                                            <Input mr={2} type="text" value={a.title} onChange={(e) => upsertAnswer(q.id, e.target.value, a.id)} />
                                            <IconButton isDisabled={q.type === "SCALE"} aria-label='Move answer up' colorScheme='blue' icon={<ArrowDownIcon />} ml={2} />
                                            <IconButton isDisabled={q.type === "SCALE"} aria-label='Move answer down' colorScheme='blue' icon={<ArrowUpIcon />} ml={2} />
                                            <IconButton isDisabled={q.type === "SCALE"} aria-label='Delete answer' colorScheme='red' icon={<DeleteIcon />} onClick={() => deleteAnswer(q.id, a.id)} ml={2} />
                                        </Flex>)}
                                    </Flex>
                                    <Button colorScheme='green' onClick={() => upsertAnswer(q.id, "")} ml={3}>
                                        add new answer
                                    </Button>
                                    <Box mt={4}>
                                        <Button colorScheme='red' onClick={() => deleteQuestion(q.id)} ml={3}>
                                            remove question
                                        </Button>
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>
                        })}
                    </Accordion>
                </FormControl>
                <Button colorScheme='green' onClick={() => addQuestion()} ml={3}>
                    add question
                </Button>
            </Box>
            <Box m={2} flex="1">
                <Heading as='h2' size='md' m={2} textAlign={'center'}>Preview</Heading>
            </Box>
        </Flex>
    );
}

export default SurveyEdit;