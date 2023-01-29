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
import { useQuery } from 'react-query';
import SurveyService from '../api/survey';

type Status = "DRAFT" | "PUBLIC" | "PRIVATE" | "CLOSED";
type StatusCfg = { status: Status, color: string };

const StatusConfig: StatusCfg[] = [
    { status: "DRAFT", color: "yellow" },
    { status: "PUBLIC", color: "green" },
    { status: "PRIVATE", color: "orange" },
    { status: "CLOSED", color: "red" },
];

const MySurveysPage = () => {
    /* State */
    const [filterTerm, setFilterTerm] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([
        "DRAFT", "CLOSED", "PRIVATE", "PUBLIC"
    ]);
    /* Hook */
    const toast = useToast()

    /* API */
    const { data, isLoading } = useQuery("GET_MY_SURVEYS", SurveyService.findAllMine, {
        onError: (err: any) => {
            toast({
                title: 'Error',
                description: err.response.data.message.toString(),
                status: 'error',
            });
        }
    });

    const onChangeFilterStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.defaultValue as Status;
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
        return lowSurvey.includes(lowTerm) && selectedStatuses.includes(s.status as Status);
    });

    if (isLoading) return (<Spinner size={'lg'} m={3} />)

    return (
        <>
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
                        {StatusConfig.map(sc => {
                            return <Checkbox
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
                bg={useColorModeValue('gray.50', 'gray.800')}>
                {filteredSurveys ? filteredSurveys.map(survey => {
                    const statusColor = StatusConfig.find(sc => sc.status === survey.status);
                    return <Card minW={'xs'} maxW='xs' key={survey.id}>
                        <CardBody>
                            <Flex justifyContent={'space-between'}>
                                <Heading size='md'>{survey.title}</Heading>
                                <Box>
                                    <EditIcon marginX={1} color={"grey"} />
                                    <DeleteIcon marginX={1} color={"grey"} />
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