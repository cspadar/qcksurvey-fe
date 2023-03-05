import { AlertDialog as ChakraAlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from "@chakra-ui/react";
import React from "react";

interface IProps {
    onClose: () => void;
    onSubmit: () => void;
    isOpen: boolean;
    header: JSX.Element | string;
    body: JSX.Element | string;
    confirmText?: string;
    cancelText?: string;
}

const AlertDialog = ({ onClose, onSubmit, isOpen, header, body, confirmText = "OK", cancelText = "Cancel" }: IProps) => {

    const cancelRef = React.useRef(null);

    return <ChakraAlertDialog onClose={onClose} isOpen={isOpen} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    {header}
                </AlertDialogHeader>

                <AlertDialogBody>
                    {body}
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        {cancelText}
                    </Button>
                    <Button colorScheme='red' onClick={onSubmit} ml={3}>
                        {confirmText}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
    </ChakraAlertDialog>
}

export default AlertDialog;