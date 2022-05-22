export enum UserTypes {
    SIGNUP_USER = "SIGNUP_USER",
    LOGIN_USER = "LOGIN_USER",
    SET_USER_DETAILS = "SET_USER_DETAILS",
    LOGOUT_USER = "LOG_OUT_USER",
    TRACE_CHANGES = "TRACE_CHANGES",
    UPDATE_PROFILE = "UPDATE_PROFILE",
    UPDATE_USER_CONTACTS = "UPDATE_USER_CONTACTS",
    UPADTE_INVOICE_FIELDS = "UPADTE_INVOICE_FIELDS",
    VERIFY_EMAIL = "VERIFY_EMAIL",
    SET_EMAILS = "SET_EMAILS",
    SET_EMAIL = "SET_EMAIL",
    REMOVE_EMAIL = "REMOVE_EMAIL",
    SET_REPLY_EMAIL = "SET_REPLY_EMAIL",
    SEND_EMAIL = "SEND_EMAIL",
}

export enum UITypes {
    SET_IS_EDIT = "SET_IS_EDIT",
    SET_IS_CONTACT = "SET_IS_CONTACT",
    SET_IS_CHAT = "SET_IS_CHAT",
    HANDLE_LOCK = "HANDLE_LOCK"
}

export enum DateTypes{
    SET_DATE = "SET_DATE"
}

export enum TodoTypes {
    IS_AVAILABLE_TRUE = "IS_AVAILABLE_TRUE",
    SET_TASKS = "SET_TASKS",
    TRACK_TASKS = "TRACK_TASKS",
    SET_COMPLETED = "SET_COMPlETED",
    SET_UNCOMPLETED = "SET_UNCOMPLETED",
    FILTER_ACTIVE = "FILTER_ACTIVE",
    FILTER_BY_DATE = "FILTER_BY_DATE",
    FILTER_COMPLETED = "FILTER_COMPLETED",
    FILTER_ALL = "FILTER_ALL",
    ADD_TASK = "ADD_TASK",
    EDIT_TASK = "EDIT_TASK",
    SAVE_TASK = "SAVE_TASK",
    REMOVE_TASK = "REMOVE_TASK",    
    REMOVE_ALL = "REMOVE_ALL",
    CHECK_IS_AVAIBLE = "CHECK_IS_AVAIBLE"
}


export enum InvoicesTypes{
    SET_FIELDS = "SET_FIELDS",
    SET_INVOICES = "SET_INVOICES",
    HANDLE_FORM_DATA = "HANDLE_FORM_DATA",
    ADD_INVOICE = "ADD_INVOICE",
    VIEW_INVOICE = "VIEW_INVOICE",
    REMOVE_INVOICE = 'REMOVE_INVOICE'
}

export enum ContactsTypes{
    SET_CONTACTS = "SET_CONTACTS",
    ADD_CONTACT = "ADD_CONTACT"
}

export enum ChatTypes{
    SET_MESSAGES = "SET_MESSAGES",
    SEND_MESSAGE = "SEND_MESSAGE",
    FILTER_BY_EMAIL = "FILTER_BY_EMAIL",
    CHECK_READ = "CHECK_READ",
}