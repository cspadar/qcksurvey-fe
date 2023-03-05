import { StatusCfg } from "../interface/survey";

/* Local Storage Keys */
export const KEY_EMAIL = "QCK_EMAIL";
export const KEY_JWT = "QCK_TOKEN";

/* Survey Status */
export const STATUS_CONFIG: StatusCfg[] = [
    { status: "DRAFT", color: "yellow" },
    { status: "PUBLIC", color: "green" },
    { status: "PRIVATE", color: "orange" },
    { status: "CLOSED", color: "red" },
];