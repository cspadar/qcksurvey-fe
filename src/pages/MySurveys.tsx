import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Card,
    CardBody,
    Flex,
    Heading,
    useColorModeValue,
    useToast,
    Spinner,
    Badge,
    Box,
    Input,
    CheckboxGroup,
    Checkbox,
    Stack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import SurveyService from '../api/survey';
import AlertDialog from '../components/navbar/AlertDialog';
import { SurveyStatus } from '../interface/survey';
import { STATUS_CONFIG } from '../utils/constants';
import { getToastOptionError } from '../utils/helper';

const MySurveysPage = () => {
    /* State */
    const [filterTerm, setFilterTerm] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState<SurveyStatus[]>([
        "DRAFT", "CLOSED", "PRIVATE", "PUBLIC"
    ]);
    const [toDeleteId, setToDeleteId] = useState<string | null>(null);

    /* Hook */
    const toast = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    /* API */
    const { data, isLoading } = useQuery("GET_MY_SURVEYS", SurveyService.findAllMine, {
        onError: (err: any) => toast(getToastOptionError(err))
    });

    const { mutate: deletePost } = useMutation((id: string) => SurveyService.deleteSurvey(id), {
        onSuccess() {
            toast({ title: 'Survey deleted', status: 'success' });
            queryClient.invalidateQueries("GET_MY_SURVEYS");
        },
        onError(err: any) {
            toast(getToastOptionError(err))
        },
        onSettled() {
            setToDeleteId(null);
        }
    });

    const onChangeFilterStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.defaultValue as SurveyStatus;
        const checked = e.target.checked;
        if (checked) {
            setSelectedStatuses(prev => [...prev, value])
        }
        else {
            const newFilterStatus = selectedStatuses.filter(s => s !== value);
            setSelectedStatuses(newFilterStatus);
        }
    }

    /* Computed */
    const filteredSurveys = data?.filter((s) => {
        const lowSurvey = s.title.toLowerCase();
        const lowTerm = filterTerm.toLowerCase();
        return lowSurvey.includes(lowTerm) && selectedStatuses.includes(s.status as SurveyStatus);
    });

    const toDeleteTitle = data?.find(d => d.id === toDeleteId)?.title;

    /* Event handlers */
    const onEdit = (surveyId: string) => {
        navigate(`/survey/edit/${surveyId}`);
    }

    if (isLoading) return (<Spinner size={'lg'} m={3} />)

    return (
        <>
            <AlertDialog
                isOpen={!!toDeleteId}
                onClose={() => setToDeleteId(null)}
                onSubmit={() => deletePost(toDeleteId!)}
                header={`${toDeleteTitle} - Delete`}
                body={"Are you sure? You can't undo this action afterwards."}
                confirmText={"Delete"}
            />
            <Flex margin={2} gap={4} justifyContent={"space-between"} wrap={"wrap"}>
                <Input
                    minW={200}
                    maxWidth={"50%"}
                    placeholder="Filter surveys..."
                    type="text"
                    onChange={(e) => setFilterTerm(e.target.value)}
                    value={filterTerm} />
                <CheckboxGroup value={selectedStatuses}>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                        {STATUS_CONFIG.map(sc => {
                            return <Checkbox
                                key={sc.status}
                                onChange={onChangeFilterStatus}
                                value={sc.status}
                                colorScheme={sc.color}>
                                {sc.status}
                            </Checkbox>
                        })}
                    </Stack>
                </CheckboxGroup>
            </Flex>
            <Flex
                m={2}
                wrap={'wrap'}
                gap={2}
                marginTop={2}
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                {filteredSurveys ? filteredSurveys.map(survey => {
                    const statusColor = STATUS_CONFIG.find(sc => sc.status === survey.status);
                    return <Card minW={'xs'} maxW='xs' key={survey.id}>
                        <CardBody>
                            <Flex justifyContent={'space-between'}>
                                <Heading size='md'>{survey.title}</Heading>
                                <Box>
                                    <EditIcon marginX={1} color={"grey"} cursor={"pointer"} onClick={() => onEdit(survey.id)} />
                                    <DeleteIcon marginX={1} color={"grey"} cursor={"pointer"} onClick={() => setToDeleteId(survey.id)} />
                                </Box>
                            </Flex>
                            <Badge colorScheme={statusColor?.color}>
                                {survey.status}
                            </Badge>
                        </CardBody>
                    </Card>
                }) : "No surveys yet..."}
            </Flex>
        </>
    );
}

export default MySurveysPage;