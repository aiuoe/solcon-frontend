import gql from 'graphql-tag';


export const MAIL_RAW = gql(`
mutation($to: String!, $subject: String!, $message: String!)
{
	mailRaw(to: $to, subject: $subject, message: $message)
}`)