import { UseToastOptions } from "@chakra-ui/react";

export const isValidEmail = (email: string) => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const getToastOptionError = (err: any) => {
    return {
        title: 'Error',
        description: err.response.data.message.toString(),
        status: 'error'
    } as UseToastOptions;
}